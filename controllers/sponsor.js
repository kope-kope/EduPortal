const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Sponsor = require('../models/sponsor');
const User = require('../models/user');
const Bene = require('../models/bene');
const sponsor = require('../models/sponsor');
const bene = require('../models/bene');




exports.getSponsors = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 20;
  let totalItems;
  Sponsor.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Sponsor.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(sponsor => {
      res
        .status(200)
        .json({
          message: 'Fetched sponsors',
          sponsor: sponsor,
          totalItems: totalItems
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createSponsor = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  // if (!req.file) {
  //   const error = new Error('No Signature provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  // const signature = req.file.path.replace('\\', '/');
  const email = req.body.email;
  const name = req.body.name;
  const nationality= req.body.nationality;
  const dob = req.body.dob.toString()
  const gender = req.body.gender;
  const address = req.body.address;
  const occupation = req.body.occupation;
  const maritalStatus = req.body.maritalStatus;
  const maidenName = req.body.maidenName;
  const mobileNumber = req.body.mobileNumber;
  const insuranceCover = req.body.insuranceCover.toString()

  // let creator;
  // const content = req.body.content;
  const sponsor = new Sponsor({
    email: email,
    name: name,
    nationality: nationality,
    dob: dob,
    gender: gender,
    address: address,
    occupation: occupation,
    maritalStatus: maritalStatus,
    mobileNumber: mobileNumber,
    maidenName: maidenName,
    // signature: signature,
    insuranceCover : insuranceCover
  });
  sponsor
    .save()
    // .then(result => {
    //   return User.findById(req.userId);
    // })
    // .then(user => {
    //   creator = user;
    //   user.posts.push(post);
    //   return user.save();
    // })
    .then(sponsor =>
      res.status(201).json({
      message: 'Sponsor created successfully!',
      sponsor: sponsor,
      sponsorId: sponsor._id.toString() 
    })
    )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};      


exports.getSponsor = (req, res, next) => {
  const sponsorId = req.params.sponsorId;
  Sponsor.findById(sponsorId)
    .then(sponsor => {
      if (!sponsor) {
        const error = new Error('Could not find sponsor.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Sponsor fetched.', sponsor: sponsor });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateSponsor = (req, res, next) => {
  const sponsorId = req.params.sponsorId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
   // let signature
   const email = req.body.email;
   const name = req.body.name;
   const nationality= req.body.nationality;
   const dob = req.body.dob.toString()
   const gender = req.body.gender;
   const address = req.body.address;
   const occupation = req.body.occupation;
   const maritalStatus = req.body.maritalStatus;
   const maidenName = req.body.maidenName;
   const mobileNumber = req.body.mobileNumber;
   const insuranceCover = req.body.insuranceCover.toString()
  // if (req.file) {
  //   signature = req.file.path.replace('\\', '/');;
  // }
  // if (!signature) {
  //   const error = new Error('No file picked.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  Sponsor.findById(sponsorId)
    .then(sponsor=> {
      if (!sponsor) {
        const error = new Error('Could not find sponsor.');
        error.statusCode = 404;
        throw error;
      }
  
      // if (signature !== sponsor.signature) {
      //   clearImage(post.imageUrl);
      // }
      sponsor.name = name;
      sponsor.email = email;
      // sponsor.signature = signature;
      sponsor.nationality = nationality;
      sponsor.dob = dob
      sponsor.gender = gender;
      sponsor.address = address;
      sponsor.occupation = occupation;
      sponsor.maritalStatus = maritalStatus;
      sponsor.maidenName = maidenName;
      sponsor.mobileNumber = mobileNumber;
      sponsor.insuranceCover = insuranceCover
      return sponsor.save();
    })
    .then(sponsor => {
      res.status(200).json({ message: 'Sponsor updated!', sponsor: sponsor, sponsorId: sponsor._id.toString()  });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.deleteSponsor = (req, res, next) => {
  const sponsorId = req.params.sponsorId;
  Sponsor.findById(sponsorId)
    .then(sponsor => {
      if (!sponsor) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      // if(post.creator.toString() !== req.userId){
      //   const error = new Error('Not Authorized');
      //   error.statusCode = 403;
      //   throw error;
      // }
      // clearImage(sponsor.signature);
      return Sponsor.findByIdAndRemove(sponsorId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Deleted sponsor.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// const clearSignature = filePath => {
//   filePath = path.join(__dirname, '..', filePath);
//   fs.unlink(filePath, err => console.log(err));
// };


exports.createBene = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;
  const presentClass = req.body.presentClass
  const phDcountry = req.body.phDcountry;
  const phDiN = req.body.phDin
  const pGcountry = req.body.pGcountry;
  const pGin = req.body.pGin;
  const uGcountry = req.body.uGcountry;
  const uGin = req.body.uGin;
  const ssCountry = req.body.ssCountry;
  const ssIn = req.body.ssIn
  const psCountry = req.body.psCountry;
  const psIn = req.body.psIn
  const sponsor = req.body.sponsorId
  // const sponsorId = req.body.sponsorId

  // let creator;
  // const content = req.body.content;
  const bene = new Bene({
    name: name,
    gender: gender,
    age: age,
    presentClass:presentClass,
    gender: gender,
    sponsor: sponsor,
  });
  bene.phD.country = phDcountry
  bene.phD.institutionName = phDiN
  bene.postGraduate.country = pGcountry
  bene.postGraduate.institutionName = pGin
  bene.underGraduate.country = uGcountry
  bene.underGraduate.institutionName = uGin
  bene.secondarySchool.country = ssCountry
  bene.secondarySchool.institutionName = ssIn
  bene.primarySchool.country = psCountry
  bene.primarySchool.institutionName = psIn
  bene
    .save()
    .then(result => {
    return Sponsor.findById(req.body.sponsorId);
    })
    .then(sponsor => {
      sponsor = sponsor;
      sponsor.beneficiaries.push(bene);
     return sponsor.save();
    })
    .then(result =>
      res.status(201).json({
      message: 'Beneficiary created successfully!',
      bene: bene 
    })
    )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
 

exports.updateBene = (req, res, next) => {
  const beneId = req.params.beneId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  Bene.findById(beneId)
    .then(bene=> {
      if (!bene) {
        const error = new Error('Could not find beneficiary.');
        error.statusCode = 404;
        throw error;
      }

      const name = req.body.name;
      const gender = req.body.gender;
      const age = req.body.age;
      const presentClass = req.body.presentClass
      const phDcountry = req.body.phDcountry;
      const phDiN = req.body.phDin
      const pGcountry = req.body.pGcountry;
      const pGin = req.body.pGin;
      const uGcountry = req.body.uGcountry;
      const uGin = req.body.uGin;
      const ssCountry = req.body.sscountry;
      const ssIn = req.body.ssIn
      const psCountry = req.body.psCountry;
      const psIn = req.body.psIn
      const sponsorId = req.body.sponsorId

    Bene.findById(beneId)
    .then(bene=> {
      if (!bene) {
        const error = new Error('Could not find beneficiary.');
        error.statusCode = 404;
        throw error;
      }
  
      bene.name = name;
      bene.gender = gender;
      bene.age = age;
      bene.presentClass = presentClass;
      bene.sponsor = sponsorId;
      bene.phD.country = phDcountry
      bene.phD.institutionName = phDiN
     bene.postGraduate.country = pGcountry
  bene.postGraduate.institutionName = pGin
  bene.underGraduate.country = uGcountry
  bene.underGraduate.institutionName = uGin
  bene.secondarySchool.country = ssCountry
  bene.secondarySchool.institutionName = ssIn
  bene.primarySchool.country = psCountry
  bene.primarySchool.institutionName = psIn
  bene.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Beneficiary updated!',  bene: result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

}


 exports.deleteBene = (req, res, next) => {
  const beneId = req.params.beneId;
  Bene.findById(beneId)
    .then(bene => {
      if (!bene) {
        const error = new Error('Could not find beneficiary');
        error.statusCode = 404;
        throw error;
      }
      return Bene.findByIdAndRemove(beneId);
    })
    .then(result => {
      return Sponsor.findById(req.body.sponsorId);
    })
    .then(sponsor => {
      sponsor.beneficiaries.pull(beneId);
      return sponsor.save();
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Deleted post.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};








const express = require('express');
const { body } = require('express-validator/check');

const sponsorController = require('../controllers/sponsor');
const isAuth = require('../middleware/is-auth')

const router = express.Router();


router.get('/sponsors', sponsorController.getSponsors);


router.post(
  '/sponsors',
    
  sponsorController.createSponsor
);

router.post(
  '/bene',
    
  sponsorController.createBene
);

router.get('/sponsors/:sponsorId',  sponsorController.getSponsor);

router.put(
 '/sponsors/:sponsorId',
//   [
//     body('title')
//       .trim()
//       .isLength({ min: 5 }),
//     body('content')
//       .trim()
//       .isLength({ min: 5 })
//   ],
  sponsorController.updateSponsor
);

router.put('/bene/:beneId', sponsorController.updateBene)

router.delete('/sponsors/:sponsorId', sponsorController.deleteSponsor);

router.delete('/bene/:beneId', sponsorController.deleteBene);

module.exports = router;

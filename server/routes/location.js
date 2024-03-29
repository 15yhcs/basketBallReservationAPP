import express from 'express';
import {createLocations, getLocations,updateLocation, deleteLocation} from '../controllers/location.js';
import auth from '../middleware/auth.js';
const router = express.Router();



router.post('/', auth, createLocations);
router.get('/',getLocations);
router.patch('/:id',auth, updateLocation);
router.delete('/:id',auth, deleteLocation);
// Upon any router bellow initiate, we first check on the auth middleware for the authorization check
// then if it identifies the identity, we continue to the application middleware(the controller)


// router.get('/', (req,res) => {
//     res.send('this workds');
// })

export default router;
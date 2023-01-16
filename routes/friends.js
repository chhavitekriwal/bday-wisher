const express = require('express');
const router = express.Router();
const {addRecord,getAllRecords,getRecord,updateRecord,deleteRecord} = require('../controllers/friends');

router.post('/',addRecord);
router.get('/',getAllRecords);
router.get('/:id',getRecord);
router.put('/:id',updateRecord);
router.delete('/:id',deleteRecord);

module.exports = router;
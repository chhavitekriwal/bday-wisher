const {client} = require('../utils/db');
const {addRecordQuery, getAllRecordsQuery,getRecordQuery,updateDOBQuery,updateEmailQuery,deleteRecordQuery} = require('../utils/queries');
 
const addRecord = async (req, res) => {
    try {
        const newRecords = req.body;
        var count=0;
        for(record of newRecords) {
            const result = await client.query(addRecordQuery(record.name, record.dob, record.email));
            count+=result.rowCount;
        }
        res.status(201).json({
            status:'Success', 
            details: `Added ${count} records.`
        });
    } catch (err) {
        res.status(500).json({status:'Failure', details: err.message});
    }
}; 

const getAllRecords = async (req,res) => {                           
    try {
        const result = await client.query(getAllRecordsQuery());
        let recordsArr = result.rows;
        const {name,dob} = req.query;
        if(name) recordsArr = recordsArr.filter(record => record.name === name);
        if(dob) recordsArr = recordsArr.filter(record => record.date+'-'+record.month === dob);
        let resultsArr = [];
        for(record of recordsArr) {
            const formattedRecord = {
                id: record.id,
                name: record.name,
                DOB: record.date+'-'+record.month+'-'+record.year,
                email: record.email
            };
            resultsArr.push(formattedRecord);
        }
        res.status(200).json({
            status: 'Success',
            details: resultsArr
        });
    } catch (err) {
        res.status(500).json({status:'Failure', details: err.message});
    }
};

const getRecord = async(req,res) => {
    try {
        const id = req.params.id;
        let record = await client.query(getRecordQuery(id));
        record = record.rows;
        if(record.length == 0) throw new Error('No record found');
        const formattedRecord = {
            id:record[0].id,
            name: record[0].name,
            dob: record[0].date+'-'+record[0].month+'-'+record[0].year,
            email: record[0].email
        }
        res.status(200).json({
            status: 'Success',
            details: formattedRecord
        });
    } catch (err) {
        res.status(500).json({status:'Failure', details: err.message});
    }
}; 

const updateRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const {dob,email} = req.body;
        let result = ''
        if(dob) await client.query(updateDOBQuery(id,dob));
        if(email) await client.query(updateEmailQuery(id,email));
        res.status(200).json({
            status:'Success',
            details: `Updated record with ID ${id}`
        });
    } catch(err) {
        res.status(500).json({
            status: 'Failure',
            details: err.message
        });
    }
}

const deleteRecord = async (req,res) => {
    try {
        const id = req.params.id;
        let result = await client.query(deleteRecordQuery(id)); 
        res.status(200).json({
            status:'Success',
            details: `${result.command} ${result.rowCount}`
        });
    } catch(err) {
        res.status(500).json({
            status: 'Failure',
            details: err.message
        });
    }    
}
module.exports = {addRecord, 
                  getAllRecords,
                  getRecord,
                  updateRecord,
                  deleteRecord
                 };
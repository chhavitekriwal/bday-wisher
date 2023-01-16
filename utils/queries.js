const TABLE = `birthdays`;

const createTableQuery = () => `CREATE TABLE IF NOT EXISTS ${TABLE}(
    id SERIAL PRIMARY KEY,
    Name VARCHAR NOT NULL,
    Date CHAR(2) NOT NULL,
    Month CHAR(2) NOT NULL,
    Year CHAR(4) NOT NULL,
    Email VARCHAR NOT NULL
);`;

const addRecordQuery = (name, dob, email) => {

    const date = dob.slice(0,2);
    const month = dob.slice(3,5);
    const year = dob.slice(6);

    return `INSERT INTO ${TABLE} (Name,Date,Month,Year,Email)
                   VALUES ('${name}','${date}','${month}','${year}','${email}');`
};

const getAllRecordsQuery = () => `SELECT * FROM ${TABLE};`;

const getRecordQuery = (id) => `SELECT * FROM ${TABLE} WHERE id=${id};`;

const updateDOBQuery = (id, dob) => {
    const date = dob.slice(0,2);
    const month = dob.slice(3,5);
    const year = dob.slice(6);

    return `UPDATE ${TABLE} 
            SET Date='${date}',Month='${month}',Year='${year}' WHERE id=${id};`
};

const updateEmailQuery = (id,email) => `UPDATE ${TABLE}
                                      SET Email='${email}' WHERE id=${id};`;                               

const deleteRecordQuery = (id) => `DELETE FROM ${TABLE}
                                   WHERE id=${id};`;


module.exports = {createTableQuery,
                  addRecordQuery,
                  getAllRecordsQuery,
                  getRecordQuery,
                  updateDOBQuery,
                  updateEmailQuery,
                  deleteRecordQuery
                 };
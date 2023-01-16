const { client,connectDB } = require("./db");

const today = new Date();
let todaysDate = today.getDate(); if(todaysDate<10) todaysDate = '0'+todaysDate;
let todaysMonth = today.getMonth()+1; if(todaysMonth<10) todaysMonth = '0'+todaysMonth;
let currentYear = today.getFullYear();

const checker = async () => {
    try {
        const res = await client.query(`SELECT * FROM birthdays WHERE Date='${todaysDate}' AND Month='${todaysMonth}';`);
        const todaysBdays = res.rows.map(bdayFren => {
            return {
                name: bdayFren.name,
                email: bdayFren.email,
                age: currentYear - parseInt(bdayFren.year)
            }
        });
        return todaysBdays;
    } catch(err) {
        return err;
    }
};

module.exports = {checker};
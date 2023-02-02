const sgMail = require("@sendgrid/mail");
const {Client} = require("pg");
require("dotenv").config();
const client = new Client({connectionString: process.env.SUPABASE_CONNECTION_URI});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

client.connect();

const today = new Date();
let todaysDate = today.getDate();
if (todaysDate < 10) todaysDate = "0" + todaysDate;
let todaysMonth = today.getMonth() + 1;
if (todaysMonth < 10) todaysMonth = "0" + todaysMonth;
let currentYear = today.getFullYear();

const checker = async () => {
  try {
    const res = await client.query(`SELECT * FROM birthdays WHERE Date='${todaysDate}' AND Month='${todaysMonth}';`);
    const todaysBdays = res.rows.map(bdayFren => {
      return {
        name: bdayFren.name,
        email: bdayFren.email,
        age: currentYear - parseInt(bdayFren.year),
      };
    });
    return todaysBdays;
  } catch (err) {
    return err;
  }
};

const mailer = async () => {
  try {
    const bdayFrens = await checker();

    for (let fren of bdayFrens) {
      const msg = {
        to: `${fren.email}`,
        from: "Birthday wala Santa <ilikebdays@gmail.com>",
        subject: "Aww Tera Happy Budday!!",
        text: `
Wish you a very happy birthday ${fren.name}! Enjoy your day as you turn ${fren.age} and have a successful year ahead!
                      
With love,
Birthday wala Santa
`,
      };

      await sgMail.send(msg);
      console.log(`Mail sent to ${fren.name}!`);
      console.log(today);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

// const mailScheduler = () => cron.schedule("20 00 * * *", async ()=>{await mailer()}, {timezone: 'Asia/Kolkata'});

mailer();

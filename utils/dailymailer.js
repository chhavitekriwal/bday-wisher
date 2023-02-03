const sgMail = require("@sendgrid/mail");
const {Client} = require("pg");
require("dotenv").config();
const client = new Client({connectionString: process.env.SUPABASE_CONNECTION_URI});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

client.connect();

const today = new Date();
const todaysFullDate = today.toLocaleDateString('en-GB',{timeZone:'Asia/Kolkata'});
const todaysDate = todaysFullDate.substring(0,2);
const todaysMonth = todaysFullDate.substring(3,5);
const currentYear = parseInt(todaysFullDate.substring(6,11));

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
      const now = new Date().toLocaleTimeString("en-US",{timeZone: 'Asia/Kolkata'});
      console.log(`Mail sent to ${fren.name} at ${now}!`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};


mailer();

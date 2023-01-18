const { checker } = require('./dailychecker');
const sgMail = require('@sendgrid/mail');
const cron = require('node-cron');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const mailer = async () => {
    try {
        const bdayFrens = await checker();
        
        for (let fren of bdayFrens) {
            const msg = {
                to: `${fren.email}`, 
                from: 'Birthday wala Santa <ilikebdays@gmail.com>', 
                subject: 'Aww Tera Happy Budday!!',
                text: `Wish you a very happy birthday ${fren.name}! Enjoy your day as you turn ${fren.age} and have a successful year ahead!
                      
With love,
Birthday wala Santa`
            }

            await sgMail.send(msg);
            console.log('Mail sent!');
        }
    } catch (err) {
        return err;
    }
};

const mailScheduler = () => cron.schedule("*/10 * * * *",async ()=>{await mailer()});

module.exports = {mailScheduler};
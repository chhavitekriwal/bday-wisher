const { checker } = require('./dailychecker');

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
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

            sgMail
                .send(msg)
                .then((response) => {
                    console.log('Mail sent!');
                })
                .catch((error) => {
                    console.error(error.response.body);
                });  
        }
    } catch (err) {
        return err;
    }
};

const interval = (ms) => {
    setInterval(async () => {
        try {
            await mailer();
        } catch (err) {
            console.error(err);
        }
    }, ms);
};

module.exports = {mailer, interval};
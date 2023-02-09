const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transpoter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    };

    async sendActivationMail(to, link) {
        await this.transpoter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on JWT-TEST network!',
            text: '',
            html:
                `
                    <div>
                        <h1>To activate your account follow the link:</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();

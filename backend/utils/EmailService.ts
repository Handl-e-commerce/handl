import * as nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import {v4 as uuidv4} from "uuid";

/**
 * Email Service Utility Class
 */
class EmailService {
    /**
   * Utility method meant for just sending a verification email to a user
   * @param {string} name
   * @param {string} userId
   * @param {string} token
   * @param {string} email
   */
    public GenerateVerificationEmail(name: string, userId: string, token: string, email: string): void {
        const url = process.env.NODE_ENV === "local_dev" ?
            "http://localhost:3000" :
            process.env.NODE_ENV === "production" ?
                process.env.VERIFICATION_LINK : process.env.DEV_VERIFICATION_LINK;
        const verificationLink: string = url + `/verify?token=${token}&userId=${userId}`;
        const fraudPreventionLink: string = url + `/cancel-registration/?userId=${userId}`;
        const filePath = path.resolve("email-templates/VerifyEmail/VerifyEmail.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: name,
            verificationLink: verificationLink,
            fraudPreventionLink: fraudPreventionLink,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Please verify your email - The Handl Team",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "support@thehandl.com",
                pass: process.env.ZOHO_MAIL_PASSWORD as string,
            },
        });

        transporter.sendMail(mailOptions, (err, res)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully: ", res);
            }
        });
    }

    /**
     * Utility method meant for sending a secure email letting them know that we've successfully reset their password
     * @param {string} name
     * @param {string} email
     */
    public GeneratePasswordResetConfirmationEmail(name: string, email: string): void {
        // eslint-disable-next-line
        const filePath = path.resolve("email-templates/PasswordResetConfirmation/PasswordResetConfirmation.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: name,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Password Reset Confirmation - Handl",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "support@thehandl.com",
                pass: process.env.ZOHO_MAIL_PASSWORD as string,
            },
        });

        transporter.sendMail(mailOptions, (err, res)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully: ", res);
            }
        });
    }

    /**
     * Utility method meant for sending a secure email and link to let a uer reset their password
     * @param {string} name
     * @param {string} email
     * @param {string} userId
     * @param {string} token
     */
    public GeneratePasswordResetEmail(name: string, email: string, userId: string, token: string): void {
        const filePath = path.resolve("email-templates/ResetPassword/ResetPassword.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const url = process.env.NODE_ENV === "local_dev" ?
            "http://localhost:3000" :
            process.env.NODE_ENV === "production" ?
                process.env.VERIFICATION_LINK :
                process.env.DEV_VERIFICATION_LINK;
        const verificationLink: string = url + `/reset/redirect?token=${token}&userId=${userId}`;

        const replacements = {
            name: name,
            verificationLink: verificationLink,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Password Reset Confirmation - Handl",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "support@thehandl.com",
                pass: process.env.ZOHO_MAIL_PASSWORD as string,
            },
        });

        transporter.sendMail(mailOptions, (err, res)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully: ", res);
            }
        });
    }

    /**
     * Utility method meant for sending a secure email letting the user know we've deleted their account
     * @param {string} name
     * @param {string} email
     */
    public GenerateDeletionConfirmationEmail(name: string, email: string): void {
        const filePath = path.resolve("email-templates/DeletionConfirmation/DeletionConfirmation.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: name,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Account Deletion Confirmation - Handl",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "support@thehandl.com",
                pass: process.env.ZOHO_MAIL_PASSWORD as string,
            },
        });

        transporter.sendMail(mailOptions, (err, res)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully: ", res);
            }
        });
    }

    /**
     * Utility method meant for sending a secure email to our support email with their message
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @param {string} message
     */
    public GenerateSupportEmail(firstName: string, lastName: string, email: string, message: string): void {
        const mailOptions = {
            from: "Contact Us Form <support@thehandl.com>",
            to: "support@thehandl.com",
            subject: `Support Form Email - ${uuidv4().toString()} - from ${email}`,
            replyTo: email,
            text: `From: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "support@thehandl.com",
                pass: process.env.ZOHO_MAIL_PASSWORD as string,
            },
        });

        transporter.sendMail(mailOptions, (err, res)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully: ", res);
            }
        });
    }
}

export {EmailService};

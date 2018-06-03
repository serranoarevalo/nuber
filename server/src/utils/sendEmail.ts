import Mailgun from "mailgun-js";
import { MAILGUN_API_KEY } from "../keys";

const mailgun = new Mailgun({
  apiKey: MAILGUN_API_KEY,
  domain: "sandbox6dc95a40763144f59f34911bf0fb8eaf.mailgun.org"
});

export const sendConfirmationEmail = (key: string) => {
  const emailSubject = "Please confirm your email";
  const emailBody = `Hello please confirm your email by: <a href="http://localhost:3000/verify-email/${key}">clicking here</a>`;
  return sendMail(emailSubject, emailBody);
};

export const sendResetPasswordEmail = (key: string) => {
  const emailSubject = "Reset password";
  const emailBody = `Hello please click here to reset your password: <a href="http://nuber.co/reset/${key}">clicking here</a>`;
  return sendMail(emailSubject, emailBody);
};

export const sendMail = (subject: string, html: string) => {
  const emailData = {
    from: "itnico.las.me@gmail.com",
    to: "itnico.las.me@gmail.com",
    subject,
    html
  };
  return mailgun.messages().send(emailData);
};

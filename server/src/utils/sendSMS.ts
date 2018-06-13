import Twilio from "twilio";
import { TWILIO_FROM_NUMBER, TWILIO_ID, TWILIO_TOKEN } from "../keys";

const client = Twilio(TWILIO_ID, TWILIO_TOKEN);

export const sendVerificationText = (phoneNumber: string, code: string) =>
  sendSMS(phoneNumber, `Your verification code is: ${code}`);

const sendSMS = (phoneNumber: string, body: string) => {
  return client.messages.create({
    body,
    from: TWILIO_FROM_NUMBER,
    to: phoneNumber
  });
};

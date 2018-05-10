import Twilio from "twilio";
import { TWILIO_ID, TWILIO_TOKEN, TWILIO_FROM_NUMBER } from "../keys";

const client = Twilio(TWILIO_ID, TWILIO_TOKEN);

export const sendVerificationText = (number: string, code: string) =>
  sendSMS(number, `Your verification code is: ${code}`);

const sendSMS = (number: string, body: string) => {
  return client.messages.create({
    body,
    from: TWILIO_FROM_NUMBER,
    to: number
  });
};

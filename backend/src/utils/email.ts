import nodemailer from "nodemailer";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent to ${options.to}`);
  } catch (error) {
    console.error(`✗ Email error to ${options.to}:`, error);
    throw error;
  }
};

export const sendRegistrationEmail = async (
  email: string,
  name: string,
  registrationType: string,
): Promise<void> => {
  const html = `
    <h2>Welcome to CISRAI Conference 2026!</h2>
    <p>Dear ${name},</p>
    <p>Your registration has been received successfully.</p>
    <p><strong>Registration Type:</strong> ${registrationType}</p>
    <p>We will send you further details about payment and conference schedule soon.</p>
    <br>
    <p>Best regards,<br>CISRAI Conference Team</p>
  `;

  await sendEmail({
    to: email,
    subject: "Registration Confirmation - CISRAI 2026",
    html,
  });
};

export const sendReviewerInvitationEmail = async (
  email: string,
  name: string,
): Promise<void> => {
  const html = `
    <h2>Invitation to Review at CISRAI Conference 2026</h2>
    <p>Dear Dr. ${name},</p>
    <p>We are honored to invite you to serve as a reviewer for the CISRAI Conference 2026.</p>
    <p>Your expertise and experience would be invaluable to our conference.</p>
    <p>Please confirm your participation by logging into your account.</p>
    <br>
    <p>Best regards,<br>CISRAI Conference Team</p>
  `;

  await sendEmail({
    to: email,
    subject: "Invitation - Reviewer at CISRAI 2026",
    html,
  });
};

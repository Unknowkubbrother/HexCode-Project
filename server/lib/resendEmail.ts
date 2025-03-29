import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNotification = async (email: string, subject: string, html: string) => {
    if (process.env.NODE_ENV === 'development') return;

    resend.emails.send({
        from: 'noreply@email.unknowkubbrother.net',
        to: email,
        subject: 'HEXCODE - ' + subject,
        html: html,
    });
}

export const sendupdaetProblem = async (email: string, subject: string, html: string) => {
    if (process.env.NODE_ENV === 'development') return;

    resend.emails.send({
        from: 'noreply@email.unknowkubbrother.net',
        to: email,
        subject: 'HEXCODE - ' + subject,
        html: html,
    });
}
import nodemailer from 'nodemailer'

export const sendEmail = async ({to, subject, html}) => {
    const transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 465,
        // secure: true,
        service: 'gmail',
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD
        }
    })

    const info = await transporter.sendMail({
        from: `"Ahmed Yousry" <${process.env.MAILER_USER}>`,
        to,
        subject,
        html
    })

    return info
}
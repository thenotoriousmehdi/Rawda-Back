const nodemailer = require('nodemailer');

exports.sendEmail = async(req, res) => {
    // Get the email data from the request body
    const { name, email, message } = req.body;

    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'km_serir@esi.dz',
            pass: '********'
        }
    });

    // Set up email options with the dynamic variables
    const mailOptions = {
        from: 'km_serir@esi.dz',
        to: email,
        subject: `Message from ${name}`,
        text: message
    };

    try { // Send the email
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
};

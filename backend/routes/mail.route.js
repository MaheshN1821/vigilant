import nodemailer from "nodemailer";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const data = req.body;
		const actualData = JSON.parse(data?.data);
		const userEmail = actualData.email;

		// console.log(userEmail);

		const dataToSend = {
			Main: actualData?.highSeverityEvents,
			time: actualData?.timestamp,
		};

		const dataString = JSON.stringify(dataToSend);

		// Create the transporter for sending emails
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "knowyourmed1@gmail.com",
				pass: process.env.EMAIL_PASS, // Use app passwords for Gmail
			},
		});

		// Email options
		const mailOptions = {
			from: "knowyourmed1@gmail.com",
			to: `${userEmail}`,
			subject: "Mail regarding your laptop!",
			text: dataString,
		};

		// Function to send email
		const sendEmail = () => {
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log("Error:", error);
				} else {
					console.log("Email sent:", info.response);
				}
			});
		};

		sendEmail();

		return res
			.status(200)
			.json({ message: "Notification scheduling initialized." });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error." });
	}
});

export default router;

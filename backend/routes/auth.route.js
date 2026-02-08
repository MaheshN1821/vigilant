import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "uuid";
import { authenticateToken } from "../middleware/verifyJwt.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: "Some values are missing!" });
		}
		const findUser = await User.findOne({ email }).lean();
		if (findUser) {
			return res.status(409).json({ message: "Email-id already exists!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const createUser = await User.create({
			name: name,
			email: email,
			password: hashedPassword,
		});

		const { password: _, ...userWithoutPassword } = createUser.toObject();

		return res.status(201).json({
			message: "User Created Successfully!",
			user: userWithoutPassword,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Some values are missing!" });
		}
		const findUser = await User.findOne({ email }).lean();
		if (!findUser) {
			return res.status(404).json({ message: "Email-id does not exists!" });
		}

		const passwordCheck = await bcrypt.compare(password, findUser?.password);

		if (!passwordCheck) {
			return res
				.status(401)
				.json({ message: "Credentials entered is incorrect!" });
		}

		const tokenPayload = {
			userId: findUser?._id,
			email: findUser?.email,
		};

		const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
			expiresIn: "15m",
		});

		const userData = {
			token: accessToken,
			user: {
				email: findUser?.email,
				name: findUser?.name,
				userId: findUser?._id,
				machineId: findUser?.machineId,
			},
		};

		return res.status(200).json({
			userData,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/:mId", authenticateToken, async (req, res) => {
	try {
		const { mId } = req.params;
		const { email } = req.body;
		const isValidUUId = validate(mId);
		if (!isValidUUId || !email) {
			return res.status(400).json({ message: "Invalid UUId or email" });
		}

		const user = await User.findOne({ email }).lean();
		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ machineId: mId },
			{ new: true },
		);

		if (!updatedUser) {
			return res.status(500).json({
				message: "Not able to update at the moment, try again later!",
			});
		}

		return res.status(200).json({ message: "Update Successful!" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

export default router;

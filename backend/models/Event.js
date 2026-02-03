import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
	{
		machineId: String,
		name: String,
		severity: String,
		source: String,
		eventId: Number,
		fields: Object,
		timestamp: Number,
	},
	{ timestamps: true },
);

export const Event = mongoose.model("Event", EventSchema);

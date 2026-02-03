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

EventSchema.index({ machineId: 1 });

EventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });

export const Event = mongoose.model("Event", EventSchema);

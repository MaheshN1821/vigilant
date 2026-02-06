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
		receivedAt: { type: Number, index: true },
	},
	{ timestamps: true },
);

EventSchema.index({ machineId: 1, receivedAt: -1 });
// Auto-delete documents 2 hours after creation
EventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });

export const Event = mongoose.model("Event", EventSchema);

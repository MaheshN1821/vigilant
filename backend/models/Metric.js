import mongoose from "mongoose";

const MetricSchema = new mongoose.Schema(
	{
		machineId: { type: String, required: true, index: true },
		name: String,
		value: String,
		timestamp: Number,
		receivedAt: { type: Number, index: true },
	},
	{ timestamps: true },
);

MetricSchema.index({ machineId: 1, receivedAt: -1 });

MetricSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });

export const Metric = mongoose.model("Metric", MetricSchema);

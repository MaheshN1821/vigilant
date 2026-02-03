import mongoose from "mongoose";

const MetricSchema = new mongoose.Schema(
	{
		machineId: String,
		name: String,
		value: String,
		timestamp: Number,
	},
	{ timestamps: true },
);

MetricSchema.index({ machineId: 1 });
// Auto-delete documents 2 hours after creation
MetricSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });

export const Metric = mongoose.model("Metric", MetricSchema);

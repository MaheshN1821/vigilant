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

export const Metric = mongoose.model("Metric", MetricSchema);

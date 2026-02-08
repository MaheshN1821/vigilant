import express from "express";
import axios from "axios";
import { Event } from "../models/Event.js";

const router = express.Router();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "";
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

// Optimized system prompt for log analysis
const SYSTEM_PROMPT = `You are an expert system administrator and log analysis AI. Your role is to analyze system events/logs and provide actionable insights.

ANALYSIS FRAMEWORK:
1. **Event Summary**: Briefly summarize what events occurred
2. **Severity Assessment**: Rate overall system health (HEALTHY, WARNING, CRITICAL)
3. **Anomaly Detection**: Identify unusual patterns, errors, or concerning trends
4. **Impact Analysis**: Explain what these events mean for the system and user
5. **Predictions**: Assess crash risks, performance degradation, or security concerns
6. **Recommendations**: Provide step-by-step solutions if issues detected
7. **Resources**: Include links to YouTube tutorials, articles, and documentation

OUTPUT FORMAT (strict JSON):
{
  "analysis_timestamp": "ISO 8601 timestamp",
  "time_range_analyzed": "description of log time range",
  "severity": "HEALTHY | WARNING | CRITICAL",
  "summary": {
    "total_events": number,
    "event_types": ["type1", "type2"],
    "key_findings": "brief overview"
  },
  "events_breakdown": [
    {
      "event_type": "string",
      "count": number,
      "severity": "INFO | WARNING | ERROR | CRITICAL",
      "description": "what this event means",
      "why_logged": "reason for logging"
    }
  ],
  "anomalies": [
    {
      "type": "string",
      "description": "detailed explanation",
      "severity": "LOW | MEDIUM | HIGH",
      "first_occurrence": "timestamp if available"
    }
  ],
  "risk_assessment": {
    "crash_probability": "LOW | MEDIUM | HIGH",
    "performance_impact": "NONE | MINOR | MODERATE | SEVERE",
    "security_concerns": ["concern1", "concern2"],
    "data_integrity": "SAFE | AT_RISK | COMPROMISED"
  },
  "system_health": {
    "overall_status": "string",
    "concerns": ["concern1", "concern2"],
    "positive_indicators": ["indicator1", "indicator2"]
  },
  "recommended_actions": [
    {
      "priority": "IMMEDIATE | HIGH | MEDIUM | LOW",
      "action": "what to do",
      "steps": ["step1", "step2", "step3"],
      "resources": [
        {
          "type": "video | article | documentation",
          "title": "resource title",
          "url": "actual URL",
          "relevance": "why this helps"
        }
      ],
      "estimated_time": "time to complete",
      "difficulty": "EASY | INTERMEDIATE | ADVANCED"
    }
  ],
  "prevention_tips": ["tip1", "tip2"],
  "next_monitoring_focus": ["what to watch for"]
}

CRITICAL RULES:
- Always respond with valid JSON only
- If logs show no issues, set severity to HEALTHY and recommended_actions to []
- Be specific with event explanations - avoid generic statements
- Include real, searchable YouTube video titles and documentation URLs
- Prioritize user safety and data integrity
- Use clear, non-technical language for descriptions
- Provide context for why events matter to end users`;

// Main endpoint for log analysis
router.get("/analyze-events/:machineId", async (req, res) => {
	try {
		const { machineId } = req.params;
		const now = Date.now();
		const from = now - 3600000;

		let events = [];

		events = await Event.find({
			machineId,
			receivedAt: { $gte: from, $lte: now },
		}).lean();
		// Construct user prompt with event data
		const userPrompt = `
TIME RANGE: "Last 1 hours (exact range unknown)"

EVENTS DATA:
${JSON.stringify(events, null, 2)}

TASK: Analyze these system events comprehensively and provide structured insights following the exact JSON format specified in your instructions. Include real YouTube tutorial links and documentation that would help resolve any issues found.`;

		// Call Perplexity API
		const response = await axios.post(
			PERPLEXITY_API_URL,
			{
				model: "sonar-pro",
				messages: [
					{
						role: "system",
						content: SYSTEM_PROMPT,
					},
					{
						role: "user",
						content: userPrompt,
					},
				],
				temperature: 0.2, // Lower temperature for consistent, factual analysis
				max_tokens: 4000,
				return_citations: true,
				top_p: 0.9,
				search_recency_filter: "month", // For finding recent resources
			},
			{
				headers: {
					Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
					"Content-Type": "application/json",
				},
			},
		);

		// Extract and parse response
		const aiResponse = response?.data?.choices[0].message.content;

		// Try to parse JSON response
		let analysisResult;
		try {
			// Remove markdown code blocks if present
			let cleanedResponse = aiResponse.trim();

			// Remove markdown JSON code blocks
			cleanedResponse = cleanedResponse
				.replace(/```json\s*/g, "")
				.replace(/```\s*/g, "");

			// Try to find JSON object boundaries if response has extra text
			const jsonStart = cleanedResponse.indexOf("{");
			const jsonEnd = cleanedResponse.lastIndexOf("}");

			if (jsonStart !== -1 && jsonEnd !== -1) {
				cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
			}

			// Attempt to parse
			analysisResult = JSON.parse(cleanedResponse);
		} catch (parseError) {
			console.error("JSON Parse Error:", parseError.message);
			console.error("Raw response length:", aiResponse.length);
			console.error("First 1000 chars:", aiResponse.substring(0, 1000));
			console.error(
				"Last 500 chars:",
				aiResponse.substring(Math.max(0, aiResponse.length - 500)),
			);

			// Try to repair incomplete JSON
			try {
				let repairAttempt = aiResponse
					.trim()
					.replace(/```json\s*/g, "")
					.replace(/```\s*/g, "");

				const jsonStart = repairAttempt.indexOf("{");
				if (jsonStart !== -1) {
					repairAttempt = repairAttempt.substring(jsonStart);
				}

				// Count open/close braces and brackets
				const openBraces = (repairAttempt.match(/\{/g) || []).length;
				const closeBraces = (repairAttempt.match(/\}/g) || []).length;
				const openBrackets = (repairAttempt.match(/\[/g) || []).length;
				const closeBrackets = (repairAttempt.match(/\]/g) || []).length;

				// Try to close unclosed structures
				if (openBraces > closeBraces) {
					// Check if last character is a quote, comma, or incomplete string
					if (repairAttempt.endsWith('"') || repairAttempt.endsWith(",")) {
						repairAttempt = repairAttempt.slice(0, -1); // Remove trailing quote/comma
					}

					// Close arrays first, then objects
					for (let i = 0; i < openBrackets - closeBrackets; i++) {
						repairAttempt += "]";
					}
					for (let i = 0; i < openBraces - closeBraces; i++) {
						repairAttempt += "}";
					}
				}

				analysisResult = JSON.parse(repairAttempt);
				console.log("✓ Successfully repaired JSON");
			} catch (repairError) {
				// If repair fails, return minimal valid structure
				console.error("Repair attempt failed:", repairError.message);

				analysisResult = {
					error: "Failed to parse AI response - response was incomplete",
					parse_error: parseError.message,
					severity: "WARNING",
					summary: {
						total_events: events.length,
						event_types: [...new Set(events.map((e) => e.level || "UNKNOWN"))],
						key_findings:
							"Analysis incomplete - AI response was truncated. Try with fewer events.",
					},
					recommended_actions: [
						{
							priority: "HIGH",
							action: "Reduce the number of events and try again",
							steps: [
								"The AI response was cut off due to size limits",
								"Try analyzing a smaller time window",
								"Or filter events by severity before analysis",
							],
							resources: [],
							estimated_time: "5 minutes",
							difficulty: "EASY",
						},
					],
					raw_response_preview: aiResponse.substring(0, 500) + "...",
				};
			}
		}

		// Add metadata
		analysisResult.metadata = {
			analyzed_at: new Date().toISOString(),
			events_count: events.length,
			model_used: "sonar-pro",
			citations: response.data.citations || [],
		};

		res.json({
			success: true,
			data: analysisResult,
		});
		// let analysisResult;
		// try {
		// 	// Remove markdown code blocks if present
		// 	let cleanedResponse = aiResponse.trim();

		// 	// Remove markdown JSON code blocks
		// 	cleanedResponse = cleanedResponse
		// 		.replace(/```json\s*/g, "")
		// 		.replace(/```\s*/g, "");

		// 	// Try to find JSON object boundaries if response has extra text
		// 	const jsonStart = cleanedResponse.indexOf("{");
		// 	const jsonEnd = cleanedResponse.lastIndexOf("}");

		// 	if (jsonStart !== -1 && jsonEnd !== -1) {
		// 		cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
		// 	}

		// 	analysisResult = JSON.parse(cleanedResponse);
		// } catch (parseError) {
		// 	console.error("JSON Parse Error:", parseError.message);
		// 	console.error("Raw response length:", aiResponse.length);
		// 	console.error("First 500 chars:", aiResponse.substring(0, 500));

		// 	// If JSON parsing fails, return raw response with error indication
		// 	analysisResult = {
		// 		error: "Failed to parse AI response",
		// 		parse_error: parseError.message,
		// 		raw_response: aiResponse.substring(0, 1000), // Limit to first 1000 chars
		// 		severity: "WARNING",
		// 	};
		// }

		// Add metadata
		// analysisResult.metadata = {
		// 	analyzed_at: new Date().toISOString(),
		// 	events_count: rawData.length,
		// 	model_used: "sonar-pro",
		// 	citations: response.data.citations || [],
		// };

		// return res.status(200).json({
		// 	success: true,
		// 	data: analysisResult,
		// });
	} catch (error) {
		console.log(
			"Error analyzing logs:",
			error.response?.data || error.message,
		);

		return res.status(500).json({
			success: false,
			error: "Analysis failed",
			message: error.response?.data?.error || error.message,
			details: error.response?.data,
		});
	}
});

export default router;

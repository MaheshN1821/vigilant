export const EVENT_ID_INFO = {
	17: {
		title: "Hardware Corrected Error",
		explanation:
			"Windows detected a hardware-related issue (usually PCIe or memory) but corrected it automatically. Frequent occurrences may indicate failing hardware or driver issues.",
		category: "Hardware",
	},

	41: {
		title: "Unexpected Shutdown",
		explanation:
			"The system rebooted without a clean shutdown. This often happens due to power loss, system crash, or hardware failure.",
		category: "System",
	},

	1000: {
		title: "Application Crash",
		explanation:
			"An application crashed unexpectedly. Repeated crashes usually point to a buggy application or missing dependencies.",
		category: "Application",
	},

	1001: {
		title: "Bug Check (BSOD)",
		explanation:
			"Windows encountered a critical error and had to stop. This is commonly known as a Blue Screen of Death (BSOD).",
		category: "System",
	},

	4798: {
		title: "User Account Enumeration",
		explanation:
			"A process queried information about user accounts. This can be normal (system services) or security-related if frequent.",
		category: "Security",
	},

	4625: {
		title: "Failed Login Attempt",
		explanation:
			"A user attempted to log in with incorrect credentials. Repeated occurrences may indicate a forgotten password or unauthorized access attempt.",
		category: "Security",
	},

	105: {
		title: "Battery Fully Charged",
		explanation: "Your device battery has reached full charge.",
		category: "Power",
	},

	506: {
		title: "Power Source Changed",
		explanation: "The system power source changed (plugged in or unplugged).",
		category: "Power",
	},
};

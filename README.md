# Vigilant

## AI-Powered System Monitoring & Crash Prevention Platform

Vigilant is a proactive, AI-driven system monitoring platform designed to analyze Windows system health in real time and detect potential risks before they lead to crashes or data loss. It combines a lightweight background agent, centralized log processing, and AI-powered anomaly detection to provide actionable insights, risk assessments, and preventive recommendations.

---

## Table of Contents

- [Overview](#overview)
- [Why Vigilant?](#why-vigilant)
- [System Architecture](#system-architecture)
- [How It Works](#how-it-works)
- [Dashboard Insights](#dashboard-insights)
- [Alert System](#alert-system)
- [Analysis Report Generation](#analysis-report-generation)
- [AI Model](#ai-model)
- [Tech Stack](#tech-stack)
- [Security Features](#security-features)
- [Key Capabilities](#key-capabilities)
- [Use Cases](#use-cases)
- [Installation](#installation)

---

## Overview

Traditional system monitoring tools show raw logs and metrics. Vigilant goes further by:

- Continuously collecting system events and hardware metrics
- Analyzing the last 2 hours of activity using AI (Perplexity Sonar-Pro)
- Detecting hardware degradation, credential issues, privilege anomalies
- Estimating crash probability and performance impact
- Generating structured analysis reports
- Notifying users instantly via email when critical issues occur

Vigilant focuses on **prevention, not just monitoring.**

---

## Why Vigilant?

**Problem**: System failures often occur without warning, leading to data loss, downtime, and productivity impact.

**Solution**: Vigilant provides early warning signals by analyzing system behavior patterns, identifying anomalies, and recommending preventive actions before failures occur.

**Key Differentiators**:
- AI-powered root cause analysis
- Proactive crash probability estimation
- Automated alert system with context
- Actionable recommendations with priority levels
- Real-time correlation of system events and hardware metrics

---

## System Architecture

Vigilant follows a distributed architecture:

```
User → Web Platform → Download Agent → Background Monitoring
                ↓
    Windows Agent (vigilant-agent.exe)
                ↓
    Collects logs every 1 minute
                ↓
    Backend API (Node.js + Express)
                ↓
    MongoDB (Event + Metrics Storage)
                ↓
    AI Analysis (Perplexity Sonar-Pro)
                ↓
    Insights + Risk Assessment + Alerts
```

### Component Breakdown

**Frontend (Web Dashboard)**
- User authentication and session management
- Real-time system status visualization
- Analysis report generation interface
- Alert configuration panel

**Backend API**
- RESTful endpoints for agent communication
- JWT-based authentication layer
- Log aggregation and preprocessing
- AI analysis orchestration
- Email notification service

**Monitoring Agent**
- Lightweight Windows background process
- Event log extraction (System, Hardware, Security)
- Performance metrics collection (CPU, Memory, Disk)
- 1-minute polling interval
- Secure API communication

**Database Layer**
- MongoDB for event storage
- Time-series optimized schema
- Efficient querying for 2-hour analysis windows

**AI Analysis Engine**
- Perplexity Sonar-Pro integration
- Pattern recognition in system logs
- Risk scoring algorithm
- Recommendation generation

---

## How It Works

### 1. User Authentication

Users log in securely using JWT-based authentication. After login, users download the `vigilant-agent.exe` executable.

### 2. Background Monitoring Agent

The Vigilant Agent:
- Runs as a lightweight Windows background process
- Sends system events and metrics every 1 minute
- Collects hardware/system/boot events, security audit logs, credential manager events, privilege assignment logs
- Monitors CPU, memory, and disk metrics
- Can store logs locally if internet is unavailable (optional enhancement)
- Automatically resumes transmission once connectivity is restored

### 3. Real-Time Log Processing

The backend:
- Stores logs in MongoDB with timestamp indexing
- Aggregates the most recent 2 hours of activity
- Prepares structured log summaries for AI analysis
- Maintains data retention policies

### 4. AI-Powered Analysis

Vigilant uses **Perplexity Sonar-Pro** to analyze system activity. The AI evaluates:
- Recurring hardware errors and Machine Check Exceptions
- Credential cache failures
- Privilege escalation frequency
- Unusual login activity patterns
- Disk I/O and performance degradation
- Crash indicators and BSOD precursors

---

## Dashboard Insights

After analysis, Vigilant provides:

### System Status Summary
- Operational state monitoring
- Monitoring required indicators
- Hardware health signals

### Risk Assessment
- **Crash Probability**: LOW / MEDIUM / HIGH classification
- **Performance Impact**: Quantified degradation metrics
- **Data Integrity Status**: Risk to data consistency

### Detected Anomalies

Examples:
- Recurring correctable hardware errors
- Credential Manager cache misses
- High frequency of user privilege checks
- Abnormal boot sequence patterns

### Recommended Actions

Each action includes:
- Priority level (High / Medium / Low)
- Estimated time to resolve
- Difficulty level
- Clear step-by-step instructions

### Forward-Looking Monitoring Suggestions

AI-generated suggestions such as:
- Monitor specific Event ID frequency thresholds
- Watch for BSOD indicators
- Track disk errors alongside hardware failures
- Observe memory allocation patterns

---

## Alert System

When warning or critical events are detected:

- Users receive automated email notifications
- Alerts are triggered for:
  - High-frequency hardware errors
  - Crash probability spikes
  - Security anomaly patterns
  - Critical system event sequences
- Users can generate a structured analysis report for deeper investigation
- Alert configuration allows customization of thresholds

---

## Analysis Report Generation

Users can generate a detailed AI-based system analysis report including:

- Time window analyzed
- Event summaries and frequency distributions
- Risk classification with confidence scores
- Root-cause explanations
- Recommended actions with implementation details
- Prevention tips and best practices

This helps users:
- Understand what is happening in their system
- Take corrective action early
- Prevent system failure before it occurs
- Document system behavior for troubleshooting

---

## AI Model

**Perplexity Sonar-Pro**
- Optimized for contextual log interpretation
- Converts raw system events into human-readable insights
- Pattern recognition across temporal sequences
- Contextual understanding of Windows event relationships

---

## Tech Stack

### Frontend
- React.js - Component-based UI framework
- TailwindCSS - Utility-first styling
- Responsive Dashboard UI

### Backend
- Node.js - Runtime environment
- Express.js - Web application framework
- RESTful APIs
- JWT Authentication

### Database
- MongoDB - Document-oriented storage
- Time-series optimized collections

### AI Integration
- Perplexity Sonar-Pro API

### Agent
- Windows executable (`vigilant-agent.exe`)
- Event log extraction via Windows APIs
- Metric collection at 1-minute intervals
- Secure HTTPS communication

### Notifications
- Email-based alert system
- Template-driven notification content

---

## Security Features

- **JWT-based authentication**: Secure token-based session management
- **Machine ID verification**: Agent identity validation
- **Secure API communication**: HTTPS-only data transmission
- **Role-based access**: Extendable permission system
- **Data encryption**: At-rest and in-transit encryption
- **Audit logging**: Comprehensive activity tracking

---

## Key Capabilities

- Real-time monitoring with 1-minute granularity
- AI-driven anomaly detection
- Crash probability estimation
- Automated alert system with context
- Intelligent recommended actions
- Prevention-focused insights
- Structured report generation
- Historical event correlation

---

## Use Cases

- **Developers**: Proactive crash prevention during development cycles
- **Power Users**: Monitoring system stability for critical workloads
- **Security Teams**: Tracking privilege anomalies and credential issues
- **IT Professionals**: Hardware degradation detection and replacement planning
- **System Administrators**: Early-stage system reliability monitoring

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Windows OS (for agent deployment)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/vigilant.git
cd vigilant

# Install backend dependencies
cd backend
npm install

# Configure environment variables
cp .env.example .env (message me for details)
# Edit .env with your configuration

# Start the backend server
npm start
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend
npm install

# Start development server
npm run dev
```

### Agent Deployment

1. Log in to the web dashboard
2. Navigate to the "Download Agent" section
3. Download `vigilant-agent.exe`
4. Run the agent with administrator privileges
5. Agent will automatically register with your account

---

## Contact

Mail: maheshn0418@gmail.com
Project Link: https://vigilant-cyberx.vercel.app/

---

**Vigilant is not just a monitoring tool — it is a proactive AI-driven system intelligence platform designed to help users detect and resolve system risks before failure occurs.**

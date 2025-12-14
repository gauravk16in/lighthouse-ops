{
  "incident_classification": {
    "severity": "SEV-2",
    "confidence": 0.82,
    "reasoning": "Latency is elevated but service is still responding"
  },

  "investigation_plan": [
    "Check recent latency metrics",
    "Inspect error rates",
    "Review recent deploys or config changes"
  ],

  "tool_decisions": [
    {
      "tool": "fetch_metrics",
      "reason": "Confirm whether latency is sustained or transient"
    },
    {
      "tool": "fetch_logs",
      "reason": "Identify upstream dependency or timeout patterns"
    }
  ],

  "decision": {
    "action": "retry_then_mitigate",
    "retry_count": 1,
    "mitigation": "restart_service",
    "reasoning": "Transient spikes often recover; restart only if retry fails"
  },

  "verification": {
    "method": "recheck_latency",
    "success_threshold_ms": 300
  },

  "final_summary": {
    "root_cause_hypothesis": "Service entered degraded state due to resource contention",
    "actions_taken": [
      "Retried request",
      "Restarted service"
    ],
    "outcome": "Latency restored to normal",
    "confidence": 0.76
  }
}

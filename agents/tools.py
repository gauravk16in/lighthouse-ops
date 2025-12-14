import random
import datetime
from typing import Dict, List


def fetch_metrics(service_name: str) -> Dict:
    """
    Fetch latency and error metrics for a service.

    This simulates a real metrics backend (Prometheus / Datadog / CloudWatch).
    In a real system, this would query a metrics API.
    """

    # Simulated metrics (deterministic enough for demo)
    latency_ms = random.randint(450, 900)
    error_rate = round(random.uniform(0.01, 0.15), 3)

    return {
        "service": service_name,
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "metrics": {
            "latency_ms": latency_ms,
            "error_rate": error_rate
        }
    }


def fetch_logs(service_name: str, time_window: str) -> List[Dict]:
    """
    Fetch recent logs for a service.

    This simulates log aggregation (ELK / Loki / Cloud Logging).
    """

    simulated_logs = [
        {
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "level": "WARNING",
            "message": "Upstream request timeout detected"
        },
        {
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "level": "ERROR",
            "message": "Service response exceeded latency budget"
        }
    ]

    return [
        {
            "service": service_name,
            "time_window": time_window,
            "log": log
        }
        for log in simulated_logs
    ]


def propose_action(action_type: str) -> Dict:
    """
    Propose an operational action to be executed by the workflow engine (Kestra).

    IMPORTANT:
    - This function does NOT execute the action.
    - It only returns a structured proposal for Kestra to act on.
    """

    allowed_actions = [
        "restart_service",
        "clear_cache",
        "rollback_config",
        "no_action"
    ]

    if action_type not in allowed_actions:
        raise ValueError(f"Unsupported action type: {action_type}")

    return {
        "action": action_type,
        "proposed_at": datetime.datetime.utcnow().isoformat(),
        "requires_approval": False,
        "execution_owner": "kestra"
    }

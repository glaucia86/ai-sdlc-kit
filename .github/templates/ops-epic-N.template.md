# Operations — Epic <N>

## Delivery summary

## Deployment preparation

### Required environment variables

### Infrastructure dependencies

### Deployment sequence

### Breaking changes

### Rollback plan

## Observability

### Critical logs

### Health metrics

### Recommended alerts

### Production validation criteria

## Expected anomaly patterns

> Define what distinguishes normal from abnormal behavior for the flows in this epic.
> Use tool-agnostic metrics and observations (e.g.: error rate, latency, volume).

| Indicator | Expected normal value | Alert threshold | Critical threshold |
|---|---|---|---|
| <!-- e.g.: error rate on epic routes --> | <!-- e.g.: < 0.5% --> | <!-- e.g.: > 2% --> | <!-- e.g.: > 5% --> |
| <!-- e.g.: average response time --> | <!-- e.g.: < 200 ms --> | <!-- e.g.: > 500 ms --> | <!-- e.g.: > 2 s --> |

<!-- Add as many rows as needed. If not applicable, write "Not applicable in this epic." -->

## Incident triage playbook

> For each relevant symptom, describe the investigation and remediation path.
> This playbook is used by the `/ops-triage` prompt.

### [Symptom 1 — e.g.: unexpected error in production]

- **Most likely hypothesis:** <!-- What probably caused this? -->
- **Immediate investigation:** <!-- Where to look first? Which logs, metrics, or endpoints to check? -->
- **Remediation action:**
  1. Workaround: <!-- Immediate action to limit impact without fixing the root cause -->
  2. Mitigate: <!-- Reduce impact wHITLe the fix is being prepared -->
  3. Fix: <!-- Definitive fix -->
  4. Prevent: <!-- What to change so this doesn't happen again -->
- **Escalation:** <!-- If the above actions don't resolve in X minutes, who/what to escalate to? -->

<!-- Add one block per relevant symptom identified for this epic. -->

## Feedback for future epics

### Learnings

### Identified risks

### Adjustment suggestions for epics.md

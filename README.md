# ClockingPulse Heartbeat Action

A lightweight, zero-dependency GitHub Action to ping your ClockingPulse Heartbeat Monitors.

👉 **Get your free Heartbeat Token at [clockingpulse.com](https://clockingpulse.com)**

Perfect for monitoring CI/CD deployments, backup scripts, and cron jobs.

## Usage

You can use this action to track the duration and status of your workflows by sending a `run` state at the beginning, and a `complete` (or `fail`) state at the end.

```yaml
name: Deploy Application

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Notify ClockingPulse (Start)
        uses: clockingpulse/heartbeat-action@v1
        with:
          token: ${{ secrets.CLOCKING_PULSE_TOKEN }}
          state: 'run'

      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run Build & Deploy
        run: ./deploy.sh

      - name: Notify ClockingPulse (Complete)
        if: success()
        uses: clockingpulse/heartbeat-action@v1
        with:
          token: ${{ secrets.CLOCKING_PULSE_TOKEN }}
          state: 'complete'

      - name: Notify ClockingPulse (Fail)
        if: failure()
        uses: clockingpulse/heartbeat-action@v1
        with:
          token: ${{ secrets.CLOCKING_PULSE_TOKEN }}
          state: 'fail'
```

## Inputs

| Input | Description | Required | Default |
| --- | --- | --- | --- |
| `token` | The unique heartbeat token from your [ClockingPulse dashboard](https://clockingpulse.com) | **Yes** | `null` |
| `state` | The state of the job (`run`, `complete`, `fail`) | No | `run` |

## How it works

This action uses native Node 20 `fetch` to ping the `https://clockingpulse.com/api/heartbeat/{token}?state={state}` endpoint. Because it has **zero dependencies**, it runs blazingly fast and adds virtually no overhead to your CI pipeline.

## 🚀 More than just Heartbeats

When you create your free account on [ClockingPulse](https://clockingpulse.com), you don't just get Heartbeats. Your workspace comes fully equipped with a suite of reliability tools:

- 🟢 **Uptime Monitors**: Ping your website or API every 60 seconds (HTTP/TCP/DNS) from multiple global regions.
- 📊 **Beautiful Status Pages**: Generate a public, branded status page to build trust with your users.
- 💰 **AWS Cost Intelligence**: Sync your AWS billing data to detect terrifying infrastructure cost anomalies before the bill arrives.
- 🚨 **Multi-Channel Alerting**: Route your alerts to Slack, Discord, Email, or Webhooks instantly.

**[Start monitoring your infrastructure for free today.](https://clockingpulse.com)**

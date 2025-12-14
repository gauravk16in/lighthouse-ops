# Lighthouse Ops 🚨

**Autonomous Operations Platform** - Illuminate issues. Automate solutions.

Lighthouse Ops is an intelligent incident response and operations automation platform that combines AI-powered decision making with parallel task execution. Built with Next.js and integrated with Kestra workflow orchestration.

## Features

- 🧠 **Intelligent Intent Parsing** - Automatically understands and classifies operational commands
- 🔄 **Parallel Execution** - Handles DevOps and administrative tasks simultaneously
- 🛠️ **DevOps Integration** - Auto-scales Kubernetes clusters and diagnoses infrastructure issues
- 📝 **Notion Integration** - Creates and updates incident reports automatically
- ⚡ **Real-time UI** - Live status updates and execution logs

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform in action.

## Project Structure

```
lighthouse-ops/
├── app/                    # Next.js 14 App Router
│   ├── api/trigger/       # API endpoint for Kestra integration
│   └── page.tsx           # Main UI
├── agents/                # AI agent logic
│   ├── planner.py         # Task planning agent
│   ├── decision_log.py    # Decision logging
│   └── tools.py           # Agent tools
├── workflow/              # Kestra workflow definitions
└── docs/                  # Architecture documentation
```

## Configuration

The platform requires a Kestra instance running on `http://localhost:8080`. Update the webhook URL in `app/api/trigger/route.ts` if using a different configuration.

## Deployment

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables if needed
4. Deploy

### Deploy with Docker

```bash
docker build -t lighthouse-ops .
docker run -p 3000:3000 lighthouse-ops
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Kestra Documentation](https://kestra.io/docs)

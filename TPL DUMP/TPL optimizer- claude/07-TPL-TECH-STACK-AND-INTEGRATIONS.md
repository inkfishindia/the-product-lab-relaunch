# TPL Tech Stack & Integrations

> **Last Updated**: 2026-03-20
> **Source**: Connected MCP servers, Airtable schema, project skills, conversation context

---

## Core Platform

| Tool | Role | Status |
|------|------|--------|
| **Airtable** | Core operations database — 7 interconnected bases | ✅ Active (primary system) |
| **WooCommerce** | E-commerce platform (Online Orders) | ✅ Active (integrated with Base 7) |

---

## Connected Tools (via MCP Servers)

The following tools are connected to the Claude workspace, indicating active use in the TPL ecosystem:

| Tool | MCP Server | Likely Role in TPL |
|------|-----------|-------------------|
| **Softr** | `mcp.pipedream.net/.../Softr` | Customer-facing portal or internal operations app built on Airtable |
| **Notion** | `mcp.notion.com/mcp` + Pipedream Notion API Key | Knowledge management, documentation, project tracking |
| **Canva** | `mcp.canva.com/mcp` | Marketing materials, product imagery, social media design |
| **Figma** | `mcp.figma.com/mcp` | Product design, packaging design, UI/UX design |
| **Slack** | `mcp.slack.com/mcp` | Team communication |
| **Gmail** | `gmail.mcp.claude.com/mcp` | Email communication |
| **Google Calendar** | `gcal.mcp.claude.com/mcp` | Scheduling, reminders |
| **Google Drive** | (native integration) | Document storage, shared files |
| **Asana** | `mcp.asana.com/sse` | Project/task management |
| **Supabase** | `mcp.supabase.com/mcp` | Database/backend for custom apps |
| **Vercel** | `mcp.vercel.com` | Web app hosting/deployment |
| **Fireflies** | `api.fireflies.ai/mcp` | Meeting transcription and notes |
| **Hugging Face** | `huggingface.co/mcp` | AI model access (image generation, etc.) |
| **Rube** | `rube.app/mcp` | Workflow automation |

---

## Integration Architecture (Inferred)

### Data Flow Between Systems

```
WooCommerce ──► [sync/API] ──► Airtable Base 7 (Online Orders)
  │
  └──► Woocom Products
  └──► Woocom Products Variation
  └──► Online Orders Line (order import)

Airtable ──► [Softr] ──► Customer/Team Portals
  │
  └──► Order tracking for clients
  └──► Inventory dashboards for team
  └──► Internal operations tools

Airtable ──► [Notion] ──► Documentation & Knowledge Base
  │
  └──► Product documentation
  └──► Process SOPs
  └──► Project tracking

Slack ──► Team Communication
Gmail ──► Client Communication
Google Calendar ──► Scheduling & Reminders (links to Base 2: Reminders)
Asana ──► Project Management
```

### Automation Layer

| Platform | Purpose (Inferred) |
|----------|-------------------|
| **Pipedream** | Hosts Softr + Notion MCP connections — likely automation middleware |
| **Rube** | Workflow automation tool |
| **Airtable Automations** | Native triggers within Airtable bases |
| *Zapier/Make* | **Not confirmed** — but common for WooCommerce↔Airtable sync |

---

## Custom Skills (Claude Project)

The project has several custom skills configured:

| Skill | Purpose |
|-------|---------|
| `ppc-strategic-prompt-builder` | PPC advertising prompt workflows |
| `walsh-gemini-prompting` | Brand identity + Gemini image generation methodology |
| `skill-builder-pro` | Creating and optimizing custom Claude skills |
| `dan-prompt-generator` | Strategic prompts for YDS/TPL business ecosystem |
| `amazon-6-pager-writer` | Amazon-style narrative memos for strategy decisions |
| `skill-creator` | Skill creation, modification, and evaluation |

### Notable Skill References

The `dan-prompt-generator` skill explicitly references:
- **Dan** — likely the founder/operator
- **YDS** — Your Daily Scent (brand within TPL ecosystem)
- **TPL** — The Product Lab
- Expert panel-based prompting with real operators
- Revenue-focused frameworks

---

## Development & Deployment Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| **Frontend** | Softr (on Airtable) | No-code portals and apps |
| **Backend** | Supabase | Custom database/API for apps beyond Airtable |
| **Hosting** | Vercel | Web application deployment |
| **Design** | Figma + Canva | Product design + marketing design |
| **AI/ML** | Hugging Face | Image generation and AI model access |

---

## ⚠️ Gaps & Open Questions

- What specific Softr apps/portals exist? (Client portal? Team dashboard?)
- What's the Notion workspace structure? (Databases, pages, templates?)
- How does WooCommerce sync to Airtable — Zapier, Make, Pipedream, or custom?
- What Supabase databases/tables exist?
- What's deployed on Vercel?
- Are there Airtable Automations running? What do they do?
- What Asana projects/workspaces are active?
- Is Pipedream used as the primary automation layer?
- What Rube workflows exist?

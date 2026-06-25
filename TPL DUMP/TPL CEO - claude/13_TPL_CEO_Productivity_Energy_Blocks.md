# TPL — CEO PRODUCTIVITY SYSTEM & ENERGY BLOCKS
## Dan's Daily Schedule, Task Library, and Decision Frameworks

---

## ENERGY BLOCK SYSTEM

| Block | Time | Energy | Max Tasks | Color | Focus |
|-------|------|--------|-----------|-------|-------|
| Morning Operations | 9-11 AM | Medium | 6 | #E8F4FD | Business processing |
| Strategic Focus | 11 AM-1 PM | High | 3 | #FFF2CC | High-impact growth |
| Social & Meetings | 1-5 PM | Medium | 4 | #E1F5E1 | Relationship building |
| Creative Command | 6-10 PM | High (Peak) | 3 | #FFE6CC | Peak creative value |
| Night Strategy | 10 PM-12 AM | High | 2 | #F3E2F3 | Visionary planning |

**Energy-Task Alignment Strategy:**
- Morning (Medium): Operational processing, data updates, communication
- Strategic (High): Business development, planning, analysis
- Social (Medium): Meetings, relationship building, coordination
- Creative (Peak): Design review, content creation, artistic collaboration
- Night (Peak): Vision work, strategic planning, innovation

---

## RECURRING TASK LIBRARY (AUTO-GENERATE = DAILY)

### Morning Operations (9-11 AM) — BUSINESS PROCESSING

| Task | Frequency | Energy | Time | Type |
|------|-----------|--------|------|------|
| TPL Revenue Dashboard Update | Daily | Medium | 15min | Operations |
| Order Fulfillment Queue Review | Daily | Medium | 20min | Operations |
| Artist Revenue Processing | Daily | Medium | 15min | Operations |
| WhatsApp Business & Email Batch | Daily | Medium | 30min | Communication |
| Cash Flow & Expense Tracking | Daily | Medium | 10min | Admin |
| Inventory & Production Status | Daily | Medium | 15min | Operations |

**Weekly Operations Tasks:**
- Artist Payment Distribution (Fridays, 45min)
- Supplier Payment Processing (Tuesdays, 30min)
- Weekly Performance Report (Mondays, 30min)

### Strategic Focus (11 AM-1 PM) — HIGH-IMPACT GROWTH

| Task | Frequency | Energy | Time | Type |
|------|-----------|--------|------|------|
| B2B Pipeline Development | Weekly (Mon) | High | 2hr | Strategic |
| Artist Partnership Strategy | Weekly (Wed) | High | 1.5hr | Strategic |
| Revenue Channel Optimization | Weekly (Fri) | High | 1hr | Strategic |
| Market Intelligence & Positioning | Bi-weekly | High | 2hr | Strategic |
| TPL Growth Strategy Sessions | Weekly (Tue) | High | 2hr | Strategic |

### Social & Meetings (1-5 PM) — RELATIONSHIP BUILDING

| Task | Frequency | Energy | Time | Type |
|------|-----------|--------|------|------|
| Team Coordination Check-in | Daily | Medium | 20min | Communication |
| Client Relationship Maintenance | Daily | Medium | 30min | Communication |
| Artist Collaboration Meetings | Weekly | Medium | 1hr | Creative/Comms |
| Client Presentations & Pitches | As needed | Medium | 1-2hr | Communication |
| Vendor & Supplier Meetings | Bi-weekly | Medium | 1hr | Operations |
| Industry Networking Events | Weekly | Medium | 2hr | Strategic |

### Creative Command (6-10 PM) — PEAK CREATIVE VALUE

| Task | Frequency | Energy | Time | Type |
|------|-----------|--------|------|------|
| Product Design Review & Approval | Daily | High | 45min | Creative |
| Brand Content Creation | Daily | High | 1hr | Creative |
| Creative Campaign Development | MWF | High | 1.5hr | Creative |
| Artist Drop Planning & Curation | Weekly (Wed) | High | 2hr | Creative |
| Brand Visual Identity Evolution | Weekly (Fri) | High | 2hr | Creative |
| Product Innovation & Development | Weekly (Mon) | High | 2hr | Creative/Strategic |

### Night Strategy (10 PM-12 AM) — VISIONARY PLANNING

| Task | Frequency | Energy | Time | Type |
|------|-----------|--------|------|------|
| Tomorrow's Priority Setting | Daily | High | 15min | Planning |
| Weekly Vision & Goal Alignment | Weekly (Sun) | High | 45min | Strategic |
| Long-term Strategy & Vision Planning | Weekly (Sun) | High | 2hr | Strategic |
| Innovation & Future Opportunities | Weekly (Thu) | High | 1.5hr | Creative/Strategic |
| Performance Analysis & Optimization | Weekly (Sat) | High | 1hr | Strategic |

---

## CONTEXT TAGS

| Tag | Use |
|-----|-----|
| @creative | Design work, content creation, artistic collaboration |
| @computer | Data entry, analytics, online work |
| @calls | Phone meetings, client conversations, team coordination |
| @thinking | Strategic planning, analysis, creative ideation |
| @errands | Physical tasks, supplier visits, shipping |
| @artist-collab | Artist-specific work requiring creative collaboration |
| @client-focused | B2B client work requiring business mindset |
| @revenue-ops | Financial and operational tasks affecting revenue |

---

## DAILY EXECUTION LIST (Notion Database)

**Priority Score Formula:**
```
if(Status == "Blocked", 0,
  if(Block.EnergyLevel == "High" AND EnergyRequired == "High", 10,
  if(SourceType == "Client", 8,
  if(SourceType == "Project", 6, 4))))
```

**Current Block Match Formula:**
```
if(now() >= Block.StartTime AND now() <= Block.EndTime, "🟢 NOW", "")
```

**Views:**
1. Today's Focus (Date = Today, Status ≠ Complete)
2. Current Block Tasks (Current Block Match = "🟢 NOW")
3. Next Actions (Status = Next, Sort: Priority desc)
4. In Progress
5. Blocked Items
6. Completed Today
7. Weekly Review (Date = This Week, Group by: Status)

---

## TOTAL RECURRING TASKS

- **87 core recurring tasks** covering all business operations
- **Daily auto-generate tasks:** ~15 tasks across all blocks
- **Weekly specialized tasks:** ~25 tasks
- **Monthly/bi-weekly:** ~10 tasks
- **Ad-hoc/as-needed:** Variable

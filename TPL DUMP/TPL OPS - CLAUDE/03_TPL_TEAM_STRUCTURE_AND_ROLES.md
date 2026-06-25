# THE PRODUCT LAB — TEAM STRUCTURE & ROLES

---

## CURRENT TEAM ROSTER (6 CORE MEMBERS)

| Name | Role | Primary Responsibilities | Bin Workflow Zone |
|------|------|------------------------|-------------------|
| **Dan** | Founder / Manager | Strategic oversight, client approvals, QC, bin creation, order completion | CREATION_STATION, QC_CHECKPOINT |
| **Kalpana** | Ops Team - Materials & Packing | Material allocation, inventory prep, packing execution | MATERIALS_INVENTORY, PACKING_STATION |
| **Sara** | Ops Team - Coordination & Assembly | Factory coordination, assembly oversight, QC support | FACTORY_PICKUP, ASSEMBLY_STATION |
| **Anthony** | Ops Team - Assembly | Assembly execution | ASSEMBLY_STATION |
| **Muskan** | Ops Team - Shipping | Shipping preparation, dispatch, customer communication automation | SHIPPING_READY |
| **Design Team** | Creative Execution | Design files, mock-ups, print-ready files | N/A (upstream) |

---

## ROLE-BASED WORKFLOW RESPONSIBILITIES

### Dan (Founder / Manager)

**Daily Schedule:**
| Time | Activity |
|------|----------|
| 9:00 AM | Review overnight alerts and bottlenecks |
| 10:30 AM | Approve designs and create bins for ready items |
| 2:00 PM | Factory coordination and pickup scheduling |
| 4:00 PM | QC review for items at checkpoint |
| 6:00 PM | Client communication and strategic decisions |

**System Responsibilities:**
- Change order status to "Confirmed" (triggers workflow)
- Review mock and print files
- Get client approval (external communication)
- Update Client Approval Status → "Approved"
- Update Routing Instructions → factory assignment
- Create physical bin and generate BIN_CODE
- Perform QC inspection
- Confirm order completion
- Monitor delivery and collect customer feedback
- Update Customer Satisfaction Rating (1–5 stars)

### Kalpana (Materials & Packing)

**Workflow Triggers:**
- Receives notification when bin is created at CREATION_STATION
- Takes bin to MATERIALS_INVENTORY
- Allocates materials per auto-generated checklist
- Scans QR: "Materials allocation complete"
- Later: receives bins at PACKING_STATION after QC pass
- Executes final packing per product-specific standards

**Workload Benchmark:**
- Materials queue: ~3 bins (~45 min)
- Packing queue: ~3 bins (~60 min)
- Typical workload: ~1.75 hours active bin work

### Sara (Coordination, Assembly, QC)

**Workflow Triggers:**
- Coordinates factory pickup when bins reach FACTORY_PICKUP
- Receives factory returns and sorts into bins
- Oversees assembly at ASSEMBLY_STATION
- Performs QC support alongside Dan

**Workload Benchmark:**
- Assembly pending: ~2 bins (~90 min)
- QC required: ~1 bin (~20 min)
- Factory coordination: pickups as scheduled
- Typical workload: ~2 hours active

### Anthony (Assembly)

**Workflow Triggers:**
- Receives assembly-ready bins at ASSEMBLY_STATION
- Follows product-specific assembly cards
- Scans QR on completion

**Workload Benchmark:**
- Assembly assigned: ~1–2 bins (~45 min each)
- Available for additional tasks when caught up

### Muskan (Shipping)

**Workflow Triggers:**
- Receives bins at SHIPPING_READY
- Prepares final shipping packages
- Books parcels with courier services
- Enters tracking numbers
- Updates shipping method

---

## MANAGEMENT STRUCTURE

```
Dan (Founder/Manager)
├── Design Team (Creative)
├── Kalpana (Materials + Packing)
├── Sara (Factory Coordination + Assembly + QC)
├── Anthony (Assembly)
└── Muskan (Shipping + Dispatch)
```

**Reporting Lines:**
- All ops team → Dan (direct report)
- Design team → Dan (creative direction)
- `fldvbSipAc59maRCR` — Reporting manager field (from Allocated to) in Airtable

---

## PLANNED HIRE: ORDER & OPERATIONS MANAGER

### Role Definition

| Attribute | Detail |
|-----------|--------|
| **Position** | Order & Operations Manager |
| **Reports To** | Dan (Founder) |
| **Direct Reports** | Assembly Team (Person A & B), part-time support |
| **Split** | 40% Order Management / 60% Operations Management |
| **Salary Range** | ₹6,00,000 – ₹9,00,000 annually |
| **Performance Bonus** | Up to 20% of base salary |

### Order Management Responsibilities (40%)
- Review incoming orders for completeness and accuracy
- Verify client specifications against capabilities
- Prioritize orders by client tier and deadlines
- Coordinate with design team on custom requirements
- Update order status in Airtable
- Communicate timeline expectations to clients
- Flag rush orders and coordinate premium handling
- Serve as primary operations contact for Fortune 500 clients
- Response time: within 2 hours during business hours
- Proactive updates: daily for rush, weekly for standard

### Operations Management Responsibilities (60%)
- Daily team briefings and priority setting
- Performance monitoring and coaching
- Quality standard enforcement (target >99% pass rate)
- Client complaint rate target: <0.5%
- Rework rate target: <2%
- Daily inventory checks and reorder management
- Coordinate with procurement for component supplies

### Required Qualifications
- 3–5 years in operations, order management, or production
- Experience with Airtable, project management tools, or ERP
- Understanding of print-on-demand / just-in-time manufacturing
- Lean manufacturing principles knowledge
- Quality control and process improvement methodologies

### Preferred Qualifications
- Bachelor's in Operations Management, Industrial Engineering, or related
- Six Sigma or Lean certification
- Creative industry or custom manufacturing experience
- Fortune 500 client service experience

### Career Growth Path
| Year | Milestone |
|------|-----------|
| Year 1 | Master current operations, establish excellence |
| Year 2 | Lead expansion initiatives, process optimization |
| Year 3 | Potential promotion to Operations Director |
| Year 5 | Potential GM or COO track |

### Performance Bonus Criteria
| Category | Weight |
|----------|--------|
| Order management excellence | 30% |
| Operations efficiency improvements | 30% |
| Quality and client satisfaction | 25% |
| Team development and leadership | 15% |

### Success Milestones

**90-Day Goals:**
- 100% order processing accuracy
- Daily production rhythm established
- All logging and reporting systems live
- Target quality pass rates achieved

**6-Month Objectives:**
- 30% reduction in order processing time
- Consistent daily production targets
- 3+ process improvements implemented
- Cross-trained, high-performing team

**Annual Targets:**
- 50% increase in order capacity without team expansion
- Top-tier client satisfaction scores
- Scalable systems for ₹1Cr+ revenue
- 15%+ operational cost improvements

---

## TEAM TRAINING PROTOCOL (AIRTABLE ROLLOUT)

| Day | Focus | Team Member |
|-----|-------|-------------|
| Day 1 | Executive views, automation triggers, formula validation | Dan |
| Day 2 | Materials queue workflow, inventory tracking, status updates | Kalpana |
| Day 3 | Production coordination, factory communication, assembly tracking | Sara & Anthony |
| Day 4 | Shipping queue, dispatch tracking, customer communication | Muskan |
| Day 5 | Cross-functional workflow testing, performance baseline, feedback | All |

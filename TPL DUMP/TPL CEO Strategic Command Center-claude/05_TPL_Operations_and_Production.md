# 05 — THE PRODUCT LAB: OPERATIONS & PRODUCTION

---

## PRODUCTION INFRASTRUCTURE

| Element | Detail |
|---------|--------|
| **Factory** | Ink Fish (parent company, 11-year established) |
| **Model** | Shared facility — TPL operates within Ink Fish infrastructure |
| **Capacity** | 200 units/day |
| **Current Output** | 156 units/day (78% utilization) |
| **Production Type** | JIT (Just-In-Time), custom print-on-demand |
| **Max Stock Policy** | 45 days |
| **New Factory Status** | "New factory is strong" (confirmed May 2025) |

---

## ORDER-TO-DISPATCH WORKFLOW

### Current Fulfillment Timeline (from Operations Guide)

| Stage | Time Window | Target |
|-------|-------------|--------|
| Processing | 0-6 hours | Receive, validate, allocate |
| Production | 6-18 hours | Print, manufacture |
| QC | 18-20 hours | Quality control inspection |
| Packed | 20-22 hours | Packaging & labeling |
| Shipped | 22-24 hours | Handoff to logistics |
| **Total** | **<24 hours** | **Target: 18 hours avg** |

### Current Performance
- Fulfillment Time: 18h avg ✅
- Order Accuracy: target 99.5%+
- On-Time Delivery: target 98%+

### Optimized Process Target (8-12 hours)
1. Real-Time Order Processing
2. Automated Payment Integration
3. AI Inventory Allocation
4. Smart Production Scheduling
5. Inline Quality Verification
6. Automated Packaging
7. Integrated Shipping

---

## PRODUCTION COMMAND DATABASE

### Database Properties
| Property | Type | Description |
|----------|------|-------------|
| Batch_ID | Title | Production batch identifier |
| Status | Select | Queued / In Progress / QC / Completed / On Hold |
| Batch_Size | Number | Units in production |
| Quality_Score | Percentage | 0-100% quality rating |
| Assigned_Team | Multi-select | Production Lead / Quality Control / Assembly Team |

### Production Status Flow
```
Queued → In Progress → QC → Completed
                              ↘ On Hold (if issues)
```

### Quality Targets
| Metric | Target |
|--------|--------|
| First Pass Yield | 98%+ (current: 98.2-98.4%) |
| Defect Rate | <0.5% |
| Rework Rate | <2% |
| OEE (Overall Equipment Effectiveness) | 85%+ (current: 87%) |
| Customer Return Rate | <0.3% (current: 0.4%) |

---

## ORDER PIPELINE (Live Snapshot from CEO Command Center)

```
Received: 12 → Processing: 8 → Production: 15 → Packaging: 6 → Shipped: 23
```
- Orders in Queue: 23 (Expected completion: 6h)
- Shipping Delays: 2 orders (tracking updated) 🟡
- Customer Inquiries: 3 pending (Avg response: 2h) ✅

---

## OPS WING — HQ OPERATIONS TEAM (from May 27, 2025)

### Core Operations Flow (what ops team manages)
1. Orders and products come in
2. Manage product customisation
3. Design coordination with team
4. Approval from client
5. Factory routing based on customisation type
6. Receiving from factory
7. Assembly and packaging allocation
8. QC inspection
9. Dispatch

### Recommended Ops Team Structure
| Role | Salary | Responsibility |
|------|--------|----------------|
| Operations Manager | ₹60-80K/month | Entire order-to-dispatch flow |
| Customization Coordinator | ₹25K/month | Design coordination, client approval |
| QC Specialist | ₹30K/month | Quality control inspection |
| Dispatch Coordinator | ₹25K/month | Packaging, shipping, logistics |

---

## LEAN MANUFACTURING — 7 WASTES ANALYSIS

### 1. Transportation Waste
| Issue | Solution | Impact |
|-------|----------|--------|
| Multiple material movements between Ink Fish and TPL | Redesign workflow layout | 15-20% cycle time reduction |
| Inefficient layout | Implement kanban system | 10% labor efficiency improvement |
| Manual inventory transfers | Dedicated TPL production zones | — |

### 2. Inventory Waste
| Issue | Solution | Impact |
|-------|----------|--------|
| Overstock of slow-moving designs | ABC analysis | 25-30% holding cost reduction |
| Understock of bestsellers | Dynamic safety stock | 40% stockout reduction |
| No real-time visibility | Real-time tracking + alerts | — |

### 3. Motion Waste
| Issue | Solution | Impact |
|-------|----------|--------|
| Inefficient workstation setup | Ergonomic design | 20% labor productivity improvement |
| Manual data entry | Single-click integration | 50% data entry error reduction |
| Multiple system logins | Mobile-first interfaces | — |

### 4. Waiting Waste
| Issue | Solution | Impact |
|-------|----------|--------|
| Material unavailability delays | Automated replenishment | 30% cycle time reduction |
| Quality approval bottlenecks | Parallel approval processes | 25% capacity utilization improvement |
| Artist communication delays | Async communication workflows | — |

### 5. Overproduction Waste
| Issue | Solution | Impact |
|-------|----------|--------|
| Batch production without demand validation | Pull-based system | 35% inventory reduction |
| Excessive experimental designs | Market validation first | 20% waste elimination |
| Poor demand forecasting | Statistical forecasting | — |

### 6. Overprocessing Waste
| Issue | Solution | Impact |
|-------|----------|--------|
| Excessive quality checks | Risk-based QC | 25% processing time reduction |
| Manual automatable processes | Process automation | 30% resource optimization |
| Redundant approvals | Streamlined workflows | — |

### 7. Defects Waste
| Issue | Solution | Impact |
|-------|----------|--------|
| Reactive quality control | Predictive monitoring | 60% defect reduction |
| Inconsistent standards | Statistical process control | 40% rework elimination |
| Limited root cause analysis | Systematic RCA | — |

---

## KAIZEN CONTINUOUS IMPROVEMENT FRAMEWORK

### Daily (10-minute huddles)
- **Morning (9 AM):** Performance review, target setting, issue identification
- **Evening (7:30 PM):** Achievement assessment, problem documentation, next-day optimization

### Weekly (2-hour sessions)
- **Monday:** Process performance analysis
- **Wednesday:** Cross-functional coordination review
- **Friday:** Innovation and experimentation

### Monthly (Half-day workshops)
- **Week 1:** Data analysis and pattern identification
- **Week 2:** Process redesign and documentation
- **Week 3:** Implementation and training
- **Week 4:** Performance measurement and adjustment

---

## AI-POWERED OPERATIONS (from May 27, 2025)

### 5 Columns to Add to Existing Product Line Table
```
AI_Priority_Score (1-10, auto-calculated)
Bottleneck_Alert (Auto-flagged by AI)
Next_Action_Required (AI-suggested)
Estimated_Completion (AI-predicted)
Status_Last_Updated (Auto-timestamp)
```

### AI Logic Rules
```javascript
// Smart Status Management
IF Product_status = "Production" AND days_since_update > 3 
THEN Flag "Bottleneck_Alert" = TRUE
THEN Next_Action = "Check with Production_by team"

// Intelligent Routing
IF new_order.customization = "complex" 
THEN Production_by = "Senior_Team"
THEN AI_Priority_Score = 8

// Predictive Completion
Product_complexity + Team_capacity + Current_queue 
= Estimated_Completion_Date

// Bottleneck Detection
IF Status unchanged > 2 days THEN Bottleneck_Alert = TRUE
IF QC_By = empty AND Packed_qty = 0 THEN flag for assignment
```

### AI Implementation Timeline
| Week | Focus |
|------|-------|
| Week 1 | AI agent setup, connect Claude to Airtable, 4 basic rules, test 10 orders |
| Week 2 | Hourly monitoring, auto-flag bottlenecks, WhatsApp alerts |
| Week 3 | Predictive completion dates, priority adjustments, team optimization |
| Week 4 | 24/7 monitoring, proactive problem solving, performance optimization |

---

## PRODUCTION DATA (from CSV Analysis, May 2025)

- **Production workbench:** 22 orders with status tracking issues
- **Product line items:** 50 individual items across various production stages
- **Data quality issues:**
  - Bottleneck tracking shows incomplete data (null values)
  - Status transitions lack timestamp consistency
  - Product-level status disconnected from order-level status
  - Manual allocation processes creating delays
  - No automated quality checkpoints

---

## TEAM PERFORMANCE SCORECARD (from CEO Command Center)

| Team Member | Efficiency | Quality | Growth |
|-------------|-----------|---------|--------|
| Production Lead | 94% | 99.2% | +12% |
| Quality Control | 89% | 97.8% | +8% |
| Fulfillment A | 92% | 99.1% | +15% |
| Fulfillment B | 87% | 98.9% | +6% |

---

## ALERT & ESCALATION SYSTEM

### Priority Classification
| Level | Response Time | Examples |
|-------|--------------|----------|
| 🔴 CRITICAL | CEO Immediate | Production stopped, quality crisis, cash flow emergency |
| 🟡 HIGH | 2-hour response | Capacity constraints, material shortages, customer complaints |
| 🟢 MEDIUM | Same day | Performance deviations, maintenance needs, minor delays |
| ℹ️ INFO | Weekly review | Trends, opportunities, routine updates |

### Active Alerts (from dashboard snapshot)
- 🔴 CRITICAL: None
- 🟡 ATTENTION: Material reorder needed (Canvas — 3 days stock)
- 🟡 ATTENTION: Quality control backup (2-hour delay)
- 🟢 MONITORING: Peak season preparation 85% complete

---

## EMERGENCY PROCEDURES

### System Downtime
1. Switch to manual tracking (Excel/Google Sheets)
2. Notify team and stakeholders
3. Ensure no data loss
4. Restore system and update missing data

### Critical Quality Issues
1. Stop production — immediate hold on affected batches
2. Root cause analysis
3. Proactive customer notification
4. Process improvement to prevent recurrence

### Major Stockout
1. Contact backup suppliers immediately
2. Communicate delays, offer alternatives
3. Prioritize high-demand items
4. Review forecasting and ordering procedures

---

## ⚠️ FLAGS & NOTES

- **Bottleneck identified:** Quality Control Station 2 (2h delay, from dashboard)
- **Capacity surplus:** 44 units/day headroom (200 capacity - 156 output)
- **Order IF-OF-00451:** 230 units = 115% of daily capacity — required capacity planning
- **Ink Fish shared facility** creates competing priority risk as TPL scales
- **Quick commerce (Swiggy Instamart)** integration planned — requires sub-24h fulfillment consistency

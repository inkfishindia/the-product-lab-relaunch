# TPL — TECHNOLOGY STACK, AUTOMATION & DATABASE ARCHITECTURE
## Complete Systems, N8N Workflows, and Notion/Airtable Schema

---

## CURRENT TECHNOLOGY STACK

| System | Purpose |
|--------|---------|
| **WooCommerce** | E-commerce platform (theproductlab.in) |
| **Airtable** | CRM, order tracking, inventory management, customer data |
| **Notion** | Project management, SOPs, team coordination, CEO command center |
| **N8N** | Automation workflows and system integration |
| **WhatsApp Business** | Customer communication and order updates |
| **ShipRocket** | E-commerce shipping and dispatch |
| **TPL APP (Softr-based)** | Retail store order management |
| **Claude (Anthropic)** | Content and strategy optimization |
| **Instagram** | Primary social media (@the.product.lab) |
| **Google Analytics 4** | Website traffic and conversion tracking |

---

## AIRTABLE DATABASE STRUCTURE

### Table: CUSTOMERS
```
- Customer ID (Auto-number)
- Name (Text)
- Email (Email)
- Phone (Phone)
- Registration Date (Date)
- Last Purchase Date (Date)
- Total Orders (Count from Orders)
- Total Spent (Rollup from Orders)
- Average Order Value (Formula)
- Customer Segment (Formula: VIP/Regular/New)
- Preferred Categories (Multi-select)
- Artist Interests (Multi-select)
- Communication Preferences (Multi-select)
- Lifetime Value Score (Formula)
```

### Table: ORDERS
```
- Order ID (Text — from WooCommerce)
- Customer (Link to Customers)
- Order Date (Date)
- Order Value (Currency)
- Items (Link to Order Items)
- Status (Select: Pending/Processing/Shipped/Delivered)
- Shipping Address (Long text)
- Payment Method (Select)
- Discount Applied (Currency)
- Artist Commission (Currency)
- Profit Margin (Formula)
```

### Table: OFFLINE ORDERS
```
- Managed via TPL APP (Softr front-end on Airtable)
- Team assignments: Muskan, Kalpana, Danish Hanif
- Product types tracked: Lapel Pins, Keychains, Fridge Magnets, 3D Standees, etc.
- Factory production tracking with status icons
- WhatsApp integration for client communication
```

### Additional Tables (Referenced)
- **Clients table**
- **Retail store orders table**
- **Inventory table**

---

## NOTION DATABASE ARCHITECTURE

### Database 1: ENERGY BLOCKS
```
Properties:
- Block Name (Title)
- Time Window (Text)
- Energy Level (Select): High/Medium/Low
- Current Status (Select): Active/Upcoming/Complete
- Daily Capacity (Number)
- Block Color (Select)
- Default Duration (Number)

Records:
1. Morning Operations | 9-11 AM | Medium | 6 tasks | #E8F4FD
2. Strategic Focus | 11 AM-1 PM | High | 3 tasks | #FFF2CC
3. Social & Meetings | 1-5 PM | Medium | 4 tasks | #E1F5E1
4. Creative Command | 6-10 PM | High | 3 tasks | #FFE6CC
5. Night Strategy | 10 PM-12 AM | High | 2 tasks | #F3E2F3
```

### Database 2: RECURRING TASK LIBRARY
```
Properties:
- Task Template (Title)
- Assigned Block (Relation → Energy Blocks)
- Frequency (Select): Daily/MWF/Weekly/Monthly
- Energy Required (Select): High/Medium/Low
- Time Estimate (Select): 15min/30min/1hr/2hr/4hr+
- Task Type (Multi-select): Admin/Creative/Strategic/Operations/Communication
- Auto-Generate (Checkbox)
- Priority Base (Select): High/Medium/Low
- Context Tag (Multi-select): @calls/@computer/@creative/@errands
- Instructions (Text)
- Success Criteria (Text)
```

### Database 3: DAILY EXECUTION LIST
```
Properties:
- Task Name (Title)
- Date (Date)
- Source Type (Select): Recurring/Project/Client/Ad-hoc
- Source Template (Relation → Recurring Task Library)
- Block Assignment (Relation → Energy Blocks)
- Status (Select): Next/In Progress/Complete/Blocked/Deferred
- Priority Score (Formula — auto-calculated)
- Notes (Text)
- Blocking Issue (Text)
- Next Action (Text)

Priority Score Formula:
if(Status == "Blocked", 0,
  if(Block.EnergyLevel == "High" AND EnergyRequired == "High", 10,
  if(SourceType == "Client", 8,
  if(SourceType == "Project", 6, 4))))
```

### Database 4: TPL OPERATIONS COMMAND
```
Properties:
- Date (Date)
- Day of Week (Formula)
- Week Number (Formula)
- Total Revenue (Number)
- D2C Revenue (Number)
- B2B Revenue (Number)
- Artist Platform Revenue (Number)
- Orders Count (Number)
- AOV (Formula: Revenue ÷ Orders)
- Top Priority Today (Text)
- Critical Issues (Text)
- Artist Updates (Text)
- Client Deliverables (Text)
- Next Day Setup (Text)
- Weekly Revenue Target (Number)
- Weekly Revenue Actual (Rollup)
- Weekly Variance (Formula)
```

### CEO Command Center Databases (from project docs)
- Revenue Acceleration Command Center
- Quarterly OKR Tracker
- Artist Ecosystem Scaling Center
- B2B Pipeline Tracker
- Financial Performance Center
- Channel Expansion Command Center
- Risk Management Dashboard

---

## N8N AUTOMATION WORKFLOWS

### Workflow 1: Daily Performance Update
```
Trigger: Daily at 9:00 AM
Actions:
1. Pull WooCommerce sales data (last 24 hours)
2. Calculate key metrics (revenue, orders, AOV)
3. Update Notion Financial Performance Center
4. Check for alerts (conversion <1.5%, ROAS <2x)
5. Send Slack notification to Dan
6. Update CEO Dashboard
```

### Workflow 2: Weekly CEO Report
```
Trigger: Every Monday at 8:00 AM
Actions:
1. Aggregate week's performance data
2. Calculate variance from targets
3. Generate trend analysis
4. Identify top 3 priorities
5. Create automated CEO report in Notion
6. Send WhatsApp summary to Dan
7. Schedule team huddle if critical issues
```

### Workflow 3: Artist Performance Monitoring
```
Trigger: Weekly on Sundays
Actions:
1. Calculate artist revenue for previous week
2. Update Artist Ecosystem database
3. Identify top and bottom performers
4. Generate artist-specific performance reports
5. Send appreciation messages to top performers
6. Flag artists needing support
```

### Workflow 4: B2B Pipeline Management
```
Trigger: Every Tuesday and Friday
Actions:
1. Review pipeline stage progression
2. Identify stale opportunities (>7 days no activity)
3. Generate follow-up task reminders
4. Calculate weighted pipeline value
5. Send pipeline summary to Dan
6. Alert for deals approaching close dates
```

### Workflow 5: Order Processing (Core)
```
Trigger: New WooCommerce Order
Actions:
1. Extract order details + artist attribution
2. Validate + calculate commission
3. Check inventory (JIT consideration)
4. Create Airtable order record
5. Update Notion revenue dashboard
6. Send customer confirmation + WhatsApp
7. Schedule follow-up touchpoints
```

### Workflow 6: Customer Journey Automation
```
Welcome Series → Abandoned Cart Recovery → Post-Purchase Engagement
- Welcome: 5-email sequence over 2 weeks + first-purchase discount
- Abandoned Cart: Day 0, Day 2 (with discount), Day 5 (urgency)
- Post-Purchase: Delivery confirmation → Review request (Day 3) → Artist content → Replenishment
```

### Workflow 7: Inventory Reorder
```
WooCommerce → Airtable → N8N → Supplier Notifications
- Sale recorded → Stock updated → Reorder trigger → Supplier notified
- JIT policy: 45-day maximum stock
```

---

## WooCommerce API INTEGRATION

```yaml
Endpoint: /wp-json/wc/v3/orders
Authentication: Consumer Key + Consumer Secret
Data: Orders from last 24 hours

Revenue Calculation (JavaScript):
const orders = $input.all();
let revenue = {
  total: 0, d2c: 0, b2b: 0, artist: 0,
  quickCommerce: 0, orderCount: 0
};
orders.forEach(order => {
  const orderTotal = parseFloat(order.json.total);
  revenue.total += orderTotal;
  revenue.orderCount += 1;
  // Channel classification via meta_data
});
```

---

## WEBSITE TECH STACK (WooCommerce Plugins)

**Core:** WooCommerce Subscriptions, Bookings, Product Add-Ons, Quick View, Wishlist
**Performance:** WP Rocket, Smush, WP-Optimize
**SEO & Marketing:** Yoast SEO Premium, MonsterInsights, OptinMonster

**Mobile-First Design:**
- Mobile: 320-768px (70% of traffic)
- Tablet: 768-1024px (15%)
- Desktop: 1024px+ (15%)
- Touch-friendly: 44px minimum buttons
- Progressive web app capabilities

---

## ORDER MANAGEMENT CHANNELS

| Channel | System | Tracking |
|---------|--------|----------|
| E-commerce | ShipRocket | Automated dispatch + tracking |
| Retail | TPL APP (Softr/Airtable) | In-store order management |
| B2B | WhatsApp Business | Client communication + order updates |

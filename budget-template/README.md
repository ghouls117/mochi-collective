# Hackathon / Innovation Sprint — Budget Template

A formula-driven budget workbook for planning and running Mochi Collective
hackathons and innovation sprints. It estimates cost for a **20-pax** and a
**50-pax** event, doubles as the **live project budget-vs-actual tracker**, and
forces a written reason whenever a line item runs **more than +20% over budget**.

**File:** [`Hackathon_Innovation_Sprint_Budget_Template.xlsx`](./Hackathon_Innovation_Sprint_Budget_Template.xlsx)
Works in Microsoft Excel, Google Sheets (File → Import → Upload), and Numbers.

---

## What's inside (5 tabs)

| Tab | Purpose |
| --- | --- |
| **How to use** | One-screen guide and conventions. |
| **Budget vs Actual** | The working sheet. 47 line items across 8 categories, with 20- & 50-pax estimates, a live budget column, actuals, auto variance, an auto over-budget flag, and a reason column. |
| **Dashboard** | Auto roll-up by category + headline KPIs (total budget, actual, variance, # of items flagged). Nothing to type here. |
| **Impact & Opportunities** | Log the spend that delivered outsized value and the future opportunities it opened. |
| **Over-Budget Deep Dive** | One row per flagged item: reason → impact it actually gave → way forward. |

---

## How it works

1. **Pick the event size.** On *Budget vs Actual*, choose `20` or `50` from the
   **Event size (pax)** dropdown. The **Budgeted** column auto-fills from the
   matching estimate — overwrite any cell with your real quote.
2. **Log actuals.** As money is committed, type into the **Actual** column.
   **Variance ($)**, **Variance %**, and the **Flag** compute automatically.
3. **Explain the swings.** Any line where Actual exceeds Budgeted by more than
   the **Variance threshold** (default **20%**, editable in the header) shows
   **⚠ OVER** in red, and its Reason cell turns amber until you fill it in.
4. **Close the loop after the event.** Fill *Impact & Opportunities* (value
   created + doors opened) and *Over-Budget Deep Dive* (reason, real impact,
   way forward) so the next event is estimated better.

### Categories covered

Venue & Facilities · Technology & Tools · Facilitation & Talent · Food &
Beverage · Participant Experience · Marketing & Communications · Logistics &
Operations · **Client Rapport / Good-to-haves**

Items tagged **`(good-to-have)`** are optional client-rapport extras (barista
cart, premium swag, cinematic highlight film, executive gift, post-event impact
deck, wellness corner, closing reception) — keep, cut, or cost them as the
relationship warrants.

---

## Conventions & assumptions

- **All amounts shipped are illustrative planning placeholders** — replace them
  with your own quotes. They scale fixed-ish costs gently and per-head costs by
  headcount, purely as a starting reference.
- **Currency** is set once in the header (`SGD` by default) and shown on the
  Dashboard. Change it to suit the engagement.
- **Contingency** defaults to 10% of the line-item subtotal; the Grand Total
  includes it.
- The **+20% threshold** is the trigger for an explanation; change the header
  cell to tighten or loosen it.

---

## Regenerating the file

The workbook is generated from a script so it stays version-controllable and
easy to tweak (line items, defaults, branding):

```bash
cd budget-template
pip install openpyxl
python3 generate_budget_template.py
```

Edit the `ITEMS` list in
[`generate_budget_template.py`](./generate_budget_template.py) to change line
items or placeholder estimates, then re-run.

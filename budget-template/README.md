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

## Part A — Step-by-step: how to use the budget sheet

1. **Open the `Budget vs Actual` tab.**
2. **Fill the header** — Project / Client, Event date, Currency (default `SGD`),
   Contingency % (default `10%`), Variance threshold (default `20%`), Prepared by.
3. **Choose the event size** from the **Event size (pax)** dropdown — `20` or
   `50`. The **Budgeted** column auto-fills from the matching estimate column for
   every line item.
4. **Replace the placeholder estimates with your real quotes** — edit the
   `Est. 20 pax` / `Est. 50 pax` cells (or type directly over a Budgeted cell).
5. **Add or remove line items** to suit the event. Keep each row's **Category**
   text intact — the Dashboard rolls up by Category, so a blank/typo category
   drops the row from the totals.
6. **Log actuals.** As costs are committed, type into the **Actual** column (grey
   cells). **Variance ($)**, **Variance %**, and the **Flag** compute
   automatically.
7. **Watch the Flag column.** `⚠ OVER` (red) = more than +20% over budget;
   `under` (green) = more than 20% under; `ok` = within range.
8. **Explain every `⚠ OVER` line** in the **Reason** column — the cell stays
   amber until you do. This is your audit trail for the big discrepancies.
9. **Check the Dashboard tab** for the category roll-up and headline KPIs (total
   budgeted, total actual, variance, # flagged). It updates itself.
10. **Close the loop after the event** — complete *Impact & Opportunities* (value
    created + doors opened) and *Over-Budget Deep Dive* (reason → real impact →
    way forward) for each flagged item.

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

## Part B — Step-by-step: creating a new budget sheet for a new event

Use **one file per event** and keep this template as a clean master — don't track
a live project in the master copy.

1. **Make a copy of the file.** In Excel: *File → Save As*. In Google Sheets:
   *File → Make a copy*. (Or regenerate a fresh blank from the script — see Part C.)
2. **Name the copy for the event**, e.g. `2026-08_AcmeCorp_Sprint_Budget.xlsx`, so
   each engagement has its own file.
3. **Open the copy's `Budget vs Actual` tab and fill the header** — Project /
   Client, Event date, Currency, Contingency %, Variance threshold, Prepared by.
4. **Pick the Event size** (`20` or `50`) from the dropdown.
5. **Clear any leftover entries** so the sheet starts fresh — delete anything in
   the **Actual** and **Reason** columns (the master ships with these empty; this
   matters only if you copied a worked example).
6. **Replace the placeholder estimates with this event's quotes**, and add/remove
   line items as needed (keep the Category text on every row).
7. **Clear the `Impact & Opportunities` and `Over-Budget Deep Dive` tabs** of any
   prior entries.
8. **Save.** Then follow Part A to run budget vs actual through the event.

## Part C — Step-by-step: how to (re)generate this workbook

The `.xlsx` is produced by a script so it stays version-controllable and easy to
tweak (line items, defaults, branding).

1. **Check Python 3 is installed:**
   ```bash
   python3 --version
   ```
2. **Install the one dependency:**
   ```bash
   pip install openpyxl
   ```
3. **Edit the script** [`generate_budget_template.py`](./generate_budget_template.py):
   - Change line items / placeholder estimates in the **`ITEMS`** list. Each entry
     is `(Category, Line item, Description, Est. 20 pax, Est. 50 pax)`.
   - Change header defaults (currency `SGD`, contingency `0.10`, threshold `0.20`)
     in the **`hdr`** dictionary.
4. **Run it from the `budget-template` folder:**
   ```bash
   cd budget-template
   python3 generate_budget_template.py
   ```
5. **Verify.** The script overwrites
   `Hackathon_Innovation_Sprint_Budget_Template.xlsx` and prints a confirmation
   (line-item count + row range). Open the new file to check it.
6. **(Optional) Use it in Google Sheets:** File → Import → Upload the `.xlsx` →
   *Replace spreadsheet*. Formulas, dropdowns, and formatting carry over.

// quiz.jsx — Mochi Concierge: short interactive quiz that recommends a program
// 4 steps → result card with primary CTA.

const QUIZ_STEPS = [
{
  key: 'kind',
  q: 'What are you planning?',
  helper: 'We work across every format. Tell us what shape this one takes.',
  options: [
  { value: 'launch', label: 'Framework integration, small scale programs', sub: 'Dinners, salons, popups, ongoing formats', dot: '#F6BEC9' },
  { value: 'conference', label: 'Activations & larger scale programs', sub: 'Launches, conferences, multi-stage moments', dot: '#7ECADF' },
  { value: 'community', label: 'Community or membership', sub: 'Salons, dinners, recurring formats', dot: '#BFDEA3' },
  { value: 'internal', label: 'Internal program or reporting', sub: 'Offsites, board events, partner days', dot: '#F9C84A' }]

},
{
  key: 'pressure',
  q: 'What\u2019s the pressure point?',
  helper: 'Be honest — this is the thing keeping someone awake.',
  options: [
  { value: 'budget', label: 'Budget survival', sub: 'Same outcome, less money. Or prove it was worth it.', dot: '#F9C84A' },
  { value: 'sponsor', label: 'Sponsor retention', sub: 'Renewals are tight. Need measurable proof.', dot: '#7ECADF' },
  { value: 'audience', label: 'Right room & right people', sub: 'Audience design and curation matters most.', dot: '#F6BEC9' },
  { value: 'impact', label: 'Proving impact', sub: 'What changed because the event happened?', dot: '#BFDEA3' }]

},
{
  key: 'when',
  q: 'When are you in market?',
  helper: 'Rough timing is fine. We\u2019ll build the runway around it.',
  options: [
  { value: 'q-soon', label: 'Inside 12 weeks', sub: 'Sprint mode. Strategy + production in parallel.', dot: '#F6BEC9' },
  { value: 'q-3to6', label: '3 to 6 months', sub: 'Healthy runway. Strategy-led.', dot: '#7ECADF' },
  { value: 'q-6plus', label: '6 months or more', sub: 'Deep design from the ground up.', dot: '#BFDEA3' },
  { value: 'q-open', label: 'Open / exploring', sub: 'Not committed to a date yet.', dot: '#93ADBF' }]

},
{
  key: 'budget',
  q: 'And the working budget?',
  helper: 'Order of magnitude. We design to it — and tell you when it doesn\u2019t add up.',
  options: [
  { value: 'b-s', label: 'Under $50k', sub: 'Lean, sharp, one beautiful idea.', dot: '#F9C84A' },
  { value: 'b-m', label: '$50k \u2013 $250k', sub: 'Most of our community + activation work.', dot: '#BFDEA3' },
  { value: 'b-l', label: '$250k \u2013 $1M', sub: 'Full conference and multi-touch programs.', dot: '#7ECADF' },
  { value: 'b-xl', label: '$1M+', sub: 'Flagship, multi-city, season-long.', dot: '#F6BEC9' }]

}];


const CAL_URL = 'https://zcal.co/mochicollective/consultation';

// Slack Incoming Webhook — paste your webhook URL here (https://hooks.slack.com/services/...)
// When the user clicks "Book a discovery call", their quiz summary is POSTed to this URL
// before the calendar tab opens. Leave as empty string to disable.
const SLACK_WEBHOOK_URL = '';

async function notifySlack(summary, program, answers) {
  if (!SLACK_WEBHOOK_URL) return; // not configured yet
  try {
    const payload = {
      text: `:tada: *New discovery-call booking via Mochi Concierge*\n\n${summary}`,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: 'New discovery-call booking' } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Suggested program:* ${program ? program.name : '—'}` } },
        { type: 'section', fields: [
          { type: 'mrkdwn', text: `*Type*\n${labelFor(0, answers.kind) || '—'}` },
          { type: 'mrkdwn', text: `*Timing*\n${labelFor(2, answers.when) || '—'}` },
          { type: 'mrkdwn', text: `*Budget*\n${labelFor(3, answers.budget) || '—'}` },
          { type: 'mrkdwn', text: `*Pressure points*\n${pressureLabels(answers) || '—'}` },
        ] },
        program ? { type: 'section', text: { type: 'mrkdwn', text: `> ${program.blurb}` } } : null,
        { type: 'context', elements: [{ type: 'mrkdwn', text: `↗︎ Opening calendar: ${CAL_URL}` }] }
      ].filter(Boolean)
    };
    // Slack webhooks block CORS — we POST in no-cors mode (response is opaque, that's fine).
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // We never want to block the booking on a Slack failure.
    console.warn('Slack notify failed', e);
  }
}

function labelFor(stepIdx, value) {
  return (QUIZ_STEPS[stepIdx].options.find((o) => o.value === value) || {}).label || '';
}
function pressureLabels(answers) {
  const arr = Array.isArray(answers.pressure) ? answers.pressure : answers.pressure ? [answers.pressure] : [];
  return arr.map((v) => labelFor(1, v)).filter(Boolean).join(', ');
}

// Build a Google-Calendar-friendly summary string from quiz answers.
function buildSummary(answers, program) {
  const findLabel = (i, val) => (QUIZ_STEPS[i].options.find((o) => o.value === val) || {}).label || '';
  const pressures = Array.isArray(answers.pressure) ? answers.pressure : answers.pressure ? [answers.pressure] : [];
  const pressureLabels = pressures.map((v) => findLabel(1, v)).filter(Boolean).join(', ');
  const lines = [
    `Mochi Concierge — booking request`,
    program ? `Suggested program: ${program.name}` : null,
    `Type: ${findLabel(0, answers.kind) || '—'}`,
    `Pressure points: ${pressureLabels || '—'}`,
    `Timing: ${findLabel(2, answers.when) || '—'}`,
    `Budget: ${findLabel(3, answers.budget) || '—'}`,
    program ? `—` : null,
    program ? program.blurb : null,
  ].filter(Boolean);
  return lines.join('\n');
}

// Compose the zcal booking URL with the quiz answers pre-filled into custom-question slots.
// zcal prefill format: a0, a1, a2... map to the booking form's custom questions in order.
// Configure your zcal booking form with these questions (in this order) to receive the data:
//   a0 — Type of program            (single-select / text)
//   a1 — Pressure points             (CHECKBOX, multi-select) — options must match labels exactly
//   a2 — Timing                       (single-select / text)
//   a3 — Budget                       (single-select / text)
//   a4 — Mochi-suggested program + blurb (paragraph)
function calendarUrl(answers, program) {
  const findLabel = (i, val) => (QUIZ_STEPS[i].options.find((o) => o.value === val) || {}).label || '';
  const pressures = Array.isArray(answers.pressure) ? answers.pressure : answers.pressure ? [answers.pressure] : [];
  const pressureLabelsArr = pressures.map((v) => findLabel(1, v)).filter(Boolean);

  // Build the single-value params via URLSearchParams (handles spaces → +, etc.)
  const base = new URLSearchParams();
  if (findLabel(0, answers.kind)) base.set('a0', findLabel(0, answers.kind));
  if (findLabel(2, answers.when))  base.set('a2', findLabel(2, answers.when));
  if (findLabel(3, answers.budget))base.set('a3', findLabel(3, answers.budget));
  if (program)                     base.set('a4', `${program.name} — ${program.blurb}`);
  base.set('notes', buildSummary(answers, program));
  let qs = base.toString();

  // a1 is a CHECKBOX in zcal — docs format: a1=Option+1,Option+2 (literal commas, encoded spaces).
  // URLSearchParams would encode commas as %2C, so we append manually with literal commas.
  if (pressureLabelsArr.length) {
    const a1 = pressureLabelsArr.map((s) => encodeURIComponent(s).replace(/%20/g, '+')).join(',');
    qs += (qs ? '&' : '') + 'a1=' + a1;
  }

  return qs ? `${CAL_URL}?${qs}` : CAL_URL;
}

// Result map — picks a program name + descriptive blurb based on answers.
function pickProgram(a) {
  // Lead with `kind`; refine with first picked pressure point.
  const k = a.kind;
  const pressures = Array.isArray(a.pressure) ? a.pressure : a.pressure ? [a.pressure] : [];
  const p = pressures[0];
  const map = {
    launch: { name: 'Signal Series', accent: '#F6BEC9' },
    conference: { name: 'Stage Program', accent: '#7ECADF' },
    community: { name: 'Inner Circle', accent: '#BFDEA3' },
    internal: { name: 'Closed Doors', accent: '#F9C84A' }
  };
  const base = map[k] || map.launch;

  const blurbs = {
    'launch.budget': 'A single, magnetic moment engineered to over-index on press, social and word of mouth — designed so we can prove what the room actually did next.',
    'launch.sponsor': 'A launch built like a sponsor case study from day one: defined KPIs, witnessable proof, post-event report you can hand straight to the partner.',
    'launch.audience': 'Curated invite design, audience shaping and a room that does the talking. The activation is the supporting act; the people are the headline.',
    'launch.impact': 'A launch with impact measurement baked into the experience — so the report writes itself and the next round funds itself.',
    'conference.budget': 'Programming and production engineered to spend where the audience sees it, not where the spreadsheet does. We cut the parts no one remembers.',
    'conference.sponsor': 'Sponsor-led summit design. Activations that align to the partner\u2019s real metric, ROI baked into the experience, retention-grade reporting.',
    'conference.audience': 'Audience-first conference design — track curation, room logic and rituals that make the right people meet on purpose, not by accident.',
    'conference.impact': 'A summit that ships proof: pre/during/post measurement, behavioural change tracked, narrative we can defend to a board.',
    'community.budget': 'A recurring format with high ritual, low overhead. Designed to compound: each gathering earns the next one.',
    'community.sponsor': 'Members-first community programming with partner integrations that feel native, not bolted on — and that renewals survive.',
    'community.audience': 'Membership design, host briefing, and curation systems so every dinner stays on-tone three years in.',
    'community.impact': 'A community measured on the conversations it starts, the doors it opens, and the retention it earns — not RSVP count.',
    'internal.budget': 'An internal program that earns its budget by changing one specific behaviour, measured before and after.',
    'internal.sponsor': 'Stakeholder programming engineered for the meeting after the meeting — when the partner decides what they think.',
    'internal.audience': 'Offsite and partner-day design that engineers the right exchanges, in the right pairs, at the right time.',
    'internal.impact': 'Closed-door programming with a measurement frame the leadership team will actually trust.'
  };
  const blurb = blurbs[`${k}.${p}`] || 'A tailored program. We\u2019ll come back inside 48 hours with a shape, a runway and a proof model.';
  return { ...base, blurb };
}

function QuizSide({ step, answers, onJump }) {
  return (
    <div className="quiz-side">
      <div className="pill">Mochi Concierge</div>
      <h3>Tell us what you{'’'}re planning. We{'’'}ll come back with a shape for it.</h3>
      <div className="steps">
        {QUIZ_STEPS.map((s, i) => {
          const cls = i < step ? 'stp done' : i === step ? 'stp cur' : 'stp';
          return (
            <button key={s.key} className={cls} onClick={() => onJump(i)} type="button">
              <div className="b">{i < step ? '\u2713' : i + 1}</div>
              <div>{['Type', 'Pressure', 'Timing', 'Budget'][i]}</div>
            </button>);

        })}
        <button className={step >= 4 ? 'stp cur' : 'stp'} onClick={() => onJump(4)} type="button">
          <div className="b">{step >= 4 ? '\u2713' : '\u2605'}</div>
          <div>Recommendation</div>
        </button>
      </div>
    </div>);

}

function Concierge() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const total = QUIZ_STEPS.length;
  const isResult = step >= total;
  const current = QUIZ_STEPS[step];

  const pick = (key, value) => {
    if (key === 'pressure') {
      // Multi-select: toggle the value in/out of an array. Do NOT auto-advance.
      setAnswers((prev) => {
        const arr = Array.isArray(prev.pressure) ? prev.pressure : [];
        const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
        return { ...prev, pressure: next };
      });
      return;
    }
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // auto-advance after a beat
    setTimeout(() => setStep((s) => Math.min(total, s + 1)), 280);
  };

  const [copied, setCopied] = React.useState(false);
  const reset = () => {setAnswers({});setStep(0);setCopied(false);};
  const back = () => setStep((s) => Math.max(0, s - 1));
  const jump = (i) => setStep(Math.max(0, Math.min(total, i)));

  const program = isResult ? pickProgram(answers) : null;

  return (
    <div className="quiz">
      <QuizSide step={step} answers={answers} onJump={jump} />
      <div className="quiz-main">
        {!isResult &&
        <React.Fragment>
            <div>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>Question {step + 1} of {total}</div>
              <div className="quiz-q" style={{ marginTop: 14 }}>{current.q}</div>
              <div className="quiz-helper" style={{ marginTop: 10 }}>{current.helper}</div>
            </div>
            <div className="quiz-opts">
              {current.options.map((o) => {
              const isMulti = current.key === 'pressure';
              const cv = answers[current.key];
              const sel = isMulti ?
              Array.isArray(cv) && cv.includes(o.value) :
              cv === o.value;
              return (
                <button
                  key={o.value}
                  className={'quiz-opt' + (sel ? ' sel' : '')}
                  onClick={() => pick(current.key, o.value)}>
                  
                    <div className="qo-h"><span className="dt" style={{ background: o.dot }} />{o.label}</div>
                    <div className="qo-sub">{o.sub}</div>
                  </button>);

            })}
            </div>
            <div className="quiz-foot">
              <div>
                {current.key === 'pressure' ?
              'Pick one or more — we tune the recommendation to whichever you flag.' :
              `Step ${step + 1} / ${total}`}
              </div>
              <div className="nav-btns">
                <button className="qb" onClick={back} disabled={step === 0}>Back</button>
                {current.key === 'pressure' &&
              <button
                className="qb primary"
                disabled={!Array.isArray(answers.pressure) || answers.pressure.length === 0}
                onClick={() => setStep((s) => Math.min(total, s + 1))}>
                    Continue →
                  </button>
              }
              </div>
            </div>
          </React.Fragment>
        }

        {isResult &&
        <div className="quiz-result">
            <div className="rec-tag" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: program.accent }} />
              Suggested program
            </div>
            <h4>The <span style={{ color: program.accent }}>{program.name}</span></h4>
            <p>{program.blurb}</p>
            <div className="rec-row">
              <div>
                <div className="lab">Type</div>
                <div className="val">{(QUIZ_STEPS[0].options.find((o) => o.value === answers.kind) || {}).label}</div>
              </div>
              <div>
                <div className="lab">Pressure points</div>
                <div className="val">{pressureLabels(answers) || '—'}</div>
              </div>
              <div>
                <div className="lab">Timing</div>
                <div className="val">{(QUIZ_STEPS[2].options.find((o) => o.value === answers.when) || {}).label}</div>
              </div>
              <div>
                <div className="lab">Budget</div>
                <div className="val">{(QUIZ_STEPS[3].options.find((o) => o.value === answers.budget) || {}).label}</div>
              </div>
            </div>
            <div className="res-actions">
              <a
                className="qb primary"
                href={calendarUrl(answers, program)}
                target="_blank"
                rel="noopener"
                onClick={() => { notifySlack(buildSummary(answers, program), program, answers); }}>
                Book a discovery call &rarr;
              </a>
              <button
                className="qb"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(buildSummary(answers, program));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  } catch (e) {}
                }}>
                {copied ? 'Copied ✓' : 'Copy summary'}
              </button>
              <button className="qb" onClick={reset}>Start over</button>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 4, lineHeight: 1.5, maxWidth: 60 + 'ch' }}>
              We pre-fill your summary into the calendar invite note. If it doesn{'’'}t carry across automatically, paste it from clipboard.
            </div>
          </div>
        }
      </div>
    </div>);

}

window.Concierge = Concierge;
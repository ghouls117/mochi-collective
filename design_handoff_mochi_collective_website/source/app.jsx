// app.jsx — Mochi Collective website
// Single-page composition: Nav, Hero, Marquee, Manifesto, Services, Method, Concierge, CTA, Footer

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "heroVariant": "orbs",
  "density": "regular"
} /*EDITMODE-END*/;

// ─── Reveal-on-scroll hook ───────────────────────────────────
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function scrollToId(id, offset = 60) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

// ─── Nav ─────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {e.preventDefault();scrollToId(id, 60);};

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <a href="#top" className="nav-brand" onClick={go('top')}>
        <MiniCluster size={42} />
        <div>
          <div className="wm">Mochi</div>
          <div className="sub">COLLECTIVE</div>
        </div>
      </a>
      <div className="nav-links">
        <a href="#work" onClick={go('work')}>What We Do</a>
        <a href="#method" onClick={go('method')}>The Methodology</a>
        <a href="#concierge" onClick={go('concierge')}>Service Concierge</a>
        <a href="https://zcal.co/mochicollective/consultation" target="_blank" rel="noopener" className="nav-cta">Book a call</a>
      </div>
    </nav>);

}

// ─── Hero ────────────────────────────────────────────────────
function Hero({ variant }) {
  return (
    <section id="top" className="hero" data-variant={variant}>
      <div className="wrap" style={{ width: '100%' }}>
        <div className="hero-inner">
          <div>
            <div className="eyebrow reveal">Experience design · Strategy · Proof</div>
            <h1 className="display hero-title reveal reveal-d1" style={{ marginTop: 26 }}>
              Make it<br />worth <em>talking</em><br />about.
            </h1>
            <div className="hero-sub reveal reveal-d2">
              <p>We design events that prove their worth. Brand experiences, conferences and community programs with impact measurement baked in — so the report writes itself and the next one funds itself.</p>
            </div>
            <div className="hero-actions reveal reveal-d3">
              <a href="#concierge" className="btn btn-primary" onClick={(e) => {e.preventDefault();scrollToId('concierge', 40);}}>
                Start with the Concierge <span className="arr">→</span>
              </a>
              <a href="#work" className="btn btn-ghost" onClick={(e) => {e.preventDefault();scrollToId('work', 40);}}>
                See what we do
              </a>
            </div>
          </div>
          {variant === 'orbs' && <OrbCluster />}
          {variant === 'image' && <div className="hero-image-slot">[ Hero photograph · 4:5 · drop on launch ]</div>
          }
        </div>
      </div>
    </section>);

}

// ─── Marquee ─────────────────────────────────────────────────
function Marquee() {
  const items = [
  { t: 'Experiences people walk away talking about', c: '#F6BEC9' },
  { t: 'Making it worth talking about — one event at a time.', c: '#7ECADF' }];

  const row =
  <span>
      {items.map((x, i) =>
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 24 }}>
          <span className="dot" style={{ background: x.c }} />
          {x.t}
        </span>
    )}
    </span>;

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row}{row}
      </div>
    </div>);

}

// ─── Manifesto ───────────────────────────────────────────────
function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <div className="wrap">
        <div className="manifesto-grid">
          <div>
            <div className="eyebrow reveal">01 — Position</div>
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
              We don’t report what <span className="accent">happened</span>.<br />
              We report what <span className="accent">changed</span>.
            </h2>
          </div>
          <div className="manifesto-body reveal reveal-d2">
            <p>Most events end with a recap deck and a feeling. Ours end with a measurable answer to the question that paid for them.</p>
            <p>We design experiences that co-exist with your events — conferences, community programs, and evergreen initiatives — and run them the way a good operator runs a P&amp;L: <strong>impact baked into the experience</strong>, ROI tracked against the metric your sponsor or your CFO actually cares about, and proof you can hand over without a flinch.</p>
            <p>The events do the talking. We make sure they say something worth repeating.</p>
          </div>
        </div>
      </div>
    </section>);

}

// ─── Services / Tabs ─────────────────────────────────────────
const SERVICES = [
{
  label: 'Brand Experiences',
  title: 'Launches, activations, immersive moments.',
  color: '#F6BEC9',
  body: 'A single magnetic moment, engineered to over-index where it matters — press, social, word of mouth, the room behind the room. Designed so we can measure what changes after the doors close.',
  list: ['Concept + creative direction', 'Spatial + scenic design', 'Casting, talent, hosting', 'Social + content strategy']
},
{
  label: 'Impact Measurement',
  title: 'The proof model is the brief.',
  color: '#93ADBF',
  body: 'A measurement frame your stakeholders, your sponsor / target accounts or pipeline, and your team that will all trust. We design measurement in — not bolt it on at the end — so the report is a by-product of the experience itself.',
  list: ['Pre / post structure design', 'Pre, during, and post engagement', 'Stakeholder-facing reporting', 'Social + content strategy']
},
{
  label: 'Conferences & Events',
  title: 'End-to-end stage programs that pay for themselves.',
  color: '#7ECADF',
  body: 'Multi-day, multi-stage programs built around sponsor outcomes from day one. We design the curation, the room logic and the throughline so the value lasts past Friday afternoon.',
  list: ['Membership design', 'Sponsor coordination', 'Production + technical', 'Pre / during / post measurement']
},
{
  label: 'Sponsor Programs',
  title: 'ROI-first design for the people writing the cheque.',
  color: '#F9C84A',
  body: 'Sponsor-grade activations engineered for renewal. We align the experience to the partner’s real metric and ship a report they can hand straight to their reporting stakeholders.',
  list: ['Sponsor KPI to experience design', 'Native partner integrations', 'Renewal-grade reporting', 'Outcome conversion + relationship depth report']
},
{
  label: 'Community & Membership',
  title: 'Programs that compound. Rooms people protect.',
  color: '#BFDEA3',
  body: 'Members-first programming designed to compound. Each gathering earns the next, each format makes the brand more defensible, each host stays on-tone three years in.',
  list: ['Concept + creative direction', 'Native partner integrations', 'Members integration + retention frameworks', 'Curation systems']
}];


function Services() {
  const [active, setActive] = React.useState(0);
  const cur = SERVICES[active];
  return (
    <section className="services" id="work">
      <div className="wrap">
        <div className="services-head">
          <div>
            <div className="eyebrow reveal">02 — What we do</div>
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22, maxWidth: '14ch' }}>
              <span className="accent">Five</span> practices.<br /><span className="accent">One</span> operating system.
            </h2>
          </div>
          <p className="lede reveal reveal-d2">
            Held together by the same proof model, Mochi’s experiential concept can be applied to any type and scale of initiative.
          </p>
        </div>

        <div className="services-tabs reveal">
          <div className="tab-list" role="tablist">
            {SERVICES.map((s, i) =>
            <button
              key={s.label}
              role="tab"
              aria-selected={i === active}
              className={'tab-item' + (i === active ? ' active' : '')}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}>
              
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <div className="label">{s.label}</div>
                <div className="dot" style={{ background: s.color }} />
                <div className="arr">→</div>
              </button>
            )}
          </div>

          <div className="tab-panel" key={active}>
            <div className="pnl-head">
              <div className="pnl-orb" style={{ background: cur.color }} />
              <div className="pnl-title">
                {cur.title.split(/(?<=\.)\s+/).map((s, i, arr) =>
                  <React.Fragment key={i}>{s}{i < arr.length - 1 && <br />}</React.Fragment>
                )}
              </div>
            </div>
            <div>
              <p className="pnl-body">{cur.body}</p>
              <ul className="pnl-list" style={{ marginTop: 20 }}>
                {cur.list.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div className="pnl-foot">
              <div>Practice / {String(active + 1).padStart(2, '0')}</div>
              <div className="x">
                <span>Strategy</span>
                <span>Design</span>
                <span>Proof</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ─── Method ──────────────────────────────────────────────────
const METHOD = [
{ n: 1, h: 'Strategy', tone: '#F6BEC9', body: 'We start with the metric, not the moodboard. What were the misalignments that happened? Who is the proof for? We come back with a brief that survives the boardroom.' },
{ n: 2, h: 'Design', tone: '#BFDEA3', body: 'Concept, format, program, room. We design the experience around the proof model so the measurement is a by-product of the thing itself, not bolted on at the end.' },
{ n: 3, h: 'Proof', tone: '#F9C84A', body: 'Pre, during and post. Behaviour, follow-ups, sentiment, impact. A report you can hand to any of your or a partner’s stakeholder without a single flinch.' }];

function Method() {
  return (
    <section className="method" id="method">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 30, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow reveal">03 — THE METHODOLOGY</div>
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
              <span className="accent">Three</span> steps.<br />Same operating model.
            </h2>
          </div>
          <p className="lede reveal reveal-d2" style={{ maxWidth: '38ch' }}>
            Every engagement runs the same shape — from a single dinner to a four-day summit.
          </p>
        </div>

        <div className="method-grid">
          {METHOD.map((m, i) =>
          <div className="method-cell reveal" key={m.h} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="step">
                <span className="n" style={{ background: m.tone }}>{m.n}</span>
                {`Step 0${m.n}`}
              </div>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em' }}>{m.h}</h3>
              <p>{m.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Concierge wrapper ──────────────────────────────────────
function ConciergeSection() {
  return (
    <section className="concierge" id="concierge">
      <div className="wrap">
        <div className="eyebrow reveal">04 — SERVICE CONCIERGE</div>
        <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22, maxWidth: '18ch' }}>
          Four questions.<br />A <span className="accent">shape</span> for your event by Friday.
        </h2>
        <p className="concierge-lede reveal reveal-d2">
          Tell us what you’re planning. We come back inside 72 hours with a program shape, a budget reality check, and a runway you can take to a sponsor or a board.
        </p>
        <div className="reveal reveal-d3">
          <Concierge />
        </div>
      </div>
    </section>);

}

// ─── Contact / CTA ──────────────────────────────────────────
function Contact() {
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <div className="cta-grid">
          <div>
            <div className="eyebrow reveal">05 — Get in</div>
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
              Let’s make<br />the next one<br /><span className="accent">worth talking about</span>.
            </h2>
          </div>
          <div className="cta-side reveal reveal-d2">
            <a href="https://zcal.co/mochicollective/consultation" target="_blank" rel="noopener" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Book a discovery call <span className="arr">→</span>
            </a>
            <div className="row"><div className="lab">Email</div><div className="val"><a href="mailto:hello@mochicollective.com">hello@mochicollective.com</a></div></div>
            <div className="row"><div className="lab">Response time</div><div className="val">Inside 72 hours, on weekdays</div></div>
          </div>
        </div>
      </div>
    </section>);

}

// ─── App ─────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme + density to <html>
  React.useEffect(() => {
    document.documentElement.dataset.theme = t.theme;
    document.documentElement.dataset.density = t.density;
  }, [t.theme, t.density]);

  useReveal();

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero variant={t.heroVariant} />
        <Manifesto />
        <Services />
        <Method />
        <ConciergeSection />
        <Contact />
      </main>
      <footer>
        <div>© 2026 Mochi Collective. Make it worth talking about.</div>
        <div className="links">
          <a href="mailto:hello@mochicollective.com">hello@mochicollective.com</a>
          <a href="#top" onClick={(e) => {e.preventDefault();window.scrollTo({ top: 0, behavior: 'smooth' });}}>Back to top ↑</a>
        </div>
      </footer>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio
          label="Surface"
          value={t.theme}
          options={[
          { value: 'light', label: 'Light' },
          { value: 'beige', label: 'Beige' },
          { value: 'dark', label: 'Dark' }]
          }
          onChange={(v) => setTweak('theme', v)} />
        
        <TweakSection label="Hero" />
        <TweakRadio
          label="Variant"
          value={t.heroVariant}
          options={[
          { value: 'orbs', label: 'Orbs' },
          { value: 'type', label: 'Type' },
          { value: 'image', label: 'Image' }]
          }
          onChange={(v) => setTweak('heroVariant', v)} />
        
        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={[
          { value: 'compact', label: 'Compact' },
          { value: 'regular', label: 'Regular' },
          { value: 'airy', label: 'Airy' }]
          }
          onChange={(v) => setTweak('density', v)} />
        
      </TweaksPanel>
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
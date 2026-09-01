import type { PracticeContent } from "@/components/practice-page";

/**
 * Content for the four practice pages. One object per practice, rendered
 * through <PracticePage> so all four stay structurally identical to the
 * hand-built /impact-measurement page. Add a practice here + a thin route
 * file under app/<slug>/ to ship a new one.
 */
export const PRACTICES: Record<string, PracticeContent> = {
  "brand-experience": {
    "slug": "brand-experience",
    "label": "Brand Experiences",
    "metaTitle": "Brand Experiences & Activations, Singapore | Mochi Collective",
    "metaDescription": "Launches, activations and immersive moments engineered to produce one specific feeling, then measured after the doors close. Singapore and Southeast Asia.",
    "ogTitle": "Brand Experiences, Singapore — the room, not the logo on every wall",
    "ogDescription": "Most activations get great production and no memory. We engineer one specific feeling the room reliably produces, anchor it to a sense, choreograph the exit — and design it so you can measure what changed. Singapore and Southeast Asia.",
    "h1Html": "Launches and activations that produce <span class=\"accent\">one specific feeling</span>.",
    "ledeHtml": "A brand activation is a medium, not a billboard. We engineer a single magnetic moment to over-index where it matters — press, social, word of mouth, the room behind the room — and design it so we can measure what changes after the doors close. Built for launches, activations and immersive moments across <strong>Singapore and Southeast Asia</strong>.",
    "serviceType": "Brand activation and experiential marketing",
    "jsonldDescription": "Brand activations, launches and immersive moments engineered around one specific feeling and a sensory anchor, then designed so the change they produce — press, social, word of mouth, behaviour — can be measured after the doors close. Concept and creative direction, spatial and scenic design, casting and hosting, social and content strategy for Singapore and Southeast Asia.",
    "blocks": [
      {
        "type": "h2",
        "text": "The activation that looks expensive and changes nothing"
      },
      {
        "type": "p",
        "html": "The budget is significant, the photographer is booked, the venue is dressed in your colours and the tagline sits on every surface. Attendance is strong and the photos are great. Then by Wednesday, no one who came can describe your brand any differently than they did the week before. The production landed; the memory didn't. That's the default outcome, not a rare one — and it's the outcome the activation was commissioned to avoid."
      },
      {
        "type": "h2",
        "text": "Engineer one feeling, not one more logo"
      },
      {
        "type": "p",
        "html": "A brand activation is a medium, not a billboard. Rather than repeat your logo on every surface, we engineer the whole room to reliably produce <strong>one specific feeling</strong> — the one you want people carrying out the door and describing to a friend days later. The brand shows up rarely; the feeling shows up reliably. When someone recounts the night, they lead with the feeling and mention the brand second. That's the moment perception actually moves. Four things do that work:"
      },
      {
        "type": "ul",
        "items": [
          "<strong>Concept + creative direction.</strong> The organising idea, and the single feeling every other choice gets measured against.",
          "<strong>Spatial + scenic design.</strong> Lighting, sound, seating, scale and flow — the room engineered to deliver the feeling, not to look like a brochure in three dimensions.",
          "<strong>Casting, talent, hosting.</strong> The people in the room, the hosts at the door, and who is deliberately not on the list.",
          "<strong>Social + content strategy.</strong> How the moment travels afterwards — press, social, word of mouth, and the room behind the room."
        ]
      },
      {
        "type": "h2",
        "text": "How we build the room"
      },
      {
        "type": "p",
        "html": "Three moves decide whether the memory survives the taxi ride home. We design all three before a venue is booked — because once the venue is walked and the run-of-show is drafted, they're expensive to add and easy to fake."
      },
      {
        "type": "ul",
        "items": [
          "<strong>The feeling target.</strong> One specific feeling, written in the language a real person would use — \"let in on a decision my competitors don't know about yet\", never \"engaged\", \"inspired\" or \"premium\". If we can't name it, the room can't be designed against it.",
          "<strong>The sensory anchor.</strong> One sense amplified at the peak and repeated at the exit, and nowhere in the attendee's ordinary week — a scent, a specific track, a colour of light, a taste. It's the memory receipt that re-triggers the whole night months later, in a completely different context.",
          "<strong>The exit.</strong> People remember the peak and the ending, not the average, so we choreograph the last five minutes as the message. If the exit is a coat queue, the coat queue is what consolidates in the memory."
        ]
      },
      {
        "type": "h2",
        "text": "When to bring us in"
      },
      {
        "type": "p",
        "html": "At brief stage, before the venue is walked and the invitation goes out — that's when the feeling target still has the power to organise every decision downstream. Come in later and we can still build a strong room, but the anchor and the exit get harder to engineer for. As a rule of thumb, eight weeks out is comfortable; anything inside four weeks and we're triaging to what's still achievable. We also design the proof in at this stage, so the change the activation produces — press, social, word of mouth, and the behaviour that follows — can be measured after the doors close. The standalone version of that discipline is our <a href=\"/impact-measurement\">Impact Measurement</a> practice."
      },
      {
        "type": "h2",
        "text": "What this means for the brief"
      },
      {
        "type": "p",
        "html": "If you're commissioning an activation — or building one for a client — the questions worth answering before anything gets booked are short. What one feeling should someone walk out with that they didn't walk in with? Which sense will the room own, and where does it appear? What is the peak, and what is the exit? Answer those honestly and the venue, the guest list and the AV start choosing themselves against the feeling. And if we can't name that feeling with you, we won't take the brief — it's the fastest honesty test we know."
      }
    ],
    "reading": [
      {
        "href": "/thoughts/events-craft/when-your-brand-becomes-a-room",
        "label": "When Your Brand Becomes a Room",
        "note": "the long-form argument this entire practice is built on"
      },
      {
        "href": "/impact-measurement",
        "label": "Impact Measurement",
        "note": "how we prove any of this actually moved a number after the doors close"
      },
      {
        "href": "/thoughts/events-craft/anatomy-of-a-memorable-moment",
        "label": "Anatomy of a Memorable Moment",
        "note": "the peak-end rule that decides what people keep and what they forget"
      },
      {
        "href": "/thoughts/brand-strategy/make-it-worth-talking-about",
        "label": "Make It Worth Talking About",
        "note": "the positioning wedge that gives the feeling something worth repeating"
      }
    ],
    "faq": [
      {
        "q": "What is a brand activation actually supposed to do?",
        "a": "A brand activation exists to shift how people describe your brand, not just to draw a crowd or produce good photos. We engineer the room to reliably produce one specific feeling, so attendees leave describing that feeling first and the brand second. If the only measurable outcome is attendance, the activation was decoration."
      },
      {
        "q": "How do you make a brand experience memorable?",
        "a": "Memory comes from a sensory anchor and a deliberate exit, not from more branding. We amplify one sense — a scent, a track, a colour of light, a taste — at the peak and repeat it at the ending, so it re-triggers the whole night months later. Then we choreograph the final five minutes as the message, because people remember the peak and the ending rather than the average."
      },
      {
        "q": "Can you measure whether a brand activation worked?",
        "a": "Yes, if the proof is designed in at brief stage rather than bolted on afterwards. We name the feeling target and the downstream signal up front, so press, social, word of mouth and the behaviour that follows can be tracked after the doors close. Impact measurement is the operating system under everything we run — and it can also wrap an activation another agency is producing."
      }
    ],
    "ctaHeadline": "Put your activation brief on the table",
    "ctaSub": "A free 30-minute Brief Diagnostic where we put your activation brief against the feeling target, the sensory anchor, the peak and the exit — no pitch, no deck, just the questions we'd ask anyway.",
    "utm": "brandexperience"
  },
  "hackathons": {
    "slug": "hackathons",
    "label": "Hackathons & Developer Programs",
    "metaTitle": "Hackathon & Developer Program Design, Singapore | Mochi Collective",
    "metaDescription": "Hackathons that end in artefacts, not impressions — prototypes, teams that formed, developers still building at ninety days. Singapore and Southeast Asia.",
    "ogTitle": "Hackathons, Singapore — the most measurable event we run",
    "ogDescription": "Recruit to your ICP rather than to the room, make the judging criteria the strategy, and measure retention at ninety days instead of sign-ups on the night. Run by the team that spent five years at AngelHack.",
    "h1Html": "The most measurable <span class=\"accent\">event we run</span>.",
    "ledeHtml": "Hackathons and developer programs that end in artefacts rather than impressions — working prototypes, teams that formed, developers still building on your platform ninety days later. Built for platform, developer-relations and corporate innovation teams across <strong>Singapore and Southeast Asia</strong>.",
    "serviceType": "Hackathon and developer program design",
    "jsonldDescription": "Hackathon and developer program design for platform, developer-relations and corporate innovation teams. Participants are recruited against the client's ideal customer profile, judging criteria are set from the outcome the program is meant to produce, and success is measured on ninety-day platform retention rather than sign-ups on the night. Singapore and Southeast Asia.",
    "blocks": [
      {
        "type": "h2",
        "text": "The output is in the repo"
      },
      {
        "type": "p",
        "html": "There's a particular feeling at 2am on the second day, when a team that met on Friday finally gets the thing to compile. You can't manufacture that with a stage and a sponsor banner. You can design for it."
      },
      {
        "type": "p",
        "html": "A hackathon is commissioned by marketing and graded by engineers. Marketing owns the budget, the reach, and a recap that has to survive a quarterly review. Engineers own their weekend — and they read your documentation, your error messages and your rate limits."
      },
      {
        "type": "p",
        "html": "Most programs are designed for the first client and judged by the second. That is why they get graded in group chats you never see."
      },
      {
        "type": "p",
        "html": "Everything we build is meant to produce evidence, and hackathons make it easy, because they end in artefacts. Working prototypes. Submitted projects. Teams that formed. Developers who signed up for your platform and were still building on it ninety days later. Nobody has to argue about whether something happened."
      },
      {
        "type": "p",
        "html": "Justin Ng, our co-founder, spent five years at AngelHack as Director of Ecosystem Development, where he designed the developer programs its clients ran and carried the commercial line for them."
      },
      {
        "type": "p",
        "html": "AngelHack is the world's leading hackathon agency, with a global developer community of 500,000 across more than a hundred cities. He knows what separates a hackathon that produces a press release from one that produces a pipeline."
      },
      {
        "type": "h2",
        "text": "Three things we do differently"
      },
      {
        "type": "ol",
        "items": [
          "<strong>Recruit for the outcome, not the room.</strong> Two hundred warm bodies is a photo. Forty developers who match your ICP is a pipeline. We recruit against who you actually want building on your platform.",
          "<strong>Judge on what you want to happen next.</strong> The judging criteria are the strategy — they tell every team what to optimise for. Most hackathons pick them the week before.",
          "<strong>Measure at ninety days, not on the night.</strong> Sign-ups on the day tell you about your marketing. Retention at ninety days tells you about your platform. The number we watch during the event itself is median time to first successful API call."
        ]
      },
      {
        "type": "h2",
        "text": "Your engineers are the sponsorship"
      },
      {
        "type": "p",
        "html": "Your technical staff are the sponsorship deliverable, not booth cover \u2014 an engineer can teach, a logo cannot. We run a named duty roster with defined shifts and a channel that has an owner. Two weeks out we run your own quickstart on a clean machine, with a new account, on the venue network, provisioning keys the way a participant will. The failure we see most often is an API that will not issue credentials on Saturday morning while two hundred people watch."
      },
      {
        "type": "h2",
        "text": "Who this is for"
      },
      {
        "type": "p",
        "html": "Platform and developer-relations teams, corporate innovation and R&D groups, and companies who need to be credible with a technical audience rather than merely visible to it. The buyer here is usually different from the brand-marketing buyer, and so is the room."
      },
      {
        "type": "h2",
        "text": "When to bring us in"
      },
      {
        "type": "p",
        "html": "Early enough that the judging criteria can still be designed rather than picked. Recruitment against an ICP takes lead time, and the ninety-day measurement window only exists if the instrumentation is agreed before the event, not bolted on after it. Eight to twelve weeks out is comfortable."
      },
      {
        "type": "h2",
        "text": "What we won't claim"
      },
      {
        "type": "p",
        "html": "We will not attach a pipeline number to a weekend. We log the touch, watch what happens next, and stay honest that a developer who adopts six months later was moved by things nobody instrumented. A revenue figure for a hackathon is a number, not a finding."
      }
    ],
    "reading": [
      {
        "href": "/impact-measurement",
        "label": "Impact Measurement",
        "note": "the operating system underneath every practice, including this one."
      },
      {
        "href": "/thoughts/events-craft/anatomy-of-a-memorable-moment",
        "label": "The Anatomy of a Memorable Moment",
        "note": "why the 2am moment is designed, not lucky."
      },
      {
        "href": "/thoughts/thought-leadership/6-questions-every-brief",
        "label": "6 Questions That Should Live At The Top Of Every Brief",
        "note": "the brief-stage filter we apply before agreeing to run anything."
      },
      {
        "href": "/thoughts/thought-leadership/impact-measurement-for-events",
        "label": "Impact Measurement for Events",
        "note": "the three signal categories and three timing windows we measure against."
      }
    ],
    "faq": [
      {
        "q": "How do you measure whether a hackathon worked?",
        "a": "Hackathons have many metrics that can be measured but, most importantly, the metrics we measure show the impact that your program brings. Mochi will always start by defining the metric to measure and agreeing on the numbers before building the program."
      },
      {
        "q": "How many developers should a hackathon aim for?",
        "a": "The number can be a wide range of fifty to three or four hundred. Each hackathon size syncs up with a different metric that organisers are trying to achieve through the program — the number follows the metric, not the other way round. At any of those sizes, a room recruited against your ICP beats a bigger one that wasn't."
      },
      {
        "q": "Who runs hackathons at Mochi Collective?",
        "a": "Justin Ng, our co-founder, was Director of Ecosystem Development at AngelHack, where he led its developer ecosystem. He works on each hackathon and developer program himself, alongside a small team supporting operational execution."
      }
    ],
    "ctaHeadline": "Put your hackathon brief on the table",
    "ctaSub": "A free 30-minute Brief Diagnostic. We'll look at who you're trying to reach, what the judging criteria should be, and what you'd need to see at ninety days to call it worth repeating.",
    "utm": "hackathons"
  },
  "conferences-and-events": {
    "slug": "conferences-and-events",
    "label": "Conferences & Events",
    "metaTitle": "Conference & Event Production, Singapore | Mochi Collective",
    "metaDescription": "End-to-end conference and event production across Singapore and Southeast Asia — multi-day programs built around sponsor and attendee outcomes from day one.",
    "ogTitle": "Conference & Event Production, Singapore — programs that outlast Friday",
    "ogDescription": "Multi-day, multi-stage conferences built around sponsor and attendee outcomes from day one. We design the curation, the room logic and the throughline — the value that survives past Friday afternoon. Singapore and Southeast Asia.",
    "h1Html": "Multi-day programs built around the outcome — <span class=\"accent\">not the agenda</span>.",
    "ledeHtml": "We design multi-day, multi-stage conferences around sponsor and attendee outcomes from the first brief — the curation, the room logic and the throughline — so the value lasts past the closing keynote, not just the closing drinks. Built for conferences, summits and member programs across <strong>Singapore and Southeast Asia</strong>.",
    "serviceType": "Conference and event production",
    "jsonldDescription": "End-to-end production of multi-day, multi-stage conferences and events, designed around sponsor and attendee outcomes from brief stage. Spans curation, room logic, membership design, sponsor coordination, production and technical, and pre / during / post measurement.",
    "blocks": [
      {
        "type": "h2",
        "text": "The run of show is not the program"
      },
      {
        "type": "p",
        "html": "Most conferences are judged on the run of show — did the sessions start on time, did the AV hold, did the catering land. All of that has to work, and none of it is what people carry out of the building. By Monday the agenda is forgotten; what survives is who someone met, the one idea that reframed their week, and the moment worth retelling. Optimise only the logistics and you produce a smooth event nobody remembers."
      },
      {
        "type": "p",
        "html": "So we start somewhere else. Every program we take on has to make a single argument — one throughline the whole thing ladders back to. If we can't name that argument with you at brief stage, we won't take the brief. A multi-day conference without a throughline is an expensive agenda, and no amount of production saves it."
      },
      {
        "type": "h2",
        "text": "What survives past Friday afternoon"
      },
      {
        "type": "p",
        "html": "Past Friday afternoon, three things carry whatever value the program created. We design all three deliberately, from the brief — none of them are left to chance on the day, and none of them are the timetable."
      },
      {
        "type": "ul",
        "items": [
          "<strong>Curation.</strong> Who is in the room, and why. The value of a conference is set by the guest list and the pairing logic before a single session is programmed — a room of the wrong people cannot be rescued by a good agenda.",
          "<strong>Room logic.</strong> How attention and introductions are engineered. Which sessions cluster the right people, where the deliberate collisions happen, and how a 400-person hall still produces the two conversations an attendee actually remembers.",
          "<strong>Throughline.</strong> The single argument the program makes across every day and every stage. One idea everything ladders back to, so day three reinforces day one instead of drifting into an unrelated agenda."
        ]
      },
      {
        "type": "h2",
        "text": "How the program runs"
      },
      {
        "type": "p",
        "html": "We design backwards from two sets of outcomes, both named at brief stage: what the <strong>sponsor</strong> needs to be able to point to afterwards — a relationship, a pipeline, a renewal — and what the <strong>attendee</strong> should leave with. Only then do the deliverables get built to serve them: membership design, sponsor coordination, production and technical, and pre / during / post measurement, run under one team so the logistics never quietly become the point."
      },
      {
        "type": "p",
        "html": "A program people remember is not uniformly good for three days — it is anchored by a peak and closed well, which is why we engineer specific moments rather than hope one occurs. Then we prove it moved: the same pre / during / post frame our <a href=\"/impact-measurement\">measurement practice</a> uses, so the report answers to the person who signed the cheque, not to the run of show."
      },
      {
        "type": "h2",
        "text": "When to bring us in"
      },
      {
        "type": "p",
        "html": "The earlier the better, and multi-day programs need more runway than a single event — curation and sponsor coordination both compound with lead time. Bring us in at brief stage and we design the room, the throughline and the measurement together. Come in once the agenda and venue are locked and we can still sharpen the program, but the curation and the room logic are the hardest things to retrofit."
      }
    ],
    "reading": [
      {
        "href": "/thoughts/events-craft/anatomy-of-a-memorable-moment",
        "label": "Anatomy of a Memorable Moment",
        "note": "— the peak-end rule, and how we engineer the moment a multi-day program is remembered by"
      },
      {
        "href": "/impact-measurement",
        "label": "Impact Measurement",
        "note": "— the pre / during / post model we use to prove the program moved the outcome a sponsor paid for"
      },
      {
        "href": "/thoughts/thought-leadership/6-questions-every-brief",
        "label": "6 Questions Every Event Brief Must Answer",
        "note": "— the filter we run before we'll agree a throughline with you"
      },
      {
        "href": "/thoughts/brand-strategy/make-it-worth-talking-about",
        "label": "Make It Worth Talking About",
        "note": "— the positioning wedge sitting behind the throughline and the curation"
      }
    ],
    "faq": [
      {
        "q": "What makes a conference worth sponsoring?",
        "a": "A conference is worth sponsoring when the program is built around a sponsor outcome from day one — a specific relationship, pipeline or renewal the sponsor can name — rather than a logo on a banner. We design the curation and the room logic so sponsors meet the right attendees in the right context, and we measure whether that outcome actually moved."
      },
      {
        "q": "Can you take over production on a conference someone else has already designed?",
        "a": "Yes, if the throughline holds. We'll run production, technical and sponsor coordination against a concept another partner has set — but the single argument the program makes has to be defensible, otherwise the logistics have nothing to serve. Where there isn't one, we'll fix that first or tell you we're not the right team. Taken from scratch, Conferences & Events is end-to-end: curation, sponsor coordination, production and technical, and pre / during / post measurement."
      },
      {
        "q": "What is a conference throughline?",
        "a": "A throughline is the single argument a multi-day program makes — the one idea every stage, session and format ladders back to. Without it, a conference is a filled agenda people forget by Monday. We define the throughline at brief stage, before the speaker list or the venue, then design the curation and room logic to carry it."
      }
    ],
    "ctaHeadline": "Bring us in before the agenda locks.",
    "ctaSub": "A free 30-minute Brief Diagnostic — no pitch, no deck, just the questions we'd ask about your program's throughline, its sponsors, and who's in the room.",
    "utm": "conferencesevents"
  },
  "sponsor-programs": {
    "slug": "sponsor-programs",
    "label": "Sponsor Programs",
    "metaTitle": "Sponsor Program Design for Renewal, Singapore | Mochi Collective",
    "metaDescription": "Sponsor programs designed backwards from the partner's real metric — pipeline, perception, hiring or retention — and built to renew. Singapore and SE Asia.",
    "ogTitle": "Sponsorships that renew — designed backwards from the metric",
    "ogDescription": "Most sponsorships are sold as logo placement and die at renewal. We design from the sponsor's real metric and ship a report they can forward straight to their own board.",
    "h1Html": "Sponsorship designed backwards from <span class=\"accent\">the metric that renews it</span>.",
    "ledeHtml": "Sponsor-grade programs engineered for one outcome: the partner renews. We align the activation to the metric the sponsor is actually judged on, integrate them into the experience rather than the signage, and hand back a report they can forward straight to their own stakeholders. Built for brand programs and events across <strong>Singapore and Southeast Asia</strong>.",
    "serviceType": "Sponsorship program design",
    "jsonldDescription": "Sponsorship program design that starts from the partner's real metric — pipeline, category perception, hiring or retention — integrates the partner natively into the experience, and ships a renewal-grade report the sponsor can forward to their own stakeholders.",
    "blocks": [
      {
        "type": "h2",
        "text": "The problem with logo-and-impressions"
      },
      {
        "type": "p",
        "html": "Most sponsorships get sold as logo placement and a projected impression count. The deck lists tiers, the logo goes on the step-and-repeat, the partner gets a shout-out from stage — and none of it moves the number the sponsor is judged on internally. So when renewal season comes round there is nothing to point at, and the line item quietly gets cut."
      },
      {
        "type": "p",
        "html": "We design the other way. Before anything else, we ask what the sponsor is really buying — qualified pipeline, category perception, a hiring signal, retention of the accounts they already have. If you cannot tell us which of those the cheque is chasing, we will not take the brief. Naming that metric is the whole job; everything downstream is built to move it."
      },
      {
        "type": "h2",
        "text": "What renewal-grade design looks like"
      },
      {
        "type": "ul",
        "items": [
          "<strong>Sponsor KPI to experience design.</strong> We start from the partner's real metric — pipeline, perception, hiring, retention — and design the activation backwards from it, so the experience is engineered to move a specific number rather than to display a logo.",
          "<strong>Native partner integrations.</strong> The partner is built into the experience — the format, the audience, the content in the room — not bolted on as a banner and a thank-you. Strip the branding out and their role should still make sense.",
          "<strong>Renewal-grade reporting.</strong> A report written for the person who has to defend the spend internally: what moved on the agreed metric, in plain language, structured so they can forward it up their own chain without rewriting a line.",
          "<strong>Outcome conversion + relationship-depth report.</strong> We track both halves of renewal — the outcomes that converted (the leads, the meetings, the shift in perception) and how much deeper the relationship went — because renewal is a function of both."
        ]
      },
      {
        "type": "h2",
        "text": "How it runs"
      },
      {
        "type": "p",
        "html": "First we pin the metric and the internal audience for it. A sponsor chasing pipeline needs a different room from one chasing category perception, or one chasing hires. We write down the number, whose desk it lands on, and what a good result looks like to <em>that</em> person — then design the activation to produce exactly that, and nothing decorative on top."
      },
      {
        "type": "p",
        "html": "Then we integrate the partner into the experience itself: the segment we curate the audience around, the format they host, the content only they can credibly put in the room. The test is blunt — strip the branding out and the partner's presence should still earn its place. A logo on a wall fails that test; a session, a segment, or a moment the partner owns passes it."
      },
      {
        "type": "p",
        "html": "Every program ships with a report the sponsor can hand straight to their own stakeholders — no rewrite, no translation. It reads against the metric we agreed at brief stage, pairs outcome conversion with relationship depth, and leans on the same discipline as our <a href=\"/impact-measurement\">impact measurement</a> practice, because renewal is an evidence argument and the report is the evidence. Renewal is the North Star: if the report does not make the case for next year, the program did not do its job."
      },
      {
        "type": "h2",
        "text": "When to bring us in"
      },
      {
        "type": "p",
        "html": "The earlier the better — ideally before the sponsorship is sold. If we are in the room while the tiers and the offer are being shaped, we can design the metric into the package rather than retrofitting proof onto whatever was promised. Come in after the deal is signed and we can still make it renew, but the metric is now fixed by the sale, and some of the ways we would have engineered for it are already off the table."
      },
      {
        "type": "p",
        "html": "Either way, it starts at the brief. The questions worth asking there are simple and uncomfortable: what number is this sponsor judged on internally, who signs off the renewal, and what would that person need to see to sign again. Answer those three and the program almost designs itself. Dodge them and you have bought another year of logo placement."
      }
    ],
    "reading": [
      {
        "href": "/impact-measurement",
        "label": "Impact Measurement — the full model",
        "note": "proving the program moved the metric is the renewal argument, and this is how we build the proof."
      },
      {
        "href": "/thoughts/thought-leadership/6-questions-every-brief",
        "label": "6 Questions Every Event Brief Must Answer",
        "note": "the brief questions we ask before designing anything — the sponsor-metric question lives here."
      },
      {
        "href": "/thoughts/brand-strategy/make-it-worth-talking-about",
        "label": "Make it worth talking about",
        "note": "the positioning wedge that makes a native integration worth more than a logo on a wall."
      },
      {
        "href": "/thoughts/thought-leadership/5-brief-red-flags",
        "label": "5 Event Brief Red Flags (and How to Fix Them)",
        "note": "the brief signals that a sponsorship will fight renewal before it is even built."
      }
    ],
    "faq": [
      {
        "q": "Why don't sponsorships get renewed?",
        "a": "Most don't renew because they were sold as logo placement and impression counts, never tied to the metric the sponsor is judged on internally — pipeline, category perception, hiring or retention. When renewal season arrives there is no evidence the spend moved that number, so the line item gets cut. We design from the sponsor's real metric first and ship a report that makes the renewal case."
      },
      {
        "q": "What is a native sponsor integration?",
        "a": "A native integration builds the partner into the experience itself — the format they host, the audience curated around their segment, the content only they can credibly bring — rather than bolting on a logo and a stage mention. The test: if you removed the branding, the partner's role in the room would still make sense. Native integrations move outcomes; logo placements only move impressions."
      },
      {
        "q": "What's in a sponsor report?",
        "a": "A renewal-grade report the sponsor can forward to their own stakeholders without rewriting it. It reads against the metric agreed at brief stage, pairs outcome conversion — the leads, meetings or perception shift generated — with how much deeper the partner relationship went, and states in plain language whether the program earned another year. It is built to be the renewal argument, not a photo gallery."
      }
    ],
    "ctaHeadline": "Name the metric before you sell the tier.",
    "ctaSub": "A free 30-minute Brief Diagnostic. No pitch, no deck — just the questions we'd ask to work out what your sponsor is really buying and whether it can be built to renew.",
    "utm": "sponsorprograms"
  },
  "community-and-membership": {
    "slug": "community-and-membership",
    "label": "Community & Membership",
    "metaTitle": "Community & Membership Program Design, Singapore | Mochi Collective",
    "metaDescription": "We design members-first community programs in Singapore and Southeast Asia that compound — arc, belonging signal, ritual and founder-independence built in.",
    "ogTitle": "Community & Membership — rooms people protect, three years in",
    "ogDescription": "Members-first programming designed to compound: the arc, the belonging signal, the ritual and the founder-independence test, built in before session one. Singapore and Southeast Asia.",
    "h1Html": "Programs that compound. <span class=\"accent\">Rooms people protect.</span>",
    "ledeHtml": "You don't want a calendar of nice evenings. You want a program where each gathering earns the next, each format makes the brand harder to copy, and a host can hold the room on-tone three years in. We design members-first programs to compound — for founders and brands building community across <strong>Singapore and Southeast Asia</strong>.",
    "serviceType": "Community and membership program design",
    "jsonldDescription": "Members-first community and membership program design that compounds — built around a multi-month arc, an engineered belonging signal, an insider ritual, and a founder-independence test. Serving Singapore and Southeast Asia.",
    "blocks": [
      {
        "type": "h2",
        "text": "The program that stalls at session four"
      },
      {
        "type": "p",
        "html": "Most community programs open well. Session one is full — everyone came to see what this is. By session four the same faces say the same things, the founder is quietly carrying the room, and new arrivals can't find a way in. It looks like a scheduling problem. It's a design one: the thing was booked as a run of gatherings, never built as a system that turns strangers into members and members into hosts."
      },
      {
        "type": "p",
        "html": "So we start at the arc, not the invite list. If you can't tell us where a member should stand at month six versus month one, there isn't a program yet — there's a calendar. That's our honesty test: <em>if we can't name the twelve-month arc with you, we won't take the brief.</em> Naming it is what lets every session afterwards earn the next."
      },
      {
        "type": "h2",
        "text": "What we build into a program"
      },
      {
        "type": "p",
        "html": "Members-first programming, designed to compound. Four components carry most of the work, and we scope them together rather than one session at a time."
      },
      {
        "type": "ul",
        "items": [
          "<strong>Concept + creative direction.</strong> The through-line that makes a room recognisably yours — why it exists, who it's for, and the tone a host can hold three years in without a script.",
          "<strong>Salon + dinner formats.</strong> The actual containers — table sizes, seating logic, the shape of a conversation — designed so the right people meet in the right order, not left to whoever sits down first.",
          "<strong>Members integration + retention frameworks.</strong> The engineered path from first-timer to regular to host, plus the belonging signal that tells a member they've crossed over instead of leaving them to guess.",
          "<strong>Curation systems.</strong> The repeatable way you decide who's in the room next time — so the program keeps its character as it grows, and growth doesn't dilute the thing people joined for."
        ]
      },
      {
        "type": "h2",
        "text": "How the program runs"
      },
      {
        "type": "p",
        "html": "Underneath the formats, four design moves decide whether a program compounds or plateaus. We build all four in before session one, not after the drop-off starts."
      },
      {
        "type": "ul",
        "items": [
          "<strong>Design the arc, not the session.</strong> A multi-month trajectory — strangers, members, participants, hosts — that each gathering serves. Session eight then reads as an inflection point in a plan, not another pleasant evening.",
          "<strong>Engineer the belonging signal.</strong> The specific, felt moment a member shifts from attending to belonging — a role, an artefact, an in-house name — designed on purpose rather than left to emerge, if it emerges at all.",
          "<strong>Install the ritual only insiders know.</strong> The in-group cue members notice about themselves and can pull an outsider into. It turns a series of events into a place with a culture, and culture is what recruits the next cohort without you having to ask.",
          "<strong>Pass the founder-independence test.</strong> A pre-agreed session where you step out of the room and members carry the format. Survive it and you've built a community; fail it and you've built a session series that ends the week you get busy."
        ]
      },
      {
        "type": "h2",
        "text": "When to bring us in"
      },
      {
        "type": "p",
        "html": "Before session one, ideally — the arc, the belonging signal and the ritual are cheap to design early and expensive to retrofit once a cohort has settled into habits. We also take on programs that have already plateaued; there the first job is diagnostic, working out which of the four moves was never designed and whether the existing members can carry a reset. Either way, the sooner the arc is named, the more of it we can still engineer."
      },
      {
        "type": "p",
        "html": "The test at brief stage is simple. Can you name the twelve-month arc, the belonging signal, one ritual an outsider couldn't fake, and what happens the day you step back? Answer those honestly and you'll know whether you're building something that compounds or a calendar of good nights out. Both are legitimate — but they're different products, and only one survives you."
      }
    ],
    "reading": [
      {
        "href": "/thoughts/events-craft/how-community-programs-compound",
        "label": "How Community Programs Compound (And Why Most Don't)",
        "note": "the long-form argument behind this practice — the four design moves in full, and why programs stall at session four"
      },
      {
        "href": "/impact-measurement",
        "label": "Impact Measurement for Events",
        "note": "the sibling practice — how we prove a program actually compounded rather than just felt warm"
      },
      {
        "href": "/thoughts/events-craft/anatomy-of-a-memorable-moment",
        "label": "Anatomy of a Memorable Moment",
        "note": "why rituals and moments members can retell travel further, and recruit the next cohort for you"
      },
      {
        "href": "/thoughts/thought-leadership/6-questions-every-brief",
        "label": "6 Questions Every Event Brief Must Answer",
        "note": "the brief-stage filter we run before we'll commit to designing an arc"
      }
    ],
    "faq": [
      {
        "q": "What makes a community program compound instead of plateau?",
        "a": "A designed arc, an engineered belonging signal, a ritual only insiders know, and a founder-independence test — all built in before the first session. Programs that stall have none of these; they run as a series of good gatherings that lean on the founder's energy until it runs out. Programs that compound are built so members carry the design forward."
      },
      {
        "q": "Can you fix a community program that has already plateaued?",
        "a": "Yes. We start with a diagnostic — which of the four design moves (arc, belonging signal, ritual, founder-independence) was never built — then decide whether the existing members can carry a reset. Sometimes the fix is a new arc; sometimes it's handing a format to members so the founder stops carrying the room. The earlier a program has stalled, the more of it we can still rework."
      },
      {
        "q": "What formats do you design for community and membership?",
        "a": "Mostly salon and dinner formats — small rooms where seating, table size and the order of conversation are designed so the right members meet, rather than left to chance. Around them we build the membership path, retention framework and curation system that decide who's in the room next time and keep the program on-tone as it grows."
      }
    ],
    "ctaHeadline": "Put your program against the four questions",
    "ctaSub": "A free 30-minute Brief Diagnostic: we put your community or membership brief against the arc, the belonging signal, the ritual and the founder-independence test. No pitch. No deck. Just the questions we'd ask anyway.",
    "utm": "communitymembership"
  }
};

export const PRACTICE_LIST: PracticeContent[] = Object.values(PRACTICES);

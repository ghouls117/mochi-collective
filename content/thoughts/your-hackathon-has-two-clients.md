---
title: Your Hackathon Has Two Clients
title_display: Your Hackathon Has <span class="accent">Two Clients</span>
slug: your-hackathon-has-two-clients
meta_title: Your Hackathon Has Two Clients — designing developer programs engineers respect | Mochi Collective
meta_description: Hackathons are commissioned by marketing and graded by engineers. The mechanics of the brief, the judging, the floor, and the two weeks after demo day.
publish_date: 2026-09-08
category: Events Craft
tags: [hackathons, developer programs, developer relations, experience design, impact measurement, singapore, judging criteria, developer experience]
canonical_url: https://mochicollective.com/thoughts/events-craft/your-hackathon-has-two-clients
deck: Hackathons are commissioned by marketing and graded by engineers. Here are the mechanics that decide which of them you disappoint — the brief, the judging, the floor, and the two weeks after demo day.
---

A hackathon is one of the few marketing formats where the audience reads your documentation, your error messages and your rate limits — and can tell by lunchtime whether you shipped them in a hurry. The budget comes from marketing. The verdict comes from engineers. Marketing owns reach and a recap that survives a quarterly review. Engineers own their weekend, and they know when someone else is spending it badly.

Neither client gets back what they spend. The organizer commits budget, staff time and internal credibility, and answers to whoever signed off. The participants commit a weekend, and two hundred weekends is a serious quantity of engineering time. What gets built with it does not stay in the room: hackathon output feeds real products, real open source and real careers, or it feeds nothing. A badly designed weekend is not a neutral event. It spends a scarce resource that belongs to other people.

Most organizations already employ the person meant to hold both clients, usually in developer relations, and consult them after the theme is set and the venue booked. They have no authority over the brief, so the marketing brief wins, and the event gets graded in group chats you will never see.

When we launched this practice we named three things we do differently. This is the layer underneath them.

## The brief is <span class="tint-sage">the event</span>

The challenge brief decides everything downstream. It is usually written last, by whoever has capacity, about a product they have never used. The result cannot be solved with the product, and engineers work that out by hour three.

So the engineer who owns the surface being built on writes the challenge, and someone else edits it for clarity. Marketing owns the framing, not the constraint.

The brief needs a constraint. "Reimagine the future of logistics with AI" is a mood. Without one, judging collapses into taste and the best presenter wins. A latency budget, a fixed dataset, a schema you may not change. Constraints make it possible to be objectively right.

Say what already exists, so nobody rebuilds what you shipped last year, and what access is real: endpoints, rate limits, key issuance, sandbox gaps.

One test. Could a competent engineer who has never met you start building fifteen minutes after reading this? Questions will still come, and the channel is mandatory; the ones about how to get a key mean the brief is not finished. The BetterBriefs Project, run with the IPA, documented how far apart marketers and agencies sit on whether briefs are any good — four in five marketers think they write good briefs, and about one in ten agencies agree. Hackathons add a second gap: the builders were in none of the meetings.

## Judging is <span class="tint-sage">the real brief</span>

Participants optimize for the rubric. Whatever you score is what you get, so the rubric is a design document.

Publish it with the challenge, not on Sunday morning, and show the weights. If judges see only a three-minute pitch and a deck, you ran a pitch competition, and the team with a designer wins.

Require a repository link at submission, with a README stating plainly what works and what is stubbed, and score that honesty.

State the code-freeze rule before registration opens: what may be brought in — libraries, prior open source, a team's own boilerplate — and what may not. Require full commit history rather than one squashed commit, a written declaration of anything pre-existing, and a technical judge who skims the log.

Put a technical majority on any panel scoring a build. One engineer among five is not a safeguard: the other four outvote them and polish still wins. Without a majority, pre-screen every submission by cloning and running it, and give the pitch judges those notes before they score.

A panel is more than a filter. It is the room's main read on the current technology landscape: judges who have shipped recently can say what is already solved, what the industry tried and abandoned, and which parts turn out to be hard in production. For many participants that transfer is worth more than the prize. So choose the panel partly for what the room learns, not only for who can score fairly. A judge who cannot teach is a wasted seat.

Every judge asks one hard technical question and scores the answer. "What did you fake, and why that part?" "Show me the ugliest thing in this repo." "What would you throw away on Monday?" A team who built something answers those honestly. A team who built a deck cannot. Asked well, the question is a transfer as much as a test: the answer, and what the judge says back, teach everyone listening. Asking what breaks at ten thousand users fails on both counts. Nothing built in a weekend survives ten thousand users, so that question rewards bluffing and punishes the team that tells you the truth.

## What "shipped" <span class="tint-sage">has to mean</span>

Shipped needs an operational definition, or it stays a compliment. Ours: it runs from a clean clone, by someone who is not the author, following only the README, with one documented command, and no messages to the team. The criterion is the absence of tribal knowledge, not a stopwatch.

Scope it honestly. A container or devcontainer, or a deployed URL plus source, counts as equivalent evidence. Require a `.env.example` and run the test with organizer-issued keys, never a team's own secrets. Hardware builds and large-model builds get a stated alternative, published with the rules.

Then staff it. Sixty submissions at ten minutes each is ten hours of one person's time. Either it applies to every submission and you staff the window between the submission freeze and demos, or to finalists only. Publish which, before registration.

## Your engineers are <span class="tint-sage">the sponsorship</span>

Your technical staff are the sponsorship deliverable, not booth cover. An engineer can teach; a logo cannot. Run a duty roster: named people, defined shifts, a findable location, a channel with an owner. If someone cannot debug a stack trace, they are hospitality, and should be introduced that way.

Two weeks out, run your own quickstart on a clean machine, with a new account, on the venue's network, provisioning keys the way a participant will. The own goal we see most is an API that will not issue credentials on Saturday morning while two hundred people watch.

The remedy is administrative, which is why it gets skipped. Pre-issue per-team credentials at check-in, which is also what makes time to first call measurable, and get the rate limits raised in writing. Check what a brand-new account hits: verification throttles, approval queues, fraud review. That is where two hundred simultaneous signups die.

Your engineers carry out a ranked list of the places your product confused competent strangers.

## The fourteen days <span class="tint-sage">after demo day</span>

The winner announcement is the middle of the design, not the end. Decide the follow-through before registration opens. Within forty-eight hours, every team gets written judging notes — the transfer continued in writing, and usually a team's only chance to learn what the panel saw. Within a week, the teams worth continuing with get a conversation with a named person who can say yes or no. Within two weeks, you publish what you intend to do, including "nothing, for these reasons." Engineers respect a clear no. They do not respect silence. State the intellectual property position in the rules too, before anyone writes a line.

## What honest <span class="tint-sage">measurement</span> looks like

[Impact Measurement](/impact-measurement) is not a service we sell alongside this. It is the operating system underneath every practice, including this one, instrumented before registration opens.

Completion rate measures your brief and your platform, not the quality of the crowd, but only if the denominator is stated. Registered, checked in, first commit, submitted, submission runs are five different numbers. We use first commit: submissions that run, over teams that pushed a first commit. A rate quoted off registrations is a different metric, and a more flattering one.

Median time to first successful API call is the most diagnostic figure of the weekend. Platforms often track it in the product and rarely instrument it for the event. Issue a distinct key per team at check-in and measure from key issuance, not registration.

Count the blockers logged and how many were resolved on the day, and the substantive technical conversations your engineers and judges had — those are outcomes; badge scans are outputs. At ninety days, count the projects still being committed to.

Report honest denominators alongside all of it, because the organizer has a return to defend: someone approved the budget and will ask what came back. That is what the leadership, sponsor and GTM versions of [our three post-event reports](/three-reports) are for, and the same discipline runs underneath our [sponsor programs](/sponsor-programs).

## What we <span class="tint-sage">will not claim</span>

We will not attach a pipeline number to a weekend. Log the touch, observe what happened next, and be honest that a developer who adopts six months later was moved by things you cannot see. A revenue figure for a hackathon is a number, not a finding.

We also will not claim the winning project will survive. Kohavi and Thomke, writing in Harvard Business Review in September–October 2017, reported that at companies running online experiments at scale, most tested ideas fail to improve the metric they were built to improve — at Microsoft, only about a third did. Inside the company, with the data, with every incentive aligned. A weekend build by strangers is not a stronger bet. Design for what survives: the relationships, the knowledge the room carried out, the documented friction, the people who now know your platform well enough to argue about it.

## Is your brief still a <span class="accent">mood board</span>?

[Hackathons and developer programs](/hackathons) is one of our five practices at Mochi Collective, and the same instrumentation runs underneath all of them. Justin Ng, one of our co-founders, was Director of Ecosystem Development at AngelHack through June 2026, where he led its developer ecosystem and carried the commercial side. That is the point — he was in the rooms where these briefs got written, and watched them fail from the seat that was supposed to catch it.

The Brief Diagnostic is a free 30-minute conversation. We put your challenge brief against the constraint test, read your rubric back to you, and tell you what it is actually rewarding.

No pitch. No deck. Just the questions we'd ask anyway.

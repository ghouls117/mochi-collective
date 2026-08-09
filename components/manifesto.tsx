import { SectionEyebrow } from "./section-eyebrow";

/**
 * Section 01 — Position.
 *
 * Rewritten to lead with what happens to people rather than with the proof
 * claim. The old opener ("We don't report what happened. We report what
 * changed.") set the temperature before the reader had felt anything; it now
 * survives as a pull quote further down, where it lands as a conclusion
 * instead of an assertion.
 *
 * The section closes on "Leave a place better than you found it" with no
 * attribution — deliberately. Section 04 reveals it as a real person's motto,
 * which only works if this one states it plainly first.
 *
 * Layout is a single reading column rather than the previous two-column grid:
 * the argument now runs through five subheads and a pull quote, which a
 * side-by-side grid can't carry.
 */
export function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <div className="wrap">
        <SectionEyebrow id="manifesto" label="Position" />

        <div className="manifesto-col">
          <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
            People don&rsquo;t remember events.
            <br />
            They remember <span className="accent">moments</span>.
          </h2>

          <div className="manifesto-body reveal reveal-d2">
            <p>
              A conversation they didn&rsquo;t expect to have. The part where
              someone finally said the thing out loud. Walking out still turning
              it over, then telling someone about it three weeks later without
              being asked.
            </p>
            <p>
              That&rsquo;s the product. The run sheet, the staging, the timings,
              the casting: all of it exists to make that moment more likely to
              happen.
            </p>

            <h3 className="manifesto-h">You shouldn&rsquo;t have to pick one.</h3>
            <p>
              Most agencies make you choose. The creative shops build you
              something beautiful and hand you a recap deck full of impressions.
              The measurement people hand you a dashboard for an event nobody
              remembers being at.
            </p>
            <p>
              We built the company around refusing that trade. The room has to
              move people. The report has to move a budget conversation. If it
              only does one of those, we haven&rsquo;t finished.
            </p>

            <h3 className="manifesto-h">
              The warmest thing about an event is also the most measurable.
            </h3>
            <p>
              Ask someone thirty days later what they remember, without prompting
              them. Ask whether they told anyone. That isn&rsquo;t a soft metric.
              It&rsquo;s the oldest hard one there is, and it&rsquo;s the question
              that actually matters: did this land somewhere it stays?
            </p>
            <p>
              Make it worth talking about, and the talking is the proof.
            </p>

            <h3 className="manifesto-h">
              We agree the number before we design the room.
            </h3>
            <p>
              One metric, in writing, before a single creative decision. What has
              to change, by how much, over what window. You see it. We sign it. We
              don&rsquo;t get to move it afterwards.
            </p>
            <p>
              We work that way because we&rsquo;ve both sat on your side of the
              table, defending a spend to someone who wasn&rsquo;t in the room. You
              deserve to walk into that conversation with more than a feeling and a
              photo gallery.
            </p>

            <blockquote className="manifesto-pull">
              We don&rsquo;t report what happened.
              <br />
              We report what changed.
            </blockquote>

            <h3 className="manifesto-h">
              Data and insights-led about the proof. Stubbornly human about the
              room.
            </h3>
            <p>
              We&rsquo;re rigorous where rigour pays: the modelling, the analysis,
              the reporting. Done properly, that&rsquo;s what frees the hours for
              the part that can&rsquo;t be systematised. Casting the right people,
              building the right moment, getting the details right on the night.
              Data is very good at telling you whether something worked. It has
              never once made anyone feel like they belonged somewhere.
            </p>

            <p className="manifesto-close">
              Leave a place better than you{" "}
              <span className="accent">found it</span>.
            </p>
            <p>
              That&rsquo;s the whole job, and it&rsquo;s older than this company. An
              event is a place. People are in it for a night, or for four days, and
              they walk out either changed or unchanged. Everything we do about
              measurement exists to find out which one happened, and to make the
              next one better than the last.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

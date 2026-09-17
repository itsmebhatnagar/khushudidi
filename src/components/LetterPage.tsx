import { FragmentMedia } from "@/components/FragmentMedia";

import fragment1 from "@/assets/fragment-1.jpg";
import fragment2 from "@/assets/fragment-2.jpg";
import fragment3 from "@/assets/fragment-3.jpg";
import fragment4 from "@/assets/fragment-4.jpg";

const chapters = [
  {
    number: "01",
    title: "The Thread",
    heading: "Some bonds are thicker than blood.",
    body: "We didn't share a cradle, a surname, or a childhood address. But somewhere along the way, all of that stopped mattering. You became my sister — not by an accident of birth, but by something far rarer: by choice.",
  },
  {
    number: "02",
    title: "Us",
    heading: "Fate forgot to make us siblings — so we went ahead and did it ourselves.",
    body: "You scold me like family, worry about me like family, celebrate me like family. No document anywhere says we're related, and yet you know me better than people who have known me since the day I was born. If that's not a sister, the word itself needs fixing.",
  },
  {
    number: "03",
    title: "The Promise",
    heading: "Sisters aren't always born into your life. Sometimes they walk in and never leave.",
    body: "You chose me as your brother, and I intend to earn it every single day. Wherever life takes us — different cities, different decades — this stays tied. Thank you for being the family I got to pick.",
  },
];

const fragments = [
  { slot: 1, src: fragment1, caption: "every laugh, kept", fig: "fig. 01" },
  { slot: 2, src: fragment2, caption: "partner in every plan", fig: "fig. 02" },
  { slot: 3, src: fragment3, caption: "family, chosen", fig: "fig. 03" },
  { slot: 4, src: fragment4, caption: "side by side, always", fig: "fig. 04" },
];

function MarqueeRow({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="mx-6 font-display text-2xl italic tracking-tight md:text-3xl"
        >
          {text} <span className="mx-4 not-italic">·</span>
        </span>
      ))}
    </div>
  );
}

export function LetterPage({
  name,
  folder,
  dedication,
}: {
  name: string;
  folder: string;
  dedication: string;
}) {
  const marqueeText = `To ${name}, my sister from another mother`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Card header */}
      <header className="mx-auto max-w-3xl px-6 pt-14 md:pt-20">
        <div className="border border-foreground/15 px-6 py-10 text-center md:px-12 md:py-14 animate-rise">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            a letter, for you —
          </p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            This page belongs to
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            {name}
          </h1>
          <p className="mt-3 font-display text-lg italic text-muted-foreground md:text-xl">
            my sister, from another mother
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            est. forever
          </p>
        </div>
      </header>

      {/* Opening letter */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28 animate-rise">
        <h2 className="font-display text-3xl font-medium leading-snug tracking-tight text-balance md:text-5xl">
          Dearest {name},
        </h2>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          No shared surname, no shared blood — just a sister I found along the
          way. A letter in black &amp; white, because a bond like ours never
          needed colour.
        </p>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          scroll slowly, read softly
        </p>
        <div className="mx-auto mt-6 h-10 w-px bg-foreground/20" />
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-foreground/15 py-5">
        <div className="flex w-max animate-marquee">
          <MarqueeRow text={marqueeText} />
          <MarqueeRow text={marqueeText} />
        </div>
      </div>

      {/* Chapters */}
      <main className="mx-auto max-w-2xl px-6">
        {chapters.map((chapter) => (
          <section
            key={chapter.number}
            className="border-b border-foreground/10 py-16 md:py-24"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-5xl font-light text-foreground/20 md:text-6xl">
                {chapter.number}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                {chapter.title}
              </span>
            </div>
            <h3 className="mt-8 font-display text-2xl font-medium leading-snug tracking-tight text-balance md:text-3xl">
              {chapter.heading}
            </h3>
            <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
              {chapter.body}
            </p>
          </section>
        ))}
      </main>

      {/* Fragments */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Chapter 04 — in pictures
        </p>
        <h2 className="mt-4 text-center font-display text-3xl font-medium tracking-tight md:text-5xl">
          Fragments of us
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {fragments.map((fragment) => (
            <figure key={fragment.fig} className="group">
              <div className="overflow-hidden border border-foreground/15">
                <FragmentMedia
                  slot={fragment.slot}
                  folder={folder}
                  fallback={fragment.src}
                  alt={fragment.caption}
                />
              </div>

              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-sm italic">
                  {fragment.caption}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {fragment.fig}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Dedication */}
      <section className="border-t border-foreground/15">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            the dedication
          </p>
          <p className="mt-8 font-display text-3xl font-medium leading-snug tracking-tight text-balance md:text-4xl">
            {dedication}
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-foreground/30" />
          <p className="mt-10 font-display text-lg italic text-muted-foreground">
            always your brother — whether the paperwork agrees or not
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/15">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            do not open · for {name} only ·
          </span>
          <span className="font-display text-sm italic text-muted-foreground">
            written in black &amp; white, felt in full colour
          </span>
        </div>
      </footer>
    </div>
  );
}

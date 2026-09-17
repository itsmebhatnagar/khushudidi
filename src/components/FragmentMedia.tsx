import { useEffect, useState } from "react";

const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "avif", "gif"];
const VIDEO_EXTS = ["mp4", "webm", "mov", "m4v"];

type Found = { kind: "image" | "video"; src: string };

/**
 * Looks for a user-dropped file in /public/fragments/<folder> named after the
 * slot (e.g. 1.jpg, 2.mp4, 3.webm, 4.png). Falls back to the bundled placeholder.
 */
export function FragmentMedia({
  slot,
  folder,
  fallback,
  alt,
}: {
  slot: number;
  folder: string;
  fallback: string;
  alt: string;
}) {
  const [found, setFound] = useState<Found | null>(null);

  useEffect(() => {
    let cancelled = false;
    setFound(null);

    const base = `/fragments/${folder}/${slot}`;
    const candidates: Found[] = [
      ...IMAGE_EXTS.map((ext) => ({ kind: "image" as const, src: `${base}.${ext}` })),
      ...VIDEO_EXTS.map((ext) => ({ kind: "video" as const, src: `${base}.${ext}` })),
    ];

    (async () => {
      for (const candidate of candidates) {
        try {
          const res = await fetch(candidate.src, { method: "HEAD" });
          const type = res.headers.get("content-type") ?? "";
          if (res.ok && !type.includes("text/html")) {
            if (!cancelled) setFound(candidate);
            return;
          }
        } catch {
          /* keep looking */
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slot, folder]);

  const shared =
    "aspect-[4/3] w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.03]";

  if (found?.kind === "video") {
    return (
      <video
        src={found.src}
        className={shared}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={found?.src ?? fallback}
      alt={alt}
      loading="lazy"
      width={1024}
      height={768}
      className={shared}
    />
  );
}

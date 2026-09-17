import { createFileRoute } from "@tanstack/react-router";
import { LetterPage } from "@/components/LetterPage";

const title = "For Khushu di — A Letter in Black & White";
const description =
  "A letter for Khushu di, my sister from another mother — no shared blood, just a bond that never needed colour.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LetterPage
      name="Khushu di"
      folder="khushu"
      dedication="You are not a chapter in my life. You are the whole heart of it."
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { LetterPage } from "@/components/LetterPage";

const title = "For Khushu di — A Letter in Black & White";
const description =
  "A letter for Khushu di, my sister from another mother — no shared blood, just a bond that never needed colour.";

export const Route = createFileRoute("/khushu-di")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LetterPage
      name="Khushu di"
      folder="khushu"
      dedication="Some people are family by chance. You are family by heart — and that is the stronger claim."
    />
  ),
});

// Builds rich, long-form body content for a notification.
// Blocks: { type: "h" | "p" | "ul" | "ol" | "link", text | items | href }

export const buildContent = (n, categoryKey) => {
  if (n && Array.isArray(n.content)) return n.content;
  const msg = (n && n.message) || "";
  return [
    { type: "p", text: "Dear BITCLUB users," },
    { type: "p", text: msg },
    { type: "h", text: "Details" },
    {
      type: "ul",
      items: [
        "This update takes effect immediately after publication.",
        "Existing orders and positions are not affected.",
        "Service availability may vary by region and account tier.",
      ],
    },
    { type: "h", text: "What you need to do" },
    {
      type: "ol",
      items: [
        "Review your account settings and confirm your preferences.",
        "Ensure your identity verification is up to date.",
        "Contact support if you notice any irregularity in your balances.",
      ],
    },
    { type: "h", text: "Risk reminder" },
    {
      type: "p",
      text:
        "Digital asset trading involves significant risk. Prices are highly volatile and may be influenced by external factors such as financial, regulatory, or political events. Please make your investment decisions with caution and trade responsibly.",
    },
    { type: "p", text: "Thank you for your support." },
    { type: "p", text: "BITCLUB Team" },
    { type: "link", text: "View full announcement center", href: "/notifications/" + (categoryKey || "") },
  ];
};

export const contentToPlainText = (blocks) =>
  blocks
    .map((b) => {
      if (b.type === "ul") return b.items.map((i) => "• " + i).join("\n");
      if (b.type === "ol") return b.items.map((i, x) => `${x + 1}. ${i}`).join("\n");
      return b.text || "";
    })
    .join("\n\n");

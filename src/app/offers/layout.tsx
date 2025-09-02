
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Offers | Foodie Find",
  description: "Apply coupons and offers to your order.",
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

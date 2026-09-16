import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Your Bag",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="wrap py-12">
      <h1 className="font-serif text-3xl text-ink">Your Bag</h1>
      <CartView />
    </section>
  );
}

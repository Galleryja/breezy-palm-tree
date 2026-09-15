import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Your bag",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="wrap py-12">
      <h1 className="font-serif text-3xl text-ink">Your bag</h1>
      <CartView />
    </section>
  );
}

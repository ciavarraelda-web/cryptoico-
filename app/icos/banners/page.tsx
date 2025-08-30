"use client";
import { useState } from "react";

export default function BannerPage() {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(3);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      imageUrl: (e.currentTarget.elements.namedItem("imageUrl") as HTMLInputElement).value,
      duration
    };

    const res = await fetch("/api/coinbase/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "banner", data: formData })
    });

    const result = await res.json();
    setLoading(false);

    if (result.url) window.location.href = result.url;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Banner</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="url" name="imageUrl" placeholder="Banner Image URL" required className="w-full border p-2 rounded"/>
        <select value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full border p-2 rounded">
          <option value={3}>3 days - 100 USDC</option>
          <option value={7}>7 days - 150 USDC</option>
        </select>
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
          {loading ? "Generating payment..." : `Pay ${duration === 3 ? 100 : 150} USDC`}
        </button>
      </form>
    </div>
  );
}

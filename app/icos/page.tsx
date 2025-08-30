"use client";
import { useState } from "react";

export default function ICOPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
      description: (e.currentTarget.elements.namedItem("description") as HTMLInputElement).value,
      website: (e.currentTarget.elements.namedItem("website") as HTMLInputElement).value,
      logoUrl: (e.currentTarget.elements.namedItem("logoUrl") as HTMLInputElement).value
    };

    const res = await fetch("/api/coinbase/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "ico", data: formData })
    });

    const result = await res.json();
    setLoading(false);

    if (result.url) window.location.href = result.url;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Your ICO</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="ICO Name" required className="w-full border p-2 rounded"/>
        <textarea name="description" placeholder="Description" required className="w-full border p-2 rounded"/>
        <input type="url" name="website" placeholder="Website URL" required className="w-full border p-2 rounded"/>
        <input type="url" name="logoUrl" placeholder="Logo URL" className="w-full border p-2 rounded"/>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Generating payment..." : "Pay 100 USDC"}
        </button>
      </form>
    </div>
  );
}

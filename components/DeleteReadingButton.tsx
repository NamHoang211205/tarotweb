"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteReadingButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this reading?")) return;
    setDeleting(true);
    const res = await fetch(`/api/readings/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="font-mono text-[11px] uppercase tracking-wider text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-40 flex-none"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}

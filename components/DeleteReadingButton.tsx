"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteReadingButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Xoá lượt xem này?")) return;
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
      className="text-xs text-red-400 hover:text-red-300 transition disabled:opacity-40"
    >
      {deleting ? "Đang xoá..." : "Xoá"}
    </button>
  );
}

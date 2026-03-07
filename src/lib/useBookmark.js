"use client";
import { useState, useEffect } from "react";

export default function useBookmark(itemId, type) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then(r => r.json())
      .then(data => {
        const found = data.bookmarks?.some(
          b => b.itemId === itemId && b.type === type
        );
        setBookmarked(found ?? false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [itemId, type]);

  const toggle = async () => {
    const res  = await fetch("/api/bookmarks", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ itemId, type }),
    });
    const data = await res.json();
    setBookmarked(data.bookmarked);
  };

  return { bookmarked, toggle, loading };
}
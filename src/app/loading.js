// src/app/loading.js  ← global fallback
export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-4 border-transparent animate-spin"
          style={{
            borderTopColor: "var(--color-primary)",
            borderRightColor: "var(--color-secondary)",
          }}
        />
        <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
      </div>
    </main>
  );
}
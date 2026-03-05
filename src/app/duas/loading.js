// src/app/duas/loading.js
export default function DuasLoading() {
  return (
    <main className="min-h-screen pt-6 pb-16 px-4">
      <div className="mx-auto max-w-3xl">

        {/* Heading skeleton */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="h-3 w-28 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-9 w-48 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-3 w-40 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Dua cards skeleton */}
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl p-[1.5px] animate-pulse"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <div className="rounded-[22px] p-6 flex flex-col gap-4 bg-white dark:bg-slate-900">
                {/* Title */}
                <div className="h-5 w-40 rounded-full bg-gray-200 dark:bg-slate-700" />
                {/* Arabic text */}
                <div className="flex flex-col items-end gap-2">
                  <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-slate-800" />
                  <div className="h-4 w-3/4 rounded-full bg-gray-100 dark:bg-slate-800" />
                </div>
                {/* Translation */}
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-slate-800" />
                  <div className="h-3 w-5/6 rounded-full bg-gray-100 dark:bg-slate-800" />
                  <div className="h-3 w-2/3 rounded-full bg-gray-100 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

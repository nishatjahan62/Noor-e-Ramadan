// src/app/timings/loading.js
export default function TimingsLoading() {
  return (
    <main className="min-h-screen pt-6 pb-16 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading skeleton */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="h-3 w-28 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-9 w-52 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-3 w-36 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Controls skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="h-8 w-32 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
          <div className="h-9 w-48 rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Table skeleton */}
        <div className="overflow-hidden rounded-3xl border border-emerald-100/80 dark:border-slate-700/40 shadow-xl">

          {/* Table header */}
          <div className="px-6 py-4 flex justify-between bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700/40">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-36 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
              <div className="h-3 w-24 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
            </div>
            <div className="flex gap-4">
              <div className="h-4 w-16 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-4 w-16 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
            </div>
          </div>

          {/* 2 column rows */}
          <div className="hidden md:flex divide-x divide-slate-700/40 bg-slate-900/50">
            {[...Array(2)].map((_, col) => (
              <div key={col} className="flex-1">
                {/* Col header */}
                <div className="grid grid-cols-4 px-4 py-2 bg-slate-800/60 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-3 rounded-full bg-slate-700 animate-pulse" />
                  ))}
                </div>
                {/* Rows */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="grid grid-cols-4 px-3 py-3 gap-2 border-b border-slate-800/40">
                    <div className="flex justify-center">
                      <div className="h-7 w-7 rounded-xl bg-slate-800 animate-pulse" />
                    </div>
                    <div className="h-4 rounded-full bg-slate-800 animate-pulse" />
                    <div className="h-4 rounded-full bg-slate-800 animate-pulse" />
                    <div className="h-4 rounded-full bg-slate-800 animate-pulse" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile rows */}
          <div className="md:hidden bg-slate-900/50">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 px-3 py-3 gap-2 border-b border-slate-800/40">
                <div className="flex justify-center">
                  <div className="h-7 w-7 rounded-xl bg-slate-800 animate-pulse" />
                </div>
                <div className="h-4 rounded-full bg-slate-800 animate-pulse" />
                <div className="h-4 rounded-full bg-slate-800 animate-pulse" />
                <div className="h-4 rounded-full bg-slate-800 animate-pulse" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
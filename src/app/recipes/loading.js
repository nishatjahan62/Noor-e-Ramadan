// src/app/recipes/loading.js
export default function RecipesLoading() {
  return (
    <main className="min-h-screen pt-8 pb-16 px-4">
      <div className="mx-auto max-w-5xl">

        {/* Heading skeleton */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="h-4 w-32 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-8 w-56 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-3 w-44 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Search skeleton */}
        <div className="h-11 w-full rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse mb-5" />

        {/* Filter skeleton */}
        <div className="flex gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-7 w-16 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-3xl p-[1.5px]"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <div className="rounded-[22px] p-5 flex flex-col gap-3 h-44 bg-white dark:bg-slate-900 animate-pulse">
                <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
                <div className="h-4 w-3/4 rounded-full bg-gray-200 dark:bg-slate-700" />
                <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-slate-800" />
                <div className="h-3 w-2/3 rounded-full bg-gray-100 dark:bg-slate-800" />
                <div className="mt-auto h-8 w-full rounded-xl bg-gray-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
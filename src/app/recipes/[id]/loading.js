// src/app/recipes/[id]/loading.js
export default function RecipeDetailLoading() {
  return (
    <main className="min-h-screen pt-8 pb-16 px-4">
      <div className="mx-auto max-w-3xl">

        {/* Badge + title skeleton */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-10 w-2/3 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
          <div className="h-4 w-3/4 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
          <div className="flex gap-4 mt-1">
            <div className="h-4 w-24 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-4 w-24 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-4 w-20 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>

        {/* 2 col skeleton */}
        <div className="md:grid md:grid-cols-2 md:gap-6 flex flex-col gap-6 mb-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-3xl p-[1.5px]"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <div className="rounded-[22px] p-7 flex flex-col gap-4 bg-white dark:bg-slate-900 animate-pulse">
                <div className="h-5 w-32 rounded-full bg-gray-200 dark:bg-slate-700" />
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 w-full rounded-full bg-gray-100 dark:bg-slate-800" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips skeleton */}
        <div className="rounded-3xl p-[1.5px]"
          style={{ background: "linear-gradient(135deg, var(--color-secondary), var(--color-primary))" }}
        >
          <div className="rounded-[22px] p-7 flex flex-col gap-4 bg-white dark:bg-slate-900 animate-pulse">
            <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-slate-800" />
            <div className="h-4 w-3/4 rounded-full bg-gray-100 dark:bg-slate-800" />
          </div>
        </div>

      </div>
    </main>
  );
}

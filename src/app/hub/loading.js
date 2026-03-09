export default function HubLoading() {
  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-16 py-10 max-w-5xl mx-auto flex flex-col gap-8">
      <div className="rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-400/30 to-amber-400/30">
        <div className="rounded-[22px] px-6 py-6 bg-white dark:bg-slate-900 flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 w-24 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-6 w-40 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-3 w-32 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2].map(i => (
          <div key={i} className="rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-400/30 to-amber-400/30">
            <div className="rounded-[22px] px-6 py-5 bg-white dark:bg-slate-900 flex flex-col gap-4">
              <div className="h-5 w-32 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-10 w-full rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
              {[1, 2, 3].map(j => (
                <div key={j} className="h-10 w-full rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
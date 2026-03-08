export function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shrink-0">
        <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
        <div className="absolute inset-0 rounded-full border border-saffron-light/30" />
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-lg font-bold text-navy dark:text-white tracking-tight">
            NidhiSetu
          </span>
          <span className="text-[10px] text-navy/50 dark:text-white/40 -mt-0.5">
            Bridge to Wealth
          </span>
        </div>
      )}
    </div>
  )
}

export function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-navy to-navy-light dark:from-saffron dark:to-saffron-dark flex items-center justify-center shrink-0 shadow-sm">
        {/* Stylized "SW" monogram */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-white">
          {/* Checkmark / wise path */}
          <path
            d="M4 11.5L8.5 16L18 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bottom accent bar */}
          <path
            d="M4 18.5H18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-lg font-bold text-navy dark:text-white tracking-tight">
            Scheme<span className="text-saffron">Wise</span>
          </span>
          <span className="text-[10px] text-navy/50 dark:text-white/40 -mt-0.5">
            Smart Scheme Decisions
          </span>
        </div>
      )}
    </div>
  )
}

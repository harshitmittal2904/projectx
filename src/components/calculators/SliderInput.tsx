interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  formatValue?: (v: number) => string
  onChange: (v: number) => void
}

export function SliderInput({ label, value, min, max, step, formatValue, onChange }: SliderInputProps) {
  const display = formatValue ? formatValue(value) : value.toString()

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-navy/70 dark:text-white/60">{label}</label>
        <span className="text-sm font-semibold text-navy dark:text-white font-heading">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-navy/10 dark:bg-white/10
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-saffron [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  )
}

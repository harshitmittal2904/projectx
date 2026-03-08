interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy dark:text-white">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-base text-navy/60 dark:text-white/50 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}

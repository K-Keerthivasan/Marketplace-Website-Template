type MockMapPanelProps = {
  label?: string
}

export function MockMapPanel({ label = "Mapbox preview" }: MockMapPanelProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-muted p-6">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(99,102,241,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative flex h-64 flex-col justify-between rounded-[22px] border border-border bg-card/70 p-5 shadow-[0_20px_60px_rgba(49,46,129,0.12)] backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{label}</span>
          <span className="text-xs text-muted-foreground">Mocked Mapbox canvas</span>
        </div>
        <div className="grid gap-4">
          <div className="h-3 w-24 rounded-full bg-indigo-200 dark:bg-indigo-800" />
          <div className="ml-auto h-3 w-16 rounded-full bg-coral-200 dark:bg-coral-900" />
          <div className="h-16 rounded-[20px] border border-dashed border-border bg-muted/80" />
          <div className="flex items-end gap-3">
            <div className="h-20 w-20 rounded-full bg-indigo-600/15" />
            <div className="h-10 flex-1 rounded-2xl bg-yellow-300/40 dark:bg-yellow-500/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

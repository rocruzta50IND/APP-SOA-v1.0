export function Stats() {
  const stats = [
    { label: "Active Properties", value: "12,400+" },
    { label: "Monthly Bookings", value: "$420M+" },
    { label: "Uptime SLA", value: "99.99%" },
    { label: "Guest Satisfaction", value: "4.9/5" },
  ];

  return (
    <section className="py-24 border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col space-y-2">
              <span className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

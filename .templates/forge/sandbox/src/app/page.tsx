import KanbanBoard from "@/components/KanbanBoard";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Sprint Board</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Manage and track your active sprint tasks.</p>
        </div>
        <div className="flex -space-x-2">
          {/* Mock team avatars for the header */}
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover z-30" />
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover z-20" />
          <img src="https://i.pravatar.cc/150?u=a04258114e29026702d" className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover z-10" />
          <div className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 z-0">
            +3
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}

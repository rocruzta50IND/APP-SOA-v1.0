"use client";
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { ColumnData, Task } from '../data/mockData';
import KanbanCard from './KanbanCard';
import { MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface KanbanColumnProps {
  column: ColumnData;
  tasks: Task[];
}

export default function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-[320px] shrink-0 bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl h-full border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
      <div className="p-4 flex items-center justify-between cursor-pointer group shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{column.title}</h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 overflow-y-auto px-3 pb-3 transition-colors",
              snapshot.isDraggingOver ? "bg-indigo-50/50 dark:bg-indigo-900/10 rounded-b-2xl" : ""
            )}
          >
            {tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

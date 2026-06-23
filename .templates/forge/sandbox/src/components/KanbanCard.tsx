"use client";
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { MessageSquare, Paperclip, Clock } from 'lucide-react';
import { Task } from '../data/mockData';
import { format, isPast } from 'date-fns';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface KanbanCardProps {
  task: Task;
  index: number;
}

export default function KanbanCard({ task, index }: KanbanCardProps) {
  const isOverdue = task.dueDate ? isPast(new Date(task.dueDate)) : false;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border mb-3 group cursor-grab active:cursor-grabbing transition-all",
            snapshot.isDragging 
              ? "border-indigo-400 shadow-xl shadow-indigo-500/10 rotate-2 scale-105 z-50 ring-1 ring-indigo-400 dark:bg-slate-900" 
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
          )}
          style={provided.draggableProps.style}
        >
          {/* Labels */}
          {task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {task.labels.map(label => (
                <span key={label.id} className={cn("px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md", label.color)}>
                  {label.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 leading-snug">{task.title}</h4>
          
          {/* Description */}
          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed font-medium">
              {task.description}
            </p>
          )}

          {/* Footer Info */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              {/* Icons */}
              {(task.comments.length > 0 || task.attachments.length > 0) && (
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                  {task.comments.length > 0 && (
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{task.comments.length}</span>
                    </div>
                  )}
                  {task.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>{task.attachments.length}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Due Date */}
              {task.dueDate && (
                <div className={cn(
                  "flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-md",
                  isOverdue ? "text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400" : "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900"
                )}>
                  <Clock className="w-3 h-3" />
                  <span>{format(new Date(task.dueDate), 'MMM d')}</span>
                </div>
              )}
            </div>

            {/* Assignees */}
            {task.assignees.length > 0 && (
              <div className="flex items-center -space-x-2">
                {task.assignees.map((assignee, i) => (
                  <img 
                    key={assignee.id} 
                    src={assignee.avatar} 
                    alt={assignee.name} 
                    className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-slate-950 object-cover"
                    style={{ zIndex: 10 - i }}
                    title={assignee.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

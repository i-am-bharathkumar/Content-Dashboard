'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ContentCard from './ContentCard';
import { ContentItem } from '@/lib/features/contentSlice';
import { GripVertical } from 'lucide-react';

interface SortableCardProps {
  item: ContentItem;
  index: number;
}

export default function SortableCard({ item, index }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 z-10 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>
      <ContentCard item={item} index={index} />
    </div>
  );
}
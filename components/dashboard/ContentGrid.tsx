'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchContent } from '@/lib/features/contentSlice';
import ContentCard from './ContentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { reorderItems } from '@/lib/features/contentSlice';
import SortableCard from './SortableCard';

export default function ContentGrid() {
  const dispatch = useAppDispatch();
  const { filteredItems, loading, error, searchQuery } = useAppSelector(state => state.content);
  const { preferences } = useAppSelector(state => state.user);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const initialLoad = useRef(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (initialLoad.current) {
      dispatch(fetchContent({ categories: preferences.categories, page: 1 }));
      initialLoad.current = false;
    }
  }, [dispatch, preferences.categories]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = filteredItems.findIndex(item => item.id === active.id);
      const newIndex = filteredItems.findIndex(item => item.id === over.id);

      dispatch(reorderItems({ fromIndex: oldIndex, toIndex: newIndex }));
    }
  };

  if (loading && filteredItems.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/20 dark:border-gray-700/20 overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
              <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error loading content
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No results found' : 'No content available'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? 'Try adjusting your search query' : 'Check back later for updates'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Your Feed'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredItems.length} items • Drag and drop to reorder
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <SortableCard key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {/* Infinite scroll trigger */}
      <div ref={ref} className="h-20 flex items-center justify-center mt-8">
        {inView && loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        )}
      </div>
    </div>
  );
}
"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import ActivityCard from "./ActivityCard";

const SortableItem = ({ id, activity }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ActivityCard activity={activity} />
    </div>
  );
};

export default function ItineraryList() {
  const [activities, setActivities] = useState([
    {
      id: "1",
      order: 1,
      title: "India Gate",
      rating: 4.6,
      reviews: 281124,
      image: "https://media.istockphoto.com/id/2147497907/photo/young-woman-traveler-relaxing-and-enjoying-the-tropical-sea-while-traveling-for-summer.jpg?b=1&s=612x612&w=0&k=20&c=Sv2H1hSw-VwkDPpgs4m_mWV_uz7QdyQJoS4xLUFbjzA=",
      description:
        "India Gate is a war memorial located in New Delhi, along the Rajpath...",
    },
    {
      id: "2",
      order: 2,
      title: "Red Fort",
      rating: 4.5,
      reviews: 192300,
      image: "https://media.istockphoto.com/id/2147497907/photo/young-woman-traveler-relaxing-and-enjoying-the-tropical-sea-while-traveling-for-summer.jpg?b=1&s=612x612&w=0&k=20&c=Sv2H1hSw-VwkDPpgs4m_mWV_uz7QdyQJoS4xLUFbjzA=",
      description: "The Red Fort is a historic fort in the city of Delhi...",
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = activities.findIndex((a) => a.id === active.id);
      const newIndex = activities.findIndex((a) => a.id === over.id);
      const reordered = arrayMove(activities, oldIndex, newIndex).map((item, i) => ({
        ...item,
        order: i + 1,
      }));
      setActivities(reordered);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={activities.map((a) => a.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {activities.map((activity) => (
            <SortableItem key={activity.id} id={activity.id} activity={activity} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

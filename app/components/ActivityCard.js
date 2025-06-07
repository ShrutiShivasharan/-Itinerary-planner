
"use client";
import { useState, useEffect, useRef } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaLink,
  FaBars,
  FaEllipsisV,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ActivityCard({ activity }) {
  const [editable, setEditable] = useState(false);
  const [description, setDescription] = useState(activity.description);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ref for menu container to detect outside clicks
  const menuRef = useRef(null);

  // Detect mobile viewport to disable drag on mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const onDragStart = (e) => {
    if (isMobile) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", activity.id || activity.title);
    console.log("Drag started for:", activity.title);
  };

  return (
    <motion.div layout className="bg-white p-4 rounded-xl shadow-md">
      {/* --- SM SCREEN UI --- */}
      <div className="md:hidden flex flex-col gap-4 relative">
        <div className="flex justify-between items-start">
          <div
            draggable={!isMobile}
            onDragStart={onDragStart}
            className={`text-gray-400 hover:text-black cursor-${
              isMobile ? "default" : "grab"
            } ${!isMobile ? "active:cursor-grabbing" : ""}`}
            aria-label="Drag handle"
            role="button"
            tabIndex={0}
          >
            <FaBars size={20} />
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <FaMapMarkerAlt
              className="hover:text-blue-500 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Location"
            />
            <div className="relative" ref={menuRef}>
              <FaEllipsisV
                className="hover:text-black cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                aria-label="More options"
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow p-2 flex flex-col gap-2 z-10">
                  <FaLink
                    className="hover:text-blue-500 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label="Link"
                  />
                  <FaTrash
                    className="hover:text-red-500 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label="Delete"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <span className="absolute -top-2 -left-2 bg-pink-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {activity.order}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-black text-base truncate">
              {activity.title}
            </h3>
            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <span>{activity.rating}</span>
              <FaStar className="text-yellow-400" />
              <span>({activity.reviews.toLocaleString()})</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md flex justify-between items-start gap-2">
          {editable ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent w-full outline-none resize-none"
              rows={3}
              aria-label="Edit description"
            />
          ) : (
            <span className="w-full">{description}</span>
          )}
          <FaEdit
            className="text-gray-500 hover:text-blue-500 cursor-pointer flex-shrink-0"
            onClick={() => setEditable(!editable)}
            size={18}
            role="button"
            tabIndex={0}
            aria-label={editable ? "Save description" : "Edit description"}
          />
        </div>
      </div>

      {/* --- MD+ SCREEN UI --- */}
      <div className="hidden md:flex items-center justify-center gap-6">
        <div
          draggable
          onDragStart={onDragStart}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-black flex-shrink-0"
          aria-label="Drag handle"
          role="button"
          tabIndex={0}
        >
          <FaBars size={24} />
        </div>

        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <span className="absolute -top-2 -left-2 bg-pink-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {activity.order}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-black truncate">{activity.title}</h3>
            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <span>{activity.rating}</span>
              <FaStar className="text-yellow-400" />
              <span>({activity.reviews.toLocaleString()})</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 text-gray-500 flex-shrink-0">
          <FaMapMarkerAlt
            className="hover:text-blue-500 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Location"
          />
          <FaLink
            className="hover:text-blue-500 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Link"
          />
          <FaTrash
            className="hover:text-red-500 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Delete"
          />
        </div>
      </div>

      <div className="hidden md:flex mt-4 text-sm text-gray-700 bg-gray-100 p-3 rounded-md flex justify-between items-start gap-3">
        {editable ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent w-full outline-none resize-none"
            rows={3}
            aria-label="Edit description"
          />
        ) : (
          <span>{description}</span>
        )}
        <FaEdit
          className="text-gray-500 hover:text-blue-500 cursor-pointer flex-shrink-0"
          onClick={() => setEditable(!editable)}
          size={20}
          role="button"
          tabIndex={0}
          aria-label={editable ? "Save description" : "Edit description"}
        />
      </div>
    </motion.div>
  );
}
















import React, { useState } from "react";
import { FiPlus, FiUser, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import MiniCalendar from "../../calendar/MiniCalendar/MiniCalendar";
import EventCard from "../../ui/Modal/EventCard"; // ✅ import your modal
import "./Sidebar.scss";

const Sidebar = ({ sidebarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveEvent = (data) => {
    console.log("New Event Saved:", data);
    // 🔥 You can later post this data to backend using useApi() or context
  };

  return (
    <>
      <aside className={`calendar-sidebar ${sidebarOpen ? "" : "hide"}`}>
        {/* Create button */}
        <button className="create-btn" onClick={handleOpenModal}>
          <FaPlus size={20} />
          <span>Create</span>
          <IoChevronDown size={16} className="dropdown-icon" />
        </button>

        {/* Mini Calendar */}
        <MiniCalendar />

        {/* Search People */}
        <div className="search-people">
          <FiUser size={20} />
          <span>Search for people</span>
        </div>

        {/* Booking Pages */}
        <div className="sidebar-section">
          <div className="section-header">
            <span>Booking pages</span>
            <FiPlus className="icon" size={18} />
          </div>
        </div>

        {/* My Calendars */}
        <div className="sidebar-section">
          <div className="section-header">
            <span>My calendars</span>
            <FiChevronDown className="icon" size={18} />
          </div>
        </div>

        {/* Other Calendars */}
        <div className="sidebar-section">
          <div className="section-header">
            <span>Other calendars</span>
            <FiChevronUp className="icon" size={18} />
          </div>
          <label className="calendar-option">
            <input type="checkbox" defaultChecked />
            <span>Holidays in India</span>
          </label>
        </div>
      </aside>

      {/* ✅ Modal for creating event */}
      <EventCard
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
      />
    </>
  );
};

export default Sidebar;

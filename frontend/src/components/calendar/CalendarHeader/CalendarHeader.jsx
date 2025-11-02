import React from "react";
import {
  FaBars,
  FaSearch,
  FaRegQuestionCircle,
  FaCog,
  FaCalendarAlt,
  FaCheck,
  FaTh,
} from "react-icons/fa";
import "./CalendarHeader.scss";

const CalendarHeader = ({
  onToggleSidebar,
  currentCalendarView,
  setCurrentCalendarView,
}) => {
  return (
    <header className="calendar-header">
      <div className="left-section">
        <FaBars onClick={onToggleSidebar} className="icon hamburger-icon" />

        <div className="logo">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png"
            alt="Google Calendar"
          />
          <span className="title">Calendar</span>
        </div>

        {/* Today Button */}
        <button className="today-btn">Today</button>

        {/* Navigation Arrows */}
        <div className="nav-arrows">
          <span className="arrow">‹</span>
          <span className="arrow">›</span>
        </div>

        {/* Current Date */}
        <span className="date">November 2025</span>
      </div>

      {/* === RIGHT SECTION === */}
      <div className="right-section">
        <FaSearch className="icon" />
        <FaRegQuestionCircle className="icon" />
        <FaCog className="icon" />

        {/* View Selector Dropdown */}
        <div className="view-selector">
          <select
            value={currentCalendarView}
            onChange={(e) => setCurrentCalendarView(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div className="view-buttons">
          <button className={currentCalendarView === "month" ? "active" : ""}>
            <FaCalendarAlt />
          </button>
          <button className={currentCalendarView === "week" ? "active" : ""}>
            <FaCheck />
          </button>
          <button className={currentCalendarView === "day" ? "active" : ""}>
            <FaTh />
          </button>
        </div>

        <div className="profile">H</div>
      </div>
    </header>
  );
};

export default CalendarHeader;

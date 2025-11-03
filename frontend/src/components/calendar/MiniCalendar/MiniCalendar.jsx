import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./MiniCalendar.scss";

const MiniCalendar = () => {
  // Use current system date
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="day-cell prev-month">
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      days.push(
        <div key={day} className={`day-cell ${isToday ? "today" : ""}`}>
          {day}
        </div>
      );
    }

    // Next month days to fill the grid
    const totalCells = 42; // 6 weeks x 7 days grid
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="day-cell next-month">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="mini-calendar">
      <div className="calendar-header">
        <span className="month-year">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <div className="nav-buttons">
          <button
            onClick={prevMonth}
            className="nav-btn"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="nav-btn"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="day-header">S</div>
        <div className="day-header">M</div>
        <div className="day-header">T</div>
        <div className="day-header">W</div>
        <div className="day-header">T</div>
        <div className="day-header">F</div>
        <div className="day-header">S</div>
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default MiniCalendar;

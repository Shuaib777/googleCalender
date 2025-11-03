import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaSearch,
  FaRegQuestionCircle,
  FaCalendarAlt,
  FaCheck,
  FaTh,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./CalendarHeader.scss";
import { useAuth } from "../../../context/AuthContext";
import { useEvent } from "../../../context/EventContext";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { BiSolidGrid } from "react-icons/bi";
import { MdApps } from "react-icons/md";

const CalendarHeader = ({
  onToggleSidebar,
  currentCalendarView,
  setCurrentCalendarView,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  const { user, logout } = useAuth();
  const { selectedDate, setSelectedDate } = useEvent();
  const request = useApi();
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const currentMonthYear = selectedDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const options = [
    { label: "Day", value: "day", shortcut: "D" },
    { label: "Week", value: "week", shortcut: "W" },
    { label: "Month", value: "month", shortcut: "M" },
    { label: "Year", value: "year", shortcut: "Y" },
  ];

  // Handle clicks outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Today navigation
  const handleTodayClick = () => setSelectedDate(new Date());

  const handleNavigation = (direction) => {
    const newDate = new Date(selectedDate);

    if (currentCalendarView === "day") {
      newDate.setDate(selectedDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (currentCalendarView === "week") {
      newDate.setDate(selectedDate.getDate() + (direction === "next" ? 7 : -7));
    } else if (currentCalendarView === "month") {
      newDate.setMonth(
        selectedDate.getMonth() + (direction === "next" ? 1 : -1)
      );
    } else if (currentCalendarView === "year") {
      newDate.setFullYear(
        selectedDate.getFullYear() + (direction === "next" ? 1 : -1)
      );
    }

    setSelectedDate(newDate);
  };

  const handleLogout = async () => {
    try {
      await request("/user/logout", "POST", null, true, true);
      logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 🔆 Theme Toggle Logic
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // optional persistence
  };

  // Load theme from localStorage (optional)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setTheme(savedTheme);
    }
  }, []);

  return (
    <header className="calendar-header">
      <div className="left-section">
        <FaBars onClick={onToggleSidebar} className="icon hamburger-icon" />
        <div className="logo">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png"
            alt="Calendar Logo"
          />
          <span className="title">Calendar</span>
        </div>

        <button className="today-btn" onClick={handleTodayClick}>
          Today
        </button>

        <div className="nav-arrows">
          <span className="arrow" onClick={() => handleNavigation("prev")}>
            ‹
          </span>
          <span className="arrow" onClick={() => handleNavigation("next")}>
            ›
          </span>
        </div>

        <span className="date">{currentMonthYear}</span>
      </div>

      <div className="right-section">
        <FaSearch className="icon" />
        <FaRegQuestionCircle className="icon" />

        {/* 🌗 Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle icon">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* View Dropdown */}
        <div className="view-selector">
          <button
            className="dropdown-toggle"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {options.find((o) => o.value === currentCalendarView)?.label ||
              "View"}
            <MdOutlineArrowDropDown />
          </button>

          {isDropdownOpen && (
            <div className="custom-dropdown">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={`dropdown-item ${
                    currentCalendarView === opt.value ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentCalendarView(opt.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  <span className="shortcut">{opt.shortcut}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Buttons */}
        <div className="view-buttons">
          <button className={currentCalendarView === "month" ? "active" : ""}>
            <FaCalendarAlt />
          </button>
          <button className={currentCalendarView === "week" ? "active" : ""}>
            <FaCheck />
          </button>
        </div>

        <button className="grid">
          <MdApps size={22} className="apps-icon" />
        </button>

        {/* Profile Dropdown */}
        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <strong>{user?.name}</strong>
                <p>{user?.email}</p>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;

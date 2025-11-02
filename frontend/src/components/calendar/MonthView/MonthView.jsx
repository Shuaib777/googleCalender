import React, { useState, useEffect, useRef } from "react";
import "./MonthView.scss";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import useApi from "../../../hooks/useApi";

const MonthView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowHeights, setRowHeights] = useState([]);
  const containerRef = useRef(null);
  const request = useApi();

  const fetchMonthEvents = async (date) => {
    setLoading(true);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await request(
        `/events/month/${formattedDate}`,
        "GET",
        null,
        false,
        true
      );

      if (response && response.grid) {
        setGridData(response.grid);
      }
    } catch (error) {
      console.error("Error fetching month events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthEvents(currentDate);
  }, [currentDate]);

  useEffect(() => {
    if (containerRef.current && gridData.length > 0) {
      const containerHeight = containerRef.current.clientHeight;
      const totalRows = Math.ceil(gridData.length / 7);
      const equalHeight = containerHeight / totalRows;
      const adjustedFirstRow = equalHeight + 10;
      const remainingHeight = containerHeight - adjustedFirstRow;
      const otherRowHeight = remainingHeight / (totalRows - 1);

      const heights = Array.from({ length: totalRows }, (_, i) =>
        i === 0 ? adjustedFirstRow : otherRowHeight
      );

      setRowHeights(heights);
    }
  }, [gridData]);

  const handleDateClick = (date) => console.log("Date clicked:", date);
  const handleEventClick = (event) => console.log("Event clicked:", event);

  return (
    <div className="month-view" ref={containerRef}>
      <div
        className="month-view-grid"
        style={{
          gridTemplateRows: rowHeights.map((h) => `${h}px`).join(" "),
        }}
      >
        {loading ? (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : (
          gridData.map((dayData, index) => (
            <CalendarGrid
              key={index}
              index={index}
              date={new Date(dayData.date)}
              isCurrentMonth={dayData.isCurrentMonth}
              isToday={dayData.isCurrentDay}
              events={dayData.events}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MonthView;

import "./CalendarGrid.scss";

const CalendarGrid = ({
  date,
  isCurrentMonth,
  isToday,
  events = [],
  onDateClick,
  onEventClick,
  index,
}) => {
  const handleClick = () => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const dayNumber = date.getDate();
  const visibleEvents = events.slice(0, 3);
  const remainingCount = events.length - 3;

  // Weekday names for first 7 cells
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div
      className={`calendar-grid-cell ${!isCurrentMonth ? "other-month" : ""} ${
        isToday ? "today" : ""
      }`}
      onClick={handleClick}
    >
      {/* Weekday header only for first row */}
      {index < 7 && <div className="weekday-name">{dayNames[index]}</div>}

      {/* Date Number */}
      <div className="date-number">
        <span className={isToday ? "today-badge" : ""}>{dayNumber}</span>
      </div>

      {/* Events */}
      <div className="events-container">
        {visibleEvents.map((event, i) => (
          <div
            key={event.id || i}
            className="event-item"
            style={{
              backgroundColor: event.color || "var(--event-blue-bg)",
              borderLeft: `0.25rem solid ${event.color || "var(--event-blue)"}`,
            }}
            onClick={(e) => handleEventClick(e, event)}
          >
            {event.time && <span className="event-time">{event.time}</span>}
            <span className="event-title">{event.title}</span>
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="more-events">{remainingCount} more</div>
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  MdMenu,
  MdAccessTime,
  MdPeople,
  MdLocationOn,
  MdDescription,
  MdCalendarToday,
} from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import "./EventCard.scss";
import { useAuth } from "../../../context/AuthContext";

// Helper to format default date & time
const getInitialFormData = (initialData = {}) => {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;

  const startHour = now.getHours().toString().padStart(2, "0");
  const startMinute = now.getMinutes().toString().padStart(2, "0");
  const defaultStart = `${startHour}:${startMinute}`;

  const end = new Date(now.getTime() + 60 * 60 * 1000);
  const endHour = end.getHours().toString().padStart(2, "0");
  const endMinute = end.getMinutes().toString().padStart(2, "0");
  const defaultEnd = `${endHour}:${endMinute}`;

  return {
    title: initialData.title || "",
    date: initialData.date || defaultDate,
    startTime: initialData.startTime || defaultStart,
    endTime: initialData.endTime || defaultEnd,
    description: initialData.description || "",
  };
};

const EventCard = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(getInitialFormData(initialData));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // 💡 When modal opens or new initialData comes in, only reset *once*
  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(initialData));
      setError(null);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          user: user?._id,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save event.");
      }

      const newEvent = await response.json();
      onSave?.(newEvent);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="event-modal-header">
          <button className="menu-btn">
            <MdMenu size={24} />
          </button>
          <button className="close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Title */}
        <div className="event-title-section">
          <input
            type="text"
            name="title"
            className="event-title-input"
            placeholder="Add title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Tabs */}
        <div className="event-tabs">
          <button className="tab-btn active">Event</button>
          <button className="tab-btn">Task</button>
          <button className="tab-btn">Appointment schedule</button>
        </div>

        {/* Details */}
        <div className="event-details">
          {/* Date and Time */}
          <div className="detail-row">
            <MdAccessTime size={24} className="detail-icon" />
            <div className="detail-content">
              <div className="date-time-row">
                <input
                  type="date"
                  name="date"
                  className="date-input"
                  value={formData.date}
                  onChange={handleChange}
                />
                <input
                  type="time"
                  name="startTime"
                  className="time-input"
                  value={formData.startTime}
                  onChange={handleChange}
                />
                <span className="time-separator">–</span>
                <input
                  type="time"
                  name="endTime"
                  className="time-input"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
              <div className="detail-subtext">Time zone • Does not repeat</div>
            </div>
          </div>

          <div className="detail-row">
            <MdPeople size={24} className="detail-icon" />
            <span className="detail-text">Add guests</span>
          </div>

          <div className="detail-row google-meet-row">
            <SiGooglemeet size={24} className="detail-icon google-meet-icon" />
            <span className="detail-text">
              Add Google Meet video conferencing
            </span>
          </div>

          <div className="detail-row">
            <MdLocationOn size={24} className="detail-icon" />
            <span className="detail-text">Add location</span>
          </div>

          <div className="detail-row">
            <MdDescription size={24} className="detail-icon" />
            <textarea
              name="description"
              className="description-input"
              placeholder="Add description or a Google Drive attachment"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="detail-row">
            <MdCalendarToday size={24} className="detail-icon" />
            <div className="detail-content">
              <div className="calendar-info">
                <span className="calendar-name">
                  {user?.name || "My Calendar"}
                </span>
                <span className="calendar-badge"></span>
              </div>
              <div className="detail-subtext">
                Busy • Default visibility • Notify 30 minutes before
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="event-modal-footer">
          {error && <div className="event-modal-error">{error}</div>}
          <button className="more-options-btn">More options</button>
          <button
            className="save-btn"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

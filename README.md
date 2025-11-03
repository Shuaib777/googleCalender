<img width="1918" height="931" alt="image" src="https://github.com/user-attachments/assets/cdc54c5e-f441-493a-80cf-c5d04193d85a" />## Google Calendar

# hosted Link - google-calender-rho.vercel.app

A high-fidelity, full-stack Google Calendar clone meticulously built using React.js, Node.js, Express, and MongoDB.
This project delivers a pixel-perfect replication of Google Calendar’s core functionality and elegant design — featuring event creation, editing, deletion, and recurring event management with real-time updates and smooth UI interactions. It includes secure user authentication, light and dark modes, and a highly responsive interface that ensures a seamless and modern scheduling experience across all devices.

\*\*\* Features

- Monthly, Weekly, and Daily Views — switch seamlessly between views just like Google Calendar.

- Add / Edit / Delete Events — directly from the UI or sidebar.

- Recurring Events — supports daily, weekly, and monthly repetition.

- Light & Dark Theme — toggle instantly with smooth transitions.

- User Authentication — JWT-based sign-up and login with email/password.

- Interactive UI — click on any date to create an event; popup shows event details on click.

- Smooth Animations — sidebar transitions, loading spinners, and UI feedback with CSS transitions.

- Persistent Data — all events stored securely in MongoDB.

- Responsive Design — adapts across devices for a consistent user experience.

# Tech Stack

Frontend -- React.js, Context API, SCSS, CSS Transitions

Backend -- Node.js, Express.js

Database -- MongoDB

Authentication -- JSON Web Token (JWT)

Data Handling -- REST APIs for event & auth management

# Project Architecture

```
google-calendar-clone/
│
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.jsx                  # Root component
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Auth/                # Login/Register
│   │   │   └── Calendar/            # Main calendar page
│   │   │
│   │   ├── components/              # Reusable components
│   │   │   ├── calendar/            # Calendar views (Month/Week/Day/TimeGrid)
│   │   │   ├── events/              # Event components (Card/Modal/Form)
│   │   │   ├── layout/              # Layout components (Sidebar/CreateButton)
│   │   │   └── ui/                  # Generic UI (Button/Modal/Input)
│   │   │
│   │   ├── context/                 # React Context (Calendar/Event/Auth state)
│   │   ├── reducers/                # State management logic
│   │   ├── api/                     # API integration layer
│   │   ├── utils/                   # Helper functions (date, event utils)
│   │   └── styles/                  # Global SCSS (theme, variables, mixins)
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js Backend (Minimal)
│   ├── controllers/                 # Business logic
│   ├── models/                      # Data models
│   ├── routes/                      # API endpoints
│   └── server.js                    # Express server
│
└── README.md
```

# Setup & Installation

1. Clone the repository

--> git clone https://github.com/Shuaib777/googleCalender.git

--> cd googleCalender

2. Install dependencies

--> (For Frontend):

cd client

npm install

--> (For backend):

cd ../backend

npm install

3. Create a .env file inside /backend with:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key  
PORT=5000

4. Run the application
   --> Start backend:

cd server

npm start

--> Start frontend:

cd ../client

npm run dev

Frontend runs on http://localhost:5173

backend on http://localhost:5000

# Architecture Overview

Frontend (React + Context API):

--> Context API manages authentication state and calendar events globally.

--> SCSS modules structure styles cleanly for each component.

--> Smooth UI transitions are implemented via CSS transitions.

Backend (Node + Express):

--> RESTful API endpoints for authentication and event management.

--> Uses JWT for secure, stateless user sessions.

--> MongoDB with Mongoose for flexible schema design (users, events).

# Core Functionalities

1. Authentication: Only logged-in users can manage events.

2. Add Event: From sidebar or by clicking on a date in month view.

3. Edit / Delete Event: Via popup modal when event is clicked.

4. Recurring Events: User can choose repeat type (daily, weekly, monthly).

5. Conflict Handling: Detects overlapping events to avoid schedule clashes.

# Edge Cases & Logic Highlights

--> Prevents overlapping events for the same time slot.

--> Handles recurring events without duplicate entries in DB.

--> Maintains user-specific event data through JWT authentication.

--> Handles invalid input gracefully with validation checks.

# Project Images
<img width="1918" height="931" alt="image" src="https://github.com/user-attachments/assets/ac18ac5f-273f-4fe8-8e4b-1a311c4c021f" />
<img width="1919" height="932" alt="image" src="https://github.com/user-attachments/assets/7d7884eb-2a86-4053-a9b1-3dc30001255a" />
<img width="1919" height="932" alt="image" src="https://github.com/user-attachments/assets/beb8fd4b-f3a6-49dc-ad38-89ac683403ab" />


# Animations & Transitions

--> Sidebar slide-in / slide-out transitions using CSS.

--> Loading spinner displayed during async operations (fetch, auth).

--> Smooth hover, click, and popup transitions for enhanced UX.

# Future Enhancements

--> Task Integration (Google Tasks-style sidebar)

--> Google Account Sync via OAuth 2.0

--> Event Notifications / Reminders

--> Mobile PWA Support

--> Event Statistics Dashboard

# Author

Shuaib777

# 🚨 SENTINEL AI
### Adaptive Emergency Vehicle Priority & Intelligent Response Coordination Platform

<p align="center">

**Every second matters. Every connection matters.**

</p>

<p align="center">

🚀 <a href="https://sentinel-ai-emergency-response-two.vercel.app/">Live Demo</a>

</p>

---

## 🌐 Live Demo

**Try SENTINEL AI here:**

🔗 https://sentinel-ai-emergency-response-two.vercel.app/

---

## 📌 Overview

SENTINEL AI is an intelligent emergency response coordination platform designed to improve emergency vehicle movement through urban traffic.

It provides a centralized command interface that connects emergency dispatch, ambulance coordination, route intelligence, simulated traffic signal prioritization, dynamic rerouting, and hospital preparedness into a unified workflow.

The platform aims to minimize avoidable delays during critical emergencies by enabling smarter coordination between emergency responders, traffic management, and healthcare facilities.

---

## 🚨 Problem Statement

Emergency vehicles frequently encounter challenges that delay critical response times:

- Heavy urban traffic congestion
- Unexpected road blockages and traffic disruptions
- Lack of coordination between emergency services and traffic management
- Inefficient emergency route planning
- Delayed communication with receiving hospitals
- Limited centralized visibility into emergency operations

In time-critical emergencies, every delay can matter.

---

## 💡 Proposed Solution

SENTINEL AI introduces a centralized intelligent emergency coordination system that simulates the entire emergency response journey.

The platform enables emergency operators to:

- Monitor active emergencies through a command center
- Assign ambulances to emergency incidents
- Visualize emergency routes on an interactive map
- Simulate Green Corridor traffic signal coordination
- Dynamically reroute ambulances when road blockages occur
- Coordinate hospital preparedness through incoming emergency notifications
- Monitor ambulance fleet availability and operational status

---

## ✨ Key Features

### 🖥️ Command Center
A centralized dashboard displaying emergency statistics, active incidents, ambulance availability, operational activity, and city-wide emergency overview.

### 🚑 Emergency Dispatch
Register emergency incidents, assign available ambulances, select hospitals, and manage response workflows.

### 🗺️ Live Operations
Interactive map visualization of emergencies, ambulance locations, hospitals, emergency routes, and simulated traffic conditions.

### 🚦 Green Corridor Coordination
Simulates traffic signal prioritization along an ambulance's route, coordinating intersections to facilitate smoother emergency vehicle movement.

### 🔄 Dynamic Rerouting
Simulates alternate route selection when road blockages or traffic disruptions affect the ambulance's current route.

### 🚑 Ambulance Fleet Management
Monitor ambulance availability, assignment status, and operational states through a centralized interface.

### 🏥 Hospital Network
View hospital information and simulate pre-arrival notifications to improve emergency preparedness.

### 📊 Analytics Dashboard
Visualize emergency statistics, response activity, and operational insights.

### 📜 Incident History
Maintain a centralized view of emergency incidents and their statuses.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based UI development |
| Vite | Development environment and build tool |
| JavaScript | Application logic and simulation |
| React Router | Navigation and routing |
| Context API | Shared application state |
| Leaflet | Interactive map visualization |
| React Leaflet | Map integration with React |
| OpenStreetMap | Map visualization and tiles |
| Recharts | Analytics and data visualization |
| Framer Motion | Animations and transitions |
| Lucide React | Icons and interface elements |

---

## 🏗️ System Architecture

```text
                   SENTINEL AI
                       |
             Emergency Command Center
                       |
       ┌───────────────┼────────────────┐
       |              |                |
   Emergency       Ambulance       Traffic
   Dispatch       Coordination    Intelligence
       |              |                |
       └──────────────┼────────────────┘
                      |
             Green Corridor
             Coordination
                      |
             Dynamic Rerouting
                      |
             Hospital Network
                      |
          Unified Emergency Response
```

---

## 🔄 Emergency Response Workflow

```text
Emergency Reported
        ↓
Incident Registration
        ↓
Ambulance Assignment
        ↓
Emergency Route Selection
        ↓
Green Corridor Preparation
        ↓
Live Route Monitoring
        ↓
Road Blockage Detection
        ↓
Dynamic Rerouting (if required)
        ↓
Hospital Pre-Alert
        ↓
Emergency Response Completion
```

---

## 🖥️ Application Modules

| Module | Description |
|---|---|
| Command Center | Central emergency overview and monitoring |
| Live Operations | Map-based operational visualization |
| Emergency Dispatch | Emergency registration and ambulance assignment |
| Ambulance Fleet | Fleet availability and status management |
| Traffic Intelligence | Traffic conditions and disruption visualization |
| Green Corridor | Emergency route signal priority simulation |
| Hospital Network | Hospital coordination and preparedness |
| Incident History | Emergency incident records |
| Analytics | Operational data and insights |
| Settings | Application configuration |

---

## 🚦 Green Corridor — How It Works

The Green Corridor module simulates coordinated traffic signal prioritization for an emergency vehicle.

1. An ambulance is assigned to an emergency.
2. Its emergency route is identified.
3. Intersections along the route are identified.
4. Approaching junctions are prepared for signal priority.
5. Priority is simulated as the ambulance approaches each intersection.
6. After the ambulance passes, priority is released.
7. The process continues across the route to simulate a coordinated Green Corridor.

The goal is to demonstrate how coordinated traffic management could help reduce unnecessary stopping at intersections during emergency movement.

---

## 🧪 Demo Scenarios

The prototype supports demonstration scenarios such as:

- Critical cardiac emergency requiring immediate response
- Ambulance assignment and route visualization
- Green Corridor preparation across intersections
- Road blockage triggering dynamic rerouting
- Hospital pre-arrival notification
- Centralized emergency monitoring through the command center

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/SENTINEL_AI.git
```

### 2. Navigate to the project directory

```bash
cd SENTINEL_AI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in your browser

```text
http://localhost:5173
```

---

## 📦 Production Build

Build the application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

The SENTINEL AI frontend is deployed using **Vercel**.

### Deployment Pipeline

```text
Local Development
      ↓
Git & GitHub
      ↓
Vercel Integration
      ↓
Production Build
      ↓
Live Deployment
```

### Live Application

🔗 https://sentinel-ai-emergency-response-two.vercel.app/

---

## ⚠️ Prototype Disclaimer

SENTINEL AI is currently a frontend demonstration prototype operating with simulated data and interactions.

The current implementation does not directly connect to:

- Real ambulance GPS systems
- Live traffic infrastructure
- Physical traffic signal controllers
- Actual emergency dispatch systems
- Hospital management systems
- Real-time emergency communication networks

The demonstrated emergency coordination, traffic prioritization, ambulance movement, and rerouting functionalities are simulations.

Real-world implementation would require secure backend services, real-time data integration, authorized infrastructure access, and collaboration with municipal authorities, emergency services, and healthcare providers.

---

## 🔮 Future Scope

- Real-time ambulance GPS tracking
- AI-powered traffic congestion prediction
- Intelligent emergency route optimization
- Integration with authorized traffic signal systems
- IoT-based road condition monitoring
- Hospital capacity and availability integration
- Predictive ambulance allocation
- Real-time emergency communication
- Backend infrastructure and secure database
- Integration with Smart City command centers

---

## 🎯 Vision

To create a connected emergency response ecosystem where ambulances, traffic infrastructure, emergency control centers, and hospitals coordinate intelligently to reduce response delays and improve emergency transportation efficiency.

---

## 👥 Project

**SENTINEL AI**  
*Adaptive Emergency Vehicle Priority & Intelligent Response Coordination Platform*

Developed as an innovation-focused project exploring smarter, connected, and coordinated urban emergency response.

---

<p align="center">

🚨 **SENTINEL AI**

*Every second matters. Every connection matters.*

</p>

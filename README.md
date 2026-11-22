# SENTINEL AI

**Adaptive Emergency Vehicle Priority & Intelligent Response Coordination Platform**

SENTINEL AI is a frontend prototype for coordinating emergency responses in Visakhapatnam, Andhra Pradesh. It demonstrates an end-to-end simulated workflow: emergency intake, ambulance assignment, route selection, green-corridor preparation, traffic monitoring, hospital notification, and dynamic rerouting after a road blockage.

> This is a software-first simulation. Ambulances, traffic, hospitals, signals, routes, and improvements shown in the interface are simulated. No real emergency, traffic, GPS, ambulance, hospital, or signal system is connected.

---

## 1. Quick start

### Requirements

- Windows, macOS, or Linux
- Node.js 18 or newer
- npm

### Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite, usually:

**http://localhost:5173**

### Production build

```bash
npm run build
npm run preview
```

The optimized files are generated in `dist/`.

---

## 2. Demo scenario

Use this sequence for a clear 3–5 minute presentation.

### Step 1: Command Center

1. Open **Command Center**.
2. Explain the six KPI cards:
   - active emergencies
   - available ambulances
   - units en route
   - average ETA
   - ready hospitals
   - active green corridors
3. Show the real Leaflet map centered on Visakhapatnam.
4. Point out ambulance, incident, and hospital markers.
5. Select the critical **INC-4821** incident.

### Step 2: Live Operations

1. Open **Live Operations**.
2. Select the active ambulance if needed.
3. Explain ETA, journey progress, destination, speed, and upcoming junctions.

### Step 3: Green Corridor

1. Open **Green Corridor**.
2. Show the selected ambulance and route.
3. Explain the junction sequence and priority states.
4. State clearly: **“The signal-priority data is simulated; no real traffic signals are connected.”**

### Step 4: Dynamic rerouting

1. Click **Trigger Road Blockage**.
2. Wait for the recalculation status to finish.
3. Show the blocked area, alternate route, updated ETA, and corridor recovery.
4. Explain that the old route, new route, additional delay, and updated priorities are frontend simulation results.

### Step 5: Hospital coordination

1. Open **Hospital Network**.
2. Select the receiving hospital.
3. Show readiness, bed and ICU indicators, and incoming ambulance details.
4. Explain that hospital data and acknowledgements are simulated.

### Step 6: Create a new emergency

1. Open **Emergency Dispatch**.
2. Choose a category and severity.
3. Enter a pickup location.
4. Select a hospital.
5. Submit the form.
6. Show the new incident, ambulance assignment, hospital update, activity feed, and dashboard changes.

### Step 7: Analytics and reset

1. Open **Analytics** to show simulated volume and response metrics.
2. Open **Settings** and demonstrate simulation controls.
3. Use **Reset Demo State** to restore the starting scenario.

---

## 3. Application pages

| Page | Purpose |
|---|---|
| Command Center | Operational overview, KPI cards, live map, active incidents, and activity feed |
| Live Operations | Selected ambulance, route progress, ETA, and upcoming junctions |
| Emergency Dispatch | Validated emergency form and automatic frontend dispatch |
| Ambulance Fleet | Fleet search, status filtering, details, and unit locations |
| Traffic Intelligence | Simulated congestion levels, road conditions, and traffic forecast |
| Green Corridor | Junction timeline and simulated signal-priority status |
| Hospital Network | Simulated readiness, bed/ICU status, and incoming ambulances |
| Incident History | Past incident filtering and operational metrics |
| Analytics | Recharts dashboards and baseline-versus-optimized comparison |
| Settings | Simulation speed, traffic level, refresh, notifications, and reset |

---

## 4. Key interactions

- Click emergency markers or active-emergency rows to select an incident.
- Search for navigation pages using the top search field.
- Search and filter the ambulance fleet.
- Search and filter incident history.
- Create an emergency to:
  - generate a unique incident ID
  - assign the first available ambulance
  - update the hospital's incoming count
  - add a green-corridor activity event
- Trigger a road blockage to recalculate the route and update ETA.
- Reset the entire frontend simulation to its initial demo state.

---

## 5. Technology

- React
- Vite
- JavaScript
- React Router
- Leaflet and React Leaflet
- OpenStreetMap tiles
- Lucide React
- Recharts
- Framer Motion
- Context API

No database or backend is required for the current demo.

---

## 6. Project structure

```text
src/
├── App.jsx                 # Routes and application pages
├── App.css                 # Responsive product UI styling
├── SimulationContext.jsx   # Shared frontend simulation state
├── data.js                 # Seed ambulances, hospitals, incidents, routes, and activity
├── index.css               # Global base styles
└── main.jsx                # React entry point
```

The structure separates UI, seed data, and shared simulation state while keeping the prototype easy to modify. Integration points can later be replaced with a FastAPI backend.

---

## 7. Demo defaults

The initial scenario includes:

- 4 active emergencies
- 1 critical cardiac emergency
- 6 ambulances across available, dispatched, en-route, and transporting states
- 4 hospitals
- an active green-corridor route
- a traffic congestion zone
- a seeded system activity feed
- simulated road-disruption and rerouting functionality

---

## 8. What is and is not connected

### Connected

- Interactive OSM map
- Frontend route and marker visualization
- Frontend dispatch workflow
- Shared in-memory state
- Dynamic rerouting demonstration
- Search and filtering
- Settings and reset controls

### Not connected

- Real GPS positions
- Real ambulance APIs
- Real hospital integrations
- Real traffic feeds
- Real traffic signals
- Real emergency dispatch systems
- Real navigation or route optimization

All network, medical, routing, and operational values must be presented as **simulated demo data**.

---

## 9. Suggested judge presentation

**Problem:** Emergency responders need coordinated awareness across the ambulance, route, junctions, traffic, and hospital.

**Solution:** SENTINEL AI provides one operational interface that connects the full response journey instead of showing isolated tracking information.

**Demo emphasis:** Use the critical incident, trigger rerouting, show hospital acknowledgement, and finish by comparing the normal and rerouted route in the corridor and analytics views.

**Position responsibly:** Present the prototype as a validated software workflow for future integration, not as a claim of real-world safety or performance.

---

## 10. Validation

Before presenting, run:

```bash
npm run build
npm run dev
```

Confirm:

- the Command Center loads
- the map and markers render
- an emergency can be selected
- a new dispatch can be submitted
- a road blockage triggers rerouting
- the hospital and fleet views update
- **Reset Demo State** restores the seeded scenario

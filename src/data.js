export const seedAmbulances = [
  { id: 'AMB-204', driver: 'Arjun Rao', status: 'Transporting', location: 'NH16 / Maddilapalem', coords: [17.7396, 83.3102], emergency: 'INC-4821', eta: 8, availability: 'After 8 min', condition: 'Operational', speed: 48 },
  { id: 'AMB-118', driver: 'Sai Kumar', status: 'En Route', location: 'Siripuram Junction', coords: [17.7197, 83.3158], emergency: 'INC-4819', eta: 11, availability: 'After 11 min', condition: 'Operational', speed: 54 },
  { id: 'AMB-307', driver: 'Meera Das', status: 'At Scene', location: 'MVP Colony', coords: [17.7481, 83.3304], emergency: 'INC-4817', eta: 4, availability: 'After 4 min', condition: 'Operational', speed: 12 },
  { id: 'AMB-092', driver: 'Kiran Varma', status: 'Available', location: 'Railway Station', coords: [17.7218, 83.3021], emergency: null, eta: null, availability: 'Ready now', condition: 'Operational', speed: 0 },
  { id: 'AMB-156', driver: 'Nisha Patel', status: 'Dispatched', location: 'Jagadamba Junction', coords: [17.7111, 83.3026], emergency: null, eta: 16, availability: 'After dispatch', condition: 'Operational', speed: 35 },
  { id: 'AMB-221', driver: 'Rohit Sen', status: 'Available', location: 'Airport Road', coords: [17.7215, 83.2244], emergency: null, eta: null, availability: 'Ready now', condition: 'Operational', speed: 0 },
]

export const seedHospitals = [
  { id: 'HOSP-01', name: 'King George Hospital', short: 'KGH', status: 'Ready', beds: '18 beds', icu: '7/9 ICU', incoming: 2, coords: [17.7085, 83.3067], address: 'Maharanipeta, Visakhapatnam' },
  { id: 'HOSP-02', name: 'Apollo Hospitals', short: 'APH', status: 'Ready', beds: '24 beds', icu: '11/14 ICU', incoming: 1, coords: [17.7303, 83.3217], address: 'Ram Nagar, Visakhapatnam' },
  { id: 'HOSP-03', name: 'Care Hospitals', short: 'CAR', status: 'Limited Capacity', beds: '6 beds', icu: '2/8 ICU', incoming: 1, coords: [17.7513, 83.3322], address: 'MVP Colony, Visakhapatnam' },
  { id: 'HOSP-04', name: 'SevenHills Hospital', short: 'SHH', status: 'Busy', beds: '3 beds', icu: '1/6 ICU', incoming: 0, coords: [17.7997, 83.3532], address: 'Madhurawada, Visakhapatnam' },
]

export const seedIncidents = [
  { id: 'INC-4821', type: 'Cardiac Arrest', severity: 'Critical', location: 'NH16, Maddilapalem', coords: [17.7396, 83.3102], hospital: 'King George Hospital', ambulance: 'AMB-204', eta: 8, status: 'Transporting', patient: 'Male, 58; no pulse reported', progress: 78, time: '2 min ago' },
  { id: 'INC-4819', type: 'Road Accident', severity: 'High', location: 'Siripuram Junction', coords: [17.7197, 83.3158], hospital: 'Apollo Hospitals', ambulance: 'AMB-118', eta: 11, status: 'En Route', patient: 'Multiple trauma alerts', progress: 42, time: '6 min ago' },
  { id: 'INC-4817', type: 'Respiratory', severity: 'Medium', location: 'MVP Colony', coords: [17.7481, 83.3304], hospital: 'Care Hospitals', ambulance: 'AMB-307', eta: 4, status: 'At Scene', patient: 'Adult female; difficulty breathing', progress: 31, time: '11 min ago' },
  { id: 'INC-4814', type: 'Trauma', severity: 'High', location: 'Beach Road', coords: [17.7101, 83.3334], hospital: 'King George Hospital', ambulance: 'AMB-156', eta: 16, status: 'Dispatched', patient: 'Fall injury; stable', progress: 18, time: '14 min ago' },
]

export const seedActivity = [
  { time: '00:42', title: 'Green corridor prepared', detail: 'INC-4821 · 6 junction sequence', type: 'success' },
  { time: '00:39', title: 'Hospital notified', detail: 'King George Hospital acknowledged', type: 'info' },
  { time: '00:34', title: 'Ambulance assigned', detail: 'AMB-204 assigned to INC-4821', type: 'info' },
  { time: '00:31', title: 'Emergency received', detail: 'Cardiac arrest · Maddilapalem', type: 'critical' },
  { time: '00:26', title: 'Traffic congestion detected', detail: 'Heavy traffic near Siripuram', type: 'warning' },
  { time: '00:18', title: 'Route generated', detail: '4.8 km simulated route', type: 'info' },
]

export const routePrimary = [[17.7396,83.3102],[17.734,83.3088],[17.7265,83.307],[17.7197,83.306],[17.715,83.305],[17.7085,83.3067]]
export const routeAlternate = [[17.7396,83.3102],[17.736,83.315],[17.729,83.318],[17.721,83.313],[17.715,83.310],[17.7085,83.3067]]

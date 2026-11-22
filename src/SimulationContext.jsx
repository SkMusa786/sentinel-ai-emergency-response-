import { createContext, useContext, useState } from 'react'
import { seedAmbulances, seedHospitals, seedIncidents, seedActivity, routePrimary, routeAlternate } from './data'

const SimulationContext = createContext(null)
const initialSettings = { speed: 1, traffic: 'Heavy', autoRefresh: true, notifications: true, mapStyle: 'Operational' }

export function SimulationProvider({ children }) {
  const [ambulances, setAmbulances] = useState(seedAmbulances)
  const [hospitals, setHospitals] = useState(seedHospitals)
  const [incidents, setIncidents] = useState(seedIncidents)
  const [activity, setActivity] = useState(seedActivity)
  const [selectedIncident, setSelectedIncident] = useState(seedIncidents[0])
  const [blocked, setBlocked] = useState(false)
  const [rerouting, setRerouting] = useState(false)
  const [settings, setSettings] = useState(initialSettings)
  const [toast, setToast] = useState('')

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }
  const clearToast = () => setToast('')

  const addActivity = (title, detail, type = 'info') => {
    setActivity((items) => [{ time: 'now', title, detail, type }, ...items].slice(0, 12))
  }

  const createEmergency = (form) => {
    const available = ambulances.find((item) => item.status === 'Available')
    if (!available) {
      notify('No available ambulance in the simulation')
      return
    }
    const hospital = hospitals.find((item) => item.name === form.hospital) || hospitals[0]
    const id = `INC-${4800 + incidents.length + 25}`
    const incident = {
      id, type: form.type, severity: form.severity, location: form.location,
      coords: [17.724, 83.308], hospital: hospital.name, ambulance: available.id,
      eta: 13, status: 'Dispatched', patient: form.patient || 'Condition pending triage',
      progress: 12, time: 'Just now',
    }
    setIncidents((items) => [incident, ...items])
    setSelectedIncident(incident)
    setAmbulances((items) => items.map((item) => item.id === available.id
      ? { ...item, status: 'Dispatched', emergency: id, eta: 13, location: form.location, availability: 'After 13 min', coords: [17.724, 83.308] }
      : item))
    setHospitals((items) => items.map((item) => item.id === hospital.id ? { ...item, incoming: item.incoming + 1 } : item))
    addActivity('Emergency dispatched', `${id} · ${available.id} assigned · ${hospital.name} notified`, 'success')
    notify(`${id} created — ${available.id} dispatched`)
  }

  const triggerBlockage = () => {
    if (rerouting) return
    setBlocked(true)
    setRerouting(true)
    addActivity('Road blockage detected', 'NH16 segment near Maddilapalem marked unavailable', 'critical')
    window.setTimeout(() => {
      setRerouting(false)
      setIncidents((items) => items.map((item) => item.id === selectedIncident.id ? { ...item, eta: item.eta + 3 } : item))
      setAmbulances((items) => items.map((item) => item.emergency === selectedIncident.id ? { ...item, eta: item.eta + 3 } : item))
      addActivity('Route recalculated', `INC-${selectedIncident.id.replace('INC-', '')} · Alternate route ready · +3 min`, 'warning')
      notify('Alternate route calculated; ETA updated')
    }, 1400)
  }

  const reset = () => {
    setAmbulances(seedAmbulances)
    setHospitals(seedHospitals)
    setIncidents(seedIncidents)
    setActivity(seedActivity)
    setSelectedIncident(seedIncidents[0])
    setBlocked(false)
    setRerouting(false)
    setSettings(initialSettings)
    notify('Simulation restored to demo state')
  }

  const completeIncident = (id) => {
    setIncidents((items) => items.filter((item) => item.id !== id))
    setAmbulances((items) => items.map((item) => item.emergency === id
      ? { ...item, status: 'Available', emergency: null, eta: null, availability: 'Ready now', speed: 0 }
      : item))
    addActivity('Ambulance arrived', `${id} · Hospital handover complete`, 'success')
    notify(`${id} marked complete`)
  }

  const value = {
    ambulances, hospitals, incidents, activity, selectedIncident, setSelectedIncident,
    blocked, rerouting, settings, setSettings, toast, notify, createEmergency,
    triggerBlockage, reset, completeIncident, routePrimary, routeAlternate, clearToast,
  }
  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>
}

export const useSimulation = () => useContext(SimulationContext)

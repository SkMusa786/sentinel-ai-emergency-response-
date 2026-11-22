import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Polyline, Circle, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Activity, Ambulance, BarChart3, Bell, ChevronLeft, ChevronRight, CircleAlert, Clock3,
  Cross, Hospital, LayoutDashboard, MapPinned, Menu, Radio, Route as RouteIcon,
  Search, Settings, Siren, TrafficCone, Users, X, Zap, SlidersHorizontal,
  CheckCircle2, Navigation, TrendingUp, ShieldCheck
} from 'lucide-react'
import { SimulationProvider, useSimulation } from './SimulationContext'
import './App.css'

const navItems = [
  { label: 'Command Center', path: '/', icon: LayoutDashboard },
  { label: 'Live Operations', path: '/operations', icon: Radio },
  { label: 'Emergency Dispatch', path: '/dispatch', icon: Siren },
  { label: 'Ambulance Fleet', path: '/fleet', icon: Ambulance },
  { label: 'Traffic Intelligence', path: '/traffic', icon: TrafficCone },
  { label: 'Green Corridor', path: '/corridor', icon: RouteIcon },
  { label: 'Hospital Network', path: '/hospitals', icon: Hospital },
  { label: 'Incident History', path: '/history', icon: Clock3 },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
]

function markerIcon(type) {
  const colors = { ambulance: '#3b82f6', incident: '#ef4444', hospital: '#10b981' }
  const glyph = type === 'ambulance' ? 'A' : type === 'hospital' ? 'H' : '!'
  return L.divIcon({
    className: 'sentinel-marker',
    html: `<div style="background:${colors[type]}"><span>${glyph}</span></div>`,
    iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -34],
  })
}

function FitMap({ coords }) {
  const map = useMap()
  useEffect(() => { if (coords) map.setView(coords, 13, { animate: true }) }, [coords, map])
  return null
}

function EmergencyMap({ height = 420, showOldRoute = false }) {
  const { ambulances, hospitals, incidents, selectedIncident, setSelectedIncident, blocked, rerouting, routePrimary, routeAlternate } = useSimulation()
  return (
    <div className="map-shell" style={{ height }}>
      <MapContainer center={[17.724, 83.314]} zoom={12} scrollWheelZoom className="map">
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitMap coords={selectedIncident?.coords} />
        {showOldRoute && <Polyline positions={routePrimary} pathOptions={{ color: '#64748b', weight: 4, dashArray: '8 8' }} />}
        <Polyline positions={blocked ? routeAlternate : routePrimary} pathOptions={{ color: blocked ? '#22c55e' : '#3b82f6', weight: 5 }} />
        {blocked && <Circle center={[17.734,83.3088]} radius={260} pathOptions={{ color:'#ef4444', fillColor:'#ef4444', fillOpacity:.14 }} />}
        {rerouting && <Polyline positions={routePrimary} pathOptions={{ color:'#f59e0b', weight:7, opacity:.8, dashArray:'2 12' }} />}
        {ambulances.filter(a => a.coords).map(a => (
          <Marker key={a.id} position={a.coords} icon={markerIcon('ambulance')}>
            <Tooltip><b>{a.id}</b><br />{a.status} · {a.driver}</Tooltip>
          </Marker>
        ))}
        {hospitals.map(h => (
          <Marker key={h.id} position={h.coords} icon={markerIcon('hospital')}>
            <Tooltip><b>{h.name}</b><br />{h.status} · {h.incoming} incoming</Tooltip>
          </Marker>
        ))}
        {incidents.map(i => (
          <Marker key={i.id} position={i.coords} icon={markerIcon('incident')} eventHandlers={{ click: () => setSelectedIncident(i) }}>
            <Tooltip><b>{i.id}</b><br />{i.type} · {i.severity}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <div className="map-badge"><span className="live-dot" /> SIMULATED MAP DATA</div>
    </div>
  )
}

function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function StatCard({ icon: Icon, label, value, detail, tone = 'blue' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={18} /></div>
      <div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
    </div>
  )
}

function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [time, setTime] = useState(new Date())
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const { toast, clearToast } = useSimulation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredNav = navItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
      {mobile && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobile(false)} />}
      <aside className={`sidebar ${mobile ? 'mobile-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={21} /></div>
          <div className="brand-copy"><b>SENTINEL</b><span>AI</span></div>
          <button className="collapse-button" onClick={() => setCollapsed(v => !v)}>{collapsed ? <ChevronRight /> : <ChevronLeft />}</button>
        </div>
        <nav>
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setMobile(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={18} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="system-status"><span className="live-dot" /><div><b>System Operational</b><small>All services normal</small></div></div>
          <div className="profile"><div className="avatar">AK</div><div><b>Alex Kumar</b><small>Dispatch Commander</small></div></div>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobile(true)}><Menu size={20} /></button>
          <div className="page-title"><small>OPERATIONS /</small><b>{navItems.find(i => i.path === window.location.pathname)?.label || 'Command Center'}</b></div>
          <div className="top-actions">
            <div className={`search-box ${searchOpen ? 'open' : ''}`}>
              <Search size={16} />
              <input value={search} onChange={e => { setSearch(e.target.value); setSearchOpen(true) }} placeholder="Search operations" />
              {searchOpen && search && <div className="search-results">
                {filteredNav.length ? filteredNav.map(i => <button key={i.path} onClick={() => { navigate(i.path); setSearch(''); setSearchOpen(false) }}>{i.label}</button>) : <span>No matching page</span>}
              </div>}
            </div>
            <div className="simulation-status"><span className="live-dot" /> Live simulation</div>
            <button className="icon-button"><Bell size={18} /><span className="notification-dot" /></button>
            <div className="clock">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
          </div>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/operations" element={<LiveOperations />} />
            <Route path="/dispatch" element={<DispatchPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/traffic" element={<TrafficPage />} />
            <Route path="/corridor" element={<GreenCorridor />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
      {toast && <div className="toast"><CheckCircle2 size={17} />{toast}<button onClick={clearToast}><X size={14} /></button></div>}
    </div>
  )
}

function CommandCenter() {
  const { incidents, ambulances, hospitals, activity, selectedIncident, setSelectedIncident } = useSimulation()
  return (
    <div className="page">
      <div className="page-heading"><div><p>MONDAY, 21 NOVEMBER</p><h1>Command Center</h1></div><DispatchButton /></div>
      <div className="stats-grid">
        <StatCard icon={Siren} label="Active Emergencies" value={incidents.length} detail="+2 in the last hour" tone="red" />
        <StatCard icon={Ambulance} label="Ambulances Available" value={ambulances.filter(a => a.status === 'Available').length} detail="of 6 units" tone="blue" />
        <StatCard icon={Navigation} label="Units En Route" value={ambulances.filter(a => ['En Route','Dispatched','Transporting'].includes(a.status)).length} detail="Live movement" tone="amber" />
        <StatCard icon={Clock3} label="Average ETA" value="9.4 min" detail="Down 1.2 min" tone="green" />
        <StatCard icon={Hospital} label="Hospitals Ready" value={hospitals.filter(h => h.status === 'Ready').length} detail="of 4 facilities" tone="violet" />
        <StatCard icon={RouteIcon} label="Active Corridors" value="3" detail="18 junctions" tone="cyan" />
      </div>
      <div className="dashboard-grid">
        <section className="panel map-panel">
          <div className="panel-heading"><div><span className="eyebrow">VISAKHAPATNAM NETWORK</span><h2>Live Incident Map</h2></div><div className="map-controls"><span><i className="legend-ambulance" /> Ambulance</span><span><i className="legend-hospital" /> Hospital</span><span><i className="legend-incident" /> Incident</span></div></div>
          <EmergencyMap height={430} />
        </section>
        <section className="panel emergencies-panel">
          <div className="panel-heading"><div><span className="eyebrow">REAL-TIME QUEUE</span><h2>Active Emergencies</h2></div><Badge tone="red">{incidents.length} ACTIVE</Badge></div>
          <div className="emergency-list">
            {incidents.map(i => (
              <button key={i.id} className={`emergency-row ${selectedIncident?.id === i.id ? 'selected' : ''}`} onClick={() => setSelectedIncident(i)}>
                <div className="emergency-main"><span className="incident-code">{i.id}</span><Badge tone={i.severity === 'Critical' ? 'red' : i.severity === 'High' ? 'amber' : 'blue'}>{i.severity}</Badge></div>
                <b>{i.type}</b><small>{i.location}</small>
                <div className="emergency-meta"><span>{i.ambulance}</span><strong>{i.eta} min</strong></div>
              </button>
            ))}
          </div>
        </section>
        <section className="panel activity-panel">
          <div className="panel-heading"><div><span className="eyebrow">SYSTEM STREAM</span><h2>Recent Activity</h2></div></div>
          <div className="activity-list">
            {activity.slice(0,6).map((a,index) => (
              <div className="activity-row" key={`${a.title}-${index}`}><div className={`activity-icon ${a.type}`}><Activity size={14} /></div><div><b>{a.title}</b><span>{a.detail}</span></div><time>{a.time}</time></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function DispatchButton() {
  const navigate = useNavigate()
  return <button className="primary-button" onClick={() => navigate('/dispatch')}><Siren size={17} /> Create Emergency</button>
}

function LiveOperations() {
  const { ambulances, incidents, selectedIncident, setSelectedIncident } = useSimulation()
  return <div className="page">
    <div className="page-heading"><div><p>FIELD COORDINATION</p><h1>Live Operations</h1></div><Badge tone="green">SYSTEM LIVE</Badge></div>
    <div className="operations-grid">
      <section className="panel operations-map"><EmergencyMap height={560} /></section>
      <section className="panel selected-panel">
        <div className="panel-heading"><div><span className="eyebrow">SELECTED UNIT</span><h2>{selectedIncident?.ambulance || 'No unit selected'}</h2></div><Badge tone={selectedIncident?.severity === 'Critical' ? 'red' : 'amber'}>{selectedIncident?.status}</Badge></div>
        {selectedIncident && <>
          <div className="eta-block"><span>ESTIMATED ARRIVAL</span><strong>{selectedIncident.eta}<small>min</small></strong></div>
          <div className="progress-track"><div style={{ width: `${selectedIncident.progress}%` }} /></div>
          <div className="detail-grid"><div><span>Destination</span><b>{selectedIncident.hospital}</b></div><div><span>Speed</span><b>48 km/h</b></div><div><span>Progress</span><b>{selectedIncident.progress}%</b></div><div><span>Incident</span><b>{selectedIncident.id}</b></div></div>
          <div className="subsection-title">UPCOMING JUNCTIONS</div>
          {['Maddilapalem', 'Siripuram', 'Jagadamba', 'Maharanipeta'].map((n,i)=><div className="junction-row" key={n}><span>0{i+1}</span><b>{n} Junction</b><Badge tone={i===0?'green':i===1?'amber':'blue'}>{i===0?'Prepared':i===1?'Requesting':'Upcoming'}</Badge></div>)}
        </>}
      </section>
      <section className="panel fleet-strip">
        <div className="panel-heading"><h2>Active Ambulances</h2></div>
        <div className="ambulance-mini-list">{ambulances.filter(a=>a.status!== 'Available').map(a=><button key={a.id} className={selectedIncident?.ambulance===a.id?'selected':''} onClick={()=>setSelectedIncident(incidents.find(i=>i.ambulance===a.id)||selectedIncident)}><Ambulance size={17}/><div><b>{a.id}</b><small>{a.status}</small></div><strong>{a.eta ? `${a.eta}m` : '—'}</strong></button>)}</div>
      </section>
    </div>
  </div>
}

function DispatchPage() {
  const { hospitals, createEmergency } = useSimulation()
  const [form, setForm] = useState({ type:'Cardiac', severity:'Critical', patient:'', location:'', hospital:hospitals[0].name, notes:'' })
  const [errors, setErrors] = useState({})
  const submit = e => {
    e.preventDefault()
    const next = {}
    if (!form.location.trim()) next.location = 'Pickup location is required'
    setErrors(next)
    if (!Object.keys(next).length) createEmergency(form)
  }
  return <div className="page narrow-page">
    <div className="page-heading"><div><p>NEW RESPONSE REQUEST</p><h1>Emergency Dispatch</h1></div></div>
    <form className="dispatch-layout" onSubmit={submit}>
      <section className="panel dispatch-form">
        <div className="panel-heading"><div><span className="eyebrow">INCIDENT DETAILS</span><h2>Create emergency</h2></div></div>
        <label>Emergency category</label>
        <div className="category-grid">{['Cardiac','Accident','Trauma','Respiratory','Critical','Other'].map(c=><button type="button" key={c} className={form.type===c?'selected':''} onClick={()=>setForm({...form,type:c})}>{c}</button>)}</div>
        <div className="form-grid">
          <div><label>Severity</label><select value={form.severity} onChange={e=>setForm({...form,severity:e.target.value})}><option>Critical</option><option>High</option><option>Medium</option></select></div>
          <div><label>Patient condition</label><input value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})} placeholder="Brief patient condition" /></div>
          <div className="full"><label>Pickup location</label><input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Address or landmark" />{errors.location&&<small className="form-error">{errors.location}</small>}</div>
          <div className="full"><label>Destination hospital</label><select value={form.hospital} onChange={e=>setForm({...form,hospital:e.target.value})}>{hospitals.map(h=><option key={h.id}>{h.name}</option>)}</select></div>
          <div className="full"><label>Additional notes</label><textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Access issues, patient count, or special instructions" /></div>
        </div>
        <button className="primary-button dispatch-submit" type="submit"><Siren size={17}/> Dispatch Ambulance</button>
      </section>
      <section className="panel dispatch-preview">
        <div className="panel-heading"><div><span className="eyebrow">PRE-DISPATCH CHECK</span><h2>Response preview</h2></div></div>
        <div className="preview-map"><EmergencyMap height={260} /></div>
        <div className="detail-grid"><div><span>Nearest unit</span><b>AMB-092 · 2.1 km</b></div><div><span>Est. response</span><b>5–7 min</b></div><div><span>Hospital readiness</span><b>Ready</b></div><div><span>Corridor</span><b>Auto prepare</b></div></div>
      </section>
    </form>
  </div>
}

function FleetPage() {
  const { ambulances } = useSimulation()
  const [query,setQuery]=useState('')
  const [filter,setFilter]=useState('All')
  const [selected,setSelected]=useState(ambulances[0])
  const list=ambulances.filter(a=>(filter==='All'||a.status===filter)&&(`${a.id} ${a.driver}`.toLowerCase()).includes(query.toLowerCase()))
  return <div className="page"><div className="page-heading"><div><p>RESOURCE MANAGEMENT</p><h1>Ambulance Fleet</h1></div></div>
    <div className="table-layout">
      <section className="panel table-panel"><div className="table-toolbar"><div className="search-box static"><Search size={16}/><input placeholder="Search fleet" value={query} onChange={e=>setQuery(e.target.value)}/></div><select value={filter} onChange={e=>setFilter(e.target.value)}>{['All','Available','Dispatched','En Route','At Scene','Transporting','Offline'].map(s=><option key={s}>{s}</option>)}</select></div>
        <div className="data-table"><div className="table-head"><span>Unit</span><span>Status</span><span>Driver</span><span>Location</span><span>Availability</span></div>{list.map(a=><button key={a.id} className={selected?.id===a.id?'selected':''} onClick={()=>setSelected(a)}><span><b>{a.id}</b><small>{a.condition}</small></span><span><Badge tone={a.status==='Available'?'green':a.status==='Offline'?'neutral':'blue'}>{a.status}</Badge></span><span>{a.driver}</span><span>{a.location}</span><span>{a.availability}</span></button>)}</div>
      </section>
      {selected&&<section className="panel fleet-detail"><div className="detail-unit"><div className="fleet-icon"><Ambulance size={24}/></div><div><span>UNIT DETAILS</span><h2>{selected.id}</h2></div></div><div className="detail-grid"><div><span>Driver</span><b>{selected.driver}</b></div><div><span>Status</span><b>{selected.status}</b></div><div><span>Location</span><b>{selected.location}</b></div><div><span>Speed</span><b>{selected.speed} km/h</b></div></div><EmergencyMap height={230}/></section>}
    </div>
  </div>
}

function TrafficPage() {
  const traffic = [
    { road:'NH16 · Maddilapalem', level:'Critical', speed:'18 km/h', status:'Congested' },
    { road:'Siripuram Junction', level:'Heavy', speed:'24 km/h', status:'Slow moving' },
    { road:'Beach Road', level:'Moderate', speed:'36 km/h', status:'Stable' },
    { road:'Airport Road', level:'Low', speed:'52 km/h', status:'Clear' },
  ]
  return <div className="page"><div className="page-heading"><div><p>SIMULATED NETWORK FEED</p><h1>Traffic Intelligence</h1></div><Badge tone="amber">SIMULATED DATA</Badge></div>
    <div className="traffic-grid">
      <section className="panel traffic-map"><EmergencyMap height={500}/></section>
      <section className="panel traffic-summary"><div className="panel-heading"><div><span className="eyebrow">NETWORK CONDITIONS</span><h2>Road Status</h2></div></div>
        <div className="traffic-kpis"><div><span>Average speed</span><b>32.5 <small>km/h</small></b></div><div><span>Disrupted roads</span><b>3</b></div></div>
        <div className="traffic-list">{traffic.map(t=><div key={t.road}><div><b>{t.road}</b><small>{t.status}</small></div><span>{t.speed}</span><Badge tone={t.level==='Critical'?'red':t.level==='Heavy'?'amber':t.level==='Moderate'?'blue':'green'}>{t.level}</Badge></div>)}</div>
      </section>
      <section className="panel prediction-chart"><div className="panel-heading"><h2>15-Minute Congestion Forecast</h2></div><div className="bar-chart">{[38,44,48,55,67,71,64,58,52,46,42,39].map((v,i)=><div key={i} style={{height:`${v}%`}} className={v>60?'hot':''}/>)}</div><div className="chart-labels"><span>Now</span><span>+5m</span><span>+10m</span><span>+15m</span></div></section>
    </div>
  </div>
}

function GreenCorridor() {
  const { selectedIncident, blocked, rerouting, triggerBlockage } = useSimulation()
  const junctions = [
    { name:'Maddilapalem', status:'Priority Prepared', time:'00:01', tone:'green' },
    { name:'Siripuram', status:'Awaiting Request', time:'00:03', tone:'amber' },
    { name:'Jagadamba', status:'Priority Prepared', time:'00:06', tone:'green' },
    { name:'R.T.C. Complex', status:'Upcoming', time:'00:08', tone:'blue' },
  ]
  return <div className="page"><div className="page-heading"><div><p>CORRIDOR CONTROL</p><h1>Green Corridor</h1></div><button className="danger-button" onClick={triggerBlockage} disabled={rerouting}><TrafficCone size={17}/>{rerouting?'Recalculating…':'Trigger Road Blockage'}</button></div>
    <div className="corridor-grid">
      <section className="panel corridor-map"><EmergencyMap height={520} showOldRoute /></section>
      <section className="panel corridor-detail"><div className="panel-heading"><div><span className="eyebrow">SELECTED AMBULANCE</span><h2>{selectedIncident?.ambulance}</h2></div><Badge tone={rerouting?'amber':'green'}>{rerouting?'Rerouting':blocked?'Corridor Recovered':'Active Corridor'}</Badge></div>
        <div className="corridor-status"><ShieldCheck size={20}/><div><b>SIMULATED SIGNAL PRIORITY</b><span>No real traffic signals are connected.</span></div></div>
        <div className="junction-timeline">{junctions.map((j,i)=><div className="timeline-row" key={j.name}><div className={`timeline-dot ${j.tone}`}>{i+1}</div><div className="timeline-line"/><div><span>{j.time} arrival</span><b>{j.name} Junction</b></div><Badge tone={j.tone}>{j.status}</Badge></div>)}</div>
        <div className="route-summary"><div><span>Route status</span><b>{blocked?'Alternate route active':'Primary route active'}</b></div><div><span>Estimated ETA</span><b>{selectedIncident?.eta || 8} min</b></div><div><span>Route recovery</span><b>{blocked?'90 sec':'Ready'}</b></div></div>
      </section>
    </div>
  </div>
}

function HospitalsPage() {
  const { hospitals, incidents } = useSimulation()
  const [selected,setSelected]=useState(hospitals[0])
  return <div className="page"><div className="page-heading"><div><p>RECEIVING FACILITIES</p><h1>Hospital Network</h1></div><Badge tone="blue">{hospitals.length} FACILITIES · SIMULATED</Badge></div>
    <div className="hospital-grid">{hospitals.map(h=><button key={h.id} className={`hospital-card ${selected?.id===h.id?'selected':''}`} onClick={()=>setSelected(h)}><div className="hospital-top"><div className="hospital-icon"><Cross size={20}/></div><Badge tone={h.status==='Ready'?'green':h.status==='Limited Capacity'?'amber':'red'}>{h.status}</Badge></div><h2>{h.name}</h2><p>{h.address}</p><div className="hospital-metrics"><div><span>Bed capacity</span><b>{h.beds}</b></div><div><span>ICU availability</span><b>{h.icu}</b></div></div><div className="incoming"><Navigation size={15}/><b>{h.incoming}</b> incoming ambulance{h.incoming!==1?'s':''}</div></button>)}</div>
    {selected&&<section className="panel hospital-detail"><div className="panel-heading"><div><span className="eyebrow">SELECTED HOSPITAL</span><h2>{selected.name}</h2></div><Badge tone="green">Acknowledgement ready</Badge></div><div className="incoming-table"><div className="table-head"><span>Incident</span><span>Category</span><span>Ambulance</span><span>ETA</span></div>{incidents.filter(i=>i.hospital===selected.name).map(i=><div key={i.id}><span><b>{i.id}</b></span><span>{i.type}</span><span>{i.ambulance}</span><span>{i.eta} min</span></div>)}</div></section>}
  </div>
}

function HistoryPage() {
  const history=[
    {id:'INC-4788',type:'Cardiac',severity:'Critical',ambulance:'AMB-204',hospital:'King George Hospital',dispatch:'09:42',response:'06:10',journey:'28:14',status:'Completed'},
    {id:'INC-4782',type:'Accident',severity:'High',ambulance:'AMB-118',hospital:'Apollo Hospitals',dispatch:'09:18',response:'07:32',journey:'31:08',status:'Completed'},
    {id:'INC-4779',type:'Trauma',severity:'Medium',ambulance:'AMB-307',hospital:'Care Hospitals',dispatch:'08:51',response:'05:48',journey:'24:42',status:'Completed'},
  ]
  const [query,setQuery]=useState('')
  const [severity,setSeverity]=useState('All')
  const list=history.filter(h=>(severity==='All'||h.severity===severity)&&Object.values(h).join(' ').toLowerCase().includes(query.toLowerCase()))
  return <div className="page"><div className="page-heading"><div><p>PAST EMERGENCIES</p><h1>Incident History</h1></div></div>
    <section className="panel history-panel"><div className="table-toolbar"><div className="search-box static"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search incidents"/></div><select value={severity} onChange={e=>setSeverity(e.target.value)}>{['All','Critical','High','Medium'].map(s=><option key={s}>{s}</option>)}</select></div>
      <div className="history-table"><div className="table-head"><span>Incident</span><span>Type</span><span>Severity</span><span>Ambulance</span><span>Hospital</span><span>Response</span><span>Journey</span><span>Status</span></div>{list.map(h=><div key={h.id}><span><b>{h.id}</b><small>{h.dispatch}</small></span><span>{h.type}</span><span><Badge tone={h.severity==='Critical'?'red':h.severity==='High'?'amber':'blue'}>{h.severity}</Badge></span><span>{h.ambulance}</span><span>{h.hospital}</span><span>{h.response}</span><span>{h.journey}</span><span><Badge tone="green">{h.status}</Badge></span></div>)}</div>
    </section>
  </div>
}

function AnalyticsPage() {
  const volume=[32,42,38,51,47,63,58,71,66,74,69,82]
  const response=[8.8,8.5,8.7,8.1,7.9,7.6,7.8,7.2,7.4,7.1,6.9,7.0]
  return <div className="page"><div className="page-heading"><div><p>SIMULATION METRICS</p><h1>Analytics</h1></div><Badge tone="amber">SIMULATED RESULTS</Badge></div>
    <div className="analytics-stats"><StatCard icon={Clock3} label="Avg response time" value="7.2 min" detail="Simulation metric" tone="blue"/><StatCard icon={RouteIcon} label="Avg travel time" value="21.4 min" detail="Simulation metric" tone="green"/><StatCard icon={Activity} label="Avg rerouting time" value="90 sec" detail="Recovery simulation" tone="amber"/><StatCard icon={Zap} label="Stops avoided" value="18" detail="At junctions" tone="violet"/></div>
    <div className="analytics-grid">
      <section className="panel"><div className="panel-heading"><h2>Emergency Volume</h2><Badge tone="blue">LAST 12 HOURS</Badge></div><div className="line-chart">{volume.map((v,i)=><div key={i} style={{height:`${v}%`}}><span/></div>)}</div></section>
      <section className="panel"><div className="panel-heading"><h2>Response Time Trend</h2><Badge tone="green">MINUTES</Badge></div><div className="line-chart green-line">{response.map((v,i)=><div key={i} style={{height:`${100-(v-6)*20}%`}}><span/></div>)}</div></section>
      <section className="panel category-panel"><div className="panel-heading"><h2>Emergency Categories</h2></div><div className="donut-wrap"><div className="donut"><div><b>82</b><span>Total</span></div></div><div className="donut-legend">{[['Cardiac',34,'#3b82f6'],['Accident',28,'#f59e0b'],['Trauma',21,'#ef4444'],['Other',17,'#8b5cf6']].map(([n,v,c])=><div key={n}><i style={{background:c}}/><span>{n}</span><b>{v}%</b></div>)}</div></div></section>
      <section className="panel comparison-panel"><div className="panel-heading"><h2>Route Comparison</h2><Badge tone="amber">SIMULATION COMPARISON</Badge></div><div className="comparison-table"><div className="table-head"><span>Metric</span><span>Baseline route</span><span>SENTINEL optimized</span></div>{[['Travel time','26 min','21 min'],['Intersections','12','8'],['Simulated stops','9','3'],['Route distance','6.4 km','5.8 km'],['Recovery after blockage','4.8 min','1.5 min']].map(r=><div key={r[0]}><span>{r[0]}</span><span>{r[1]}</span><b>{r[2]}</b></div>)}</div></section>
    </div>
  </div>
}

function SettingsPage() {
  const { settings,setSettings,reset } = useSimulation()
  const update=(key,value)=>setSettings(s=>({...s,[key]:value}))
  return <div className="page narrow-page"><div className="page-heading"><div><p>SYSTEM CONTROLS</p><h1>Settings</h1></div></div>
    <section className="panel settings-panel"><div className="settings-section"><h2>Simulation controls</h2><div className="setting-row"><div><b>Simulation speed</b><span>Rate of live position and ETA updates</span></div><select value={settings.speed} onChange={e=>update('speed',Number(e.target.value))}><option value={1}>1× Normal</option><option value={2}>2× Fast</option><option value={0.5}>0.5× Slow</option></select></div><div className="setting-row"><div><b>Traffic level</b><span>Global simulated congestion</span></div><select value={settings.traffic} onChange={e=>update('traffic',e.target.value)}><option>Low</option><option>Moderate</option><option>Heavy</option><option>Critical</option></select></div></div>
      <div className="settings-section"><h2>Notifications & refresh</h2>{[['autoRefresh','Auto-refresh live data'],['notifications','Dispatch notifications']].map(([key,label])=><div className="setting-row" key={key}><div><b>{label}</b><span>{key==='autoRefresh'?'Update operations without reloading':'Show in-app action confirmations'}</span></div><button className={`toggle ${settings[key]?'on':''}`} onClick={()=>update(key,!settings[key])}><span/></button></div>)}</div>
      <div className="settings-section reset-section"><div><h2>Reset simulation</h2><p>Restore all seeded incidents, units, and routes.</p></div><button className="danger-button" onClick={reset}>Reset Demo State</button></div>
    </section>
  </div>
}

export default function App() {
  return <SimulationProvider><BrowserRouter><AppShell /></BrowserRouter></SimulationProvider>
}

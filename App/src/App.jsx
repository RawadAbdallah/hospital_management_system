import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from './pages/auth'
import Patient from './pages/dashboard/patient'
import Doctor from './pages/dashboard/doctor'
import Admin from './pages/dashboard/admin'
import Error404 from './pages/error-404'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/dashboard/patient" element={<Patient/>}/>
        <Route path="/dashboard/doctor" element={<Doctor/>}/>
        <Route path="/dashboard/admin" element={<Admin/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

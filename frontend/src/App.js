import { Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Dashboard from "./components/Dashboard"
import Liout from "./components/Liout"
const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Liout/>}>
          <Route path="auth" element={<Auth/>} />
          <Route path="dashboard" element={<Dashboard/>} />

          </Route>
      </Routes>
    </div>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'

function App() {

  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}

export default App

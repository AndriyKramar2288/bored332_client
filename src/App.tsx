import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/authContext'
import LeftPanel from './components/LeftPanel'
import ProfilePage from './pages/ProfilePage'
import bgImage from './assets/g116.svg';
import LocationsPage from './pages/LocationsPage'
import CreateLocationPage from './pages/CreateLocationPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "10000px 10000px" }}>
          <Header />
          <div className='flex flex-1 bg-[#00000010]'>
            <LeftPanel />
            <div className="flex-7">
              <Routes> 
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/location" element={<LocationsPage />} />
                <Route path="/location/create" element={<CreateLocationPage />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

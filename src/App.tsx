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
import ModelsPage from './pages/ModelsPage'
import CreateCountryPage from './pages/CreateCountryPage'
import CreateModelPage from './pages/CreateModelPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
          <Header />
          <div className='flex flex-1 bg-[#00000010]'>
            <LeftPanel />
            <div className="flex-7 pl-36">
              <Routes> 
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/location" element={<LocationsPage />} />
                <Route path="/location/create" element={<CreateLocationPage />} />
                <Route path="/country/create" element={<CreateCountryPage />} />
                <Route path="/model/create" element={<CreateModelPage />} />
                <Route path="/model" element={<ModelsPage />} />
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

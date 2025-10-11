import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/authContext'
import LeftPanel from './components/LeftPanel'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-main">
          <Header />

          <div className='flex flex-1'>
            <LeftPanel />
            <div className="flex-7 bg-[#00000010]">
              <Routes> 
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
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

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-main">
        <Header />

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

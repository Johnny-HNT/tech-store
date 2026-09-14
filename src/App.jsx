import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import BuyProduct from './pages/BuyProduct'
import Orders from './pages/Orders'
import MasterDashboard from './pages/MasterDashboard'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const isMaster = location.pathname === '/master'

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/buy/:productId"
              element={
                <PageTransition>
                  <BuyProduct />
                </PageTransition>
              }
            />
            <Route
              path="/orders"
              element={
                <PageTransition>
                  <Orders />
                </PageTransition>
              }
            />
            <Route
              path="/master"
              element={
                <PageTransition>
                  <MasterDashboard />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      {!isMaster && <Footer />}
    </div>
  )
}

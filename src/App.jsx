import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import SubcategoryDetail from './pages/SubcategoryDetail';
import CreateProfile from './pages/CreateProfile';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/category/:categoryId/:subId" element={<SubcategoryDetail />} />
            <Route path="/create-profile/:categoryId" element={<CreateProfile />} />
            <Route path="/profile/:categoryId" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
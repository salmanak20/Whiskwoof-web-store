
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Guide from './pages/Guide';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="guide" element={<Guide />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </ProductProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;


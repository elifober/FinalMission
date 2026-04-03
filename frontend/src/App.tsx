import BooklistPage from "./pages/BooklistPage";
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AppNavbar from "./components/AppNavbar";
import AdminPage from "./pages/AdminPage";

function App() {

  return (
    <>
      <CartProvider>
        <Router>
          <AppNavbar />
          <main className="bg-body-tertiary min-vh-100 pb-5 text-start">
            <Routes>
              <Route path='/' element={<BooklistPage/>}/>
              <Route path='/bookDetails/:bookId/:title/:price' element={<BookDetailsPage/>}/>
              <Route path='/cart' element={<CartPage/>}/>
              <Route path='/adminbooks' element={<AdminPage/>}></Route>
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </>
  )
}

export default App

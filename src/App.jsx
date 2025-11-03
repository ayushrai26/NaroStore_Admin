import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import AuthenticationContext from "./contextAPI/Authentication/createContext";
import { Toaster } from "react-hot-toast";
import AdminHome from "./components/AdminHome";
function App() {
  const location = useLocation()
  const hideLayout = location.pathname === '/admin/login' || location.pathname === '/';

  const {isAuthenticated,setIsAuthenticated} = useContext(AuthenticationContext)

  useEffect(()=>{
    const generateAccessToken = async()=>{
      try{
    const response = await fetch('https://narostore-backend.onrender.com/admin/generate-access-token',{
      credentials:'include'
    })
    if (response.ok) {
        const data = await response.json();
        
        setIsAuthenticated(true);
      } else {
        
       
        setIsAuthenticated(false);
      }
      }catch(err){
        setIsAuthenticated(false);
        console.log(err)
      }
    }
    generateAccessToken()
  },[])
   useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("https://narostore-backend.onrender.com/admin/generate-access-token", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Access token auto-refreshed", data);
          setIsAuthenticated(true);
        } else {
          console.warn("Auto-refresh failed ❌, user might need to log in again.");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auto-refresh error:", err);
      }
    }, 9 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);


  return (

    <>
    <Toaster
        position="bottom-center" 
        reverseOrder={false}
        toastOptions={{
        
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            padding: '24px',
            fontSize: '18px',
          },
          success: {
            duration: 3000,
            style: {
              background: 'green',
              color: '#fff',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: 'red',
              color: '#fff',
            },
          },
        }}
      />
      <div className="flex h-screen bg-gray-100">
        {!hideLayout && <Sidebar />}
        <div className="flex-1 flex flex-col">
         {!hideLayout &&<Header />} 
          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<AdminHome/>}/>
              <Route path="/admin/login" element={<Login/>}/>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/users" element={<Users />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;

import { Bell, Search, User } from "lucide-react";
import { useContext ,useState} from "react";
import AuthenticationContext from "../contextAPI/Authentication/createContext";
import { RiLogoutCircleFill } from "react-icons/ri";
import toast from "react-hot-toast";
const Header = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(AuthenticationContext)
  const [popup,setPopUp] = useState(false)
  const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:3000/admin/logout", {
      method: "POST",
      credentials: "include", 
    });

    if (res.ok) {
      console.log("Logged out successfully!");
      setIsAuthenticated(false)
      setPopUp(false)
      window.location.href = '/login'
      toast.success('Admin Logout')
    }
  } catch (err) {
    console.error("Error logging out:", err);
  }
};



  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-600" />
        <div className="flex items-center gap-2 hover:bg-amber-200 p-2 rounded-2xl cursor-pointer relative" >
          {isAuthenticated?(<>
         <div onClick={()=>setPopUp(prev=>!prev)} className="flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-amber-50"></div>
          <span className="font-medium">Admin</span>
         </div>
          
          </>):(<>
          
          <User className="text-gray-600" />
          <button onClick={()=>window.location.href='/login'}>Login</button>
          </>)}
          
          
        </div>
      
        {popup&&(
          <button className="w-26 h-15 rounded-2xl bg-blue-200 absolute top-20 right-10 flex justify-center items-center gap-3 cursor-pointer" onClick={handleLogout}><RiLogoutCircleFill size={20} /><span>LogOut</span></button>
          
          
        )}
      </div>
    </header>
  );
};

export default Header;

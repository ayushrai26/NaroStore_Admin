import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard /> },
    { name: "Products", path: "/admin/products", icon: <Package /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart /> },
    { name: "Users", path: "/admin/users", icon: <Users /> },
    
  ];

  return (
    <div className="w-64 bg-white border-r flex flex-col p-5 shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">NaroStore Admin</h2>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition 
              ${location.pathname === item.path ? "bg-blue-50 text-blue-700" : ""}`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

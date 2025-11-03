import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";
import { useEffect,useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
const DashboardCards = () => {
  const [totalUser,setTotalUser] = useState(null)
  const [totalProducts,setTotalProducts] = useState(null)
  const [totalOrders,setTotalOrders] = useState(null)
  const [totalSales,setTotalSales] = useState(null)
  const cards = [
    { title: "Total Sales", value: `₹${totalSales}`, icon: <FaRupeeSign />, color: "bg-blue-100 text-blue-700" },
    { title: "Orders", value: totalOrders, icon: <ShoppingCart />, color: "bg-green-100 text-green-700" },
    { title: "Customers", value: totalUser, icon: <Users />, color: "bg-yellow-100 text-yellow-700" },
    { title: "Products", value: totalProducts, icon: <Package />, color: "bg-purple-100 text-purple-700" },
  ];
  const fetchUsers = async () => {
    try {
    
      const response = await fetch("http://localhost:3000/admin/fetch-all-users", {
        credentials: "include",
      });

      const data = await response.json();
      console.log("Fetched data:", data);

      
      if (data?.users && Array.isArray(data.users)) {
        setTotalUser(data.users.length);
      } else {
        console.error("No users found in response:", data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products/fetch-all-products", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data)
      if (data?.allProducts) setTotalProducts(data.allProducts.length);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };
  const fetchOrders = async()=>{
    try{
    const response = await fetch('http://localhost:3000/admin/fetch-orders',{
      credentials:'include'
    })
    const data = await response.json()
    console.log(data)
    if(response.ok){
      setTotalOrders(data.orders.length)
      const sales = data.orders.reduce((sum,item)=>
        sum +item.amount,0
      )
      setTotalSales(sales)

    }
    }catch(err){
    console.log(err)
    }
  }
  useEffect(()=>{
    fetchProducts()
    fetchUsers()
    fetchOrders()
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-lg shadow flex items-center justify-between"
        >
          <div>
            <h3 className="text-gray-600">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
          <div className={`p-3 rounded-full ${card.color}`}>{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;

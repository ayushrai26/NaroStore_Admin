import { useEffect,useState } from "react";
import DashboardCards from "../components/DashboardCards";

const Dashboard = () => {
  
  const [recentOrders,setRecentOrders] = useState([])
  const fetchOrders = async()=>{
    try{
    const response = await fetch('http://localhost:3000/admin/fetch-orders',{
      credentials:'include'
    })
    const data = await response.json()
    console.log(data)
    if(response.ok){
      setRecentOrders(data.orders)
      

    }else{
      setRecentOrders([])
    }
    }catch(err){
    console.log(err)
    }
  }
  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <DashboardCards />

      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.address.Name}</td>
                <td className="py-2">{order.amount}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/fetch-orders", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data.orders)
        setOrders(data.orders || []);
      } else {
        console.error("Error fetching orders:", data.message);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update Order Status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/update-order/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ✅ Delete Order
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`http://localhost:3000/admin/delete-order/${orderId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } else {
        console.error("Failed to delete order");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-600 text-lg">
        Loading orders...
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📦 All Orders</h1>

      <div className="overflow-x-auto rounded-xl shadow bg-white ">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-300">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.address.Name}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    ₹{order.amount}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border rounded-md px-2 py-1 text-sm "
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex items-center justify-center space-x-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      {selectedOrder && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-100 rounded-xl p-6 w-[90%] md:w-[600px]">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Customer:</strong>{" "}
              {selectedOrder.address.Name || "Unknown"}
            </p>
            <p>
              <strong>Amount:</strong> ₹{selectedOrder.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.orderStatus}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul className="mt-2 list-disc list-inside space-y-2">
              {selectedOrder.items.map((item, i) => (
                <li key={i}>
                  {item.name} — x{item.quantity}
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

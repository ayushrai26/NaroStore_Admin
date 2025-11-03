import React, { useState, useEffect } from "react";
import { Edit, Trash2, UserPlus } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
    
      const response = await fetch("https://narostore-backend.onrender.com/admin/fetch-all-users", {
        credentials: "include",
      });

      const data = await response.json();
      console.log("Fetched data:", data);

      
      if (data?.users && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error("No users found in response:", data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  fetchUsers();
}, []);





  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user._id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email</th>
              <th className="py-3 px-2">Role</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id || index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 px-2">{index + 1}</td>
                <td className="py-2 px-2 font-medium">{user.fullName}</td>
                <td className="py-2 px-2 text-gray-600">{user.email}</td>
                <td className="py-2 px-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status || "Inactive"}
                  </span>
                </td>
                <td className="py-2 px-2 text-center">
                  <div className="flex justify-center gap-3">
                    
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;

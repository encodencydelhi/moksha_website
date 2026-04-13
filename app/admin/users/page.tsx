"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiMail } from "react-icons/fi";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  totalPurchases: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Replace with actual API endpoint
      const mockUsers: User[] = [
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+91-XXXXXXXXXX",
          createdAt: new Date().toISOString(),
          totalPurchases: 2,
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="w-8 h-8 border-4 border-[#8B6A3E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C1810]">Users</h1>
        <p className="text-[#5A3E2B] mt-1">Manage registered users</p>
      </div>

      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-3 text-[#8B6A3E] w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#E7D5C2] rounded-lg focus:outline-none focus:border-[#8B6A3E]"
        />
      </div>

      <div className="bg-white rounded-lg border border-[#E7D5C2] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FDF8F2] border-b border-[#E7D5C2]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Purchases
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#2C1810]">
                Joined
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[#2C1810]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7D5C2]">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-[#FDF8F2]">
                <td className="px-6 py-4 text-sm text-[#2C1810] font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-[#5A3E2B]">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-[#5A3E2B]">
                  {user.phone}
                </td>
                <td className="px-6 py-4 text-sm text-center font-medium text-[#8B6A3E]">
                  {user.totalPurchases}
                </td>
                <td className="px-6 py-4 text-sm text-[#5A3E2B]">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-[#8B6A3E] hover:text-[#2C1810]">
                    <FiMail className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

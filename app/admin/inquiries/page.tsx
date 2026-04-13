"use client";

import { useEffect, useState } from "react";
import { getAllEnquiries } from "@/lib/apiClient";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllEnquiries();
        const data = res.data;
        if (data.success) setInquiries(data.data || []);
        else setError(data.message || "Could not load inquiries");
      } catch (err: any) {
        setError(err?.response?.data?.message || "Please login as admin");
      }
    };
    load();
  }, []);

  if (error) {
    return <div className="min-h-screen p-8">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[#FDF8F2]">
      <h1 className="text-3xl font-bold mb-4">Admin Inquiries</h1>
      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq._id} className="p-4 bg-white rounded shadow">
            <p>
              <strong>
                {inq.firstName} {inq.lastName}
              </strong>{" "}
              – {inq.email}
            </p>
            <p>{inq.subject || "No subject"}</p>
            <p className="text-sm text-gray-600">{inq.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

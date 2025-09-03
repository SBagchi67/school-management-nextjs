"use client";
// Needed because we are using hooks like useState and useEffect

import { useEffect, useState } from "react";

export default function ShowSchools() {
  // State to hold schools data
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch schools when page loads
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/getSchools"); // call API
        const data = await res.json(); // convert to JSON
        setSchools(data); // save to state
        setLoading(false); // stop loading
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchSchools();
  }, []); // empty [] → runs only once when page first loads

  // Show loading text while fetching data
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading schools...</p>;
  }

  // Render grid of schools
  return (
    <div style={{ padding: "20px", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Schools List</h1>

      {/* Grid container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {schools.map((school) => (
          <div
            key={school.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* Image */}
            {school.image && (
              <img
                src={`/schoolImages/${school.image}`}
                alt={school.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            )}

            {/* Name, Address, City */}
            <h3 style={{ margin: "10px 0 5px", color: "#222" }}>
              {school.name}
            </h3>
            <p style={{ margin: "0", color: "#555" }}>{school.address}</p>
            <p style={{ margin: "0", fontSize: "14px", color: "#777" }}>
              {school.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

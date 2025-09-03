export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to School Management</h1>
      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        Choose an option below:
      </p>

      <div style={{ marginTop: "20px" }}>
        <a
          href="/addSchool"
          style={{
            margin: "10px",
            padding: "12px 20px",
            background: "#0070f3",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          ➕ Add School
        </a>
        <a
          href="/showSchools"
          style={{
            margin: "10px",
            padding: "12px 20px",
            background: "#28a745",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          📋 Show Schools
        </a>
      </div>
    </div>
  );
}

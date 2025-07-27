const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// 🔐 Login user
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

// 📝 Register user
export const registerUser = async (formData) => {
  const res = await fetch(`${API_BASE}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

// 🩸 Search donors
export const searchDonors = async (bloodGroup, location, token) => {
  const res = await fetch(
    `${API_BASE}/api/users/search?bloodGroup=${encodeURIComponent(bloodGroup)}&location=${encodeURIComponent(location)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ API Error:", errorText);
    throw new Error("Search failed" + res.status + " " + errorText);
  }

  return res.json();
};

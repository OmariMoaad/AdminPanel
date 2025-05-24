import { useState } from "react";

type User = {
  id: string;
  role: "admin" | "viewer";
};

type Props = {
  onLoginSuccess: (user: User) => void;
};

export default function LoginPage({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        return;
      }

      const { access_token } = await res.json();

      // Store token
      localStorage.setItem("token", access_token);

      // Decode token (JWT payload is base64-encoded JSON)
      const base64Payload = access_token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));

      const user: User = {
        id: payload.sub,
        role: payload.role,
      };

      onLoginSuccess(user);
    } catch (err) {
      setError("Login error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-4 py-2 w-80"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-4 py-2 w-80"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Login
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

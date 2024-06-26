import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorDetail = await response.text();
        console.error("Response not OK:", errorDetail);
        setError("Failed to log in: " + errorDetail);
        return;
      }

      console.log("Login successful");
      navigate("/home");
    } catch (e) {
      console.error("Error during fetch operation:", e);
      setError("Could not log in. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="please enter at most 20 characters"
          value={username}
          maxLength={20}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          maxLength={15}
          placeholder="please enter at most 15 characters"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Login;

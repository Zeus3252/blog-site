import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (password != confirmPassword)
        setError("Password and confirm password do not match");
      e.preventDefault();
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      navigate("/home");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username" />
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
        <label htmlFor="password" />
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
        <label htmlFor="confirm-password" />
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          value={confirmPassword}
          maxLength={15}
          placeholder="please reenter your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default SignUp;

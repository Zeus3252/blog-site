import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <p>Home</p>
      <p>Login</p>
      <p onClick={() => navigate("/signup")}>Signup</p>
    </div>
  );
};

export default NavBar;

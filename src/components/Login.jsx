import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPAssword] = useState(false);

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPAssword(!showPassword);
  };

  const loginToCrane = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = user;
    console.log(email, password);
    const data = await fetch("http://localhost:5000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await data.json();
    console.log(response);
    if (response.error) {
      toast.error(response.message);
    } else {
      localStorage.setItem("loginDone", true);
      navigate("/home");
      toast.success("Welcome to Crane");
    }
    setLoading(false);
  };

  return (
    <div className="login d-flex flex-column">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
        alt="logo"
      ></img>
      <h2 className="m-0 text-center">We are The Crane Team</h2>

      <form action="" onSubmit={loginToCrane}>
        <h3>Please login to your account</h3>
        <TextField
          id="outlined-textarea"
          className="outlined-textarea"
          label="Username"
          type="email"
          placeholder="Enter your email here"
          name="email"
          value={user.email}
          onChange={handleInput}
          required
          autoComplete="off"
        />
        <TextField
          id="outlined-adornment-password"
          className="outlined-adornment-password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password here"
          name="password"
          value={user.password}
          onChange={handleInput}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <span className="forgot-password">Forgot Password?</span>
        <ToggleButton
          value="Sign In"
          className="sign-button"
          sx={{ width: "55%", margin: "auto", height: 40 }}
          aria-label="list"
          type="submit"
        >
          {loading ? "please wait..." : "Sign In"}
        </ToggleButton>
        <div className="divider d-flex align-items-center ">
          <p className="text-center fw-bold mx-3  text-muted">OR</p>
        </div>

        <ToggleButton
          value="Sign In"
          className="google-button"
          sx={{
            width: "100%",
            margin: "auto",
            height: 40,
            backgroundColor: "white",
          }}
          aria-label="list"
          type="button"
        >
          <FcGoogle className="mr-2" size={18} /> Continue with Google
        </ToggleButton>

        <div className="flex-center pt-4 ">
          <p className="mr-2">Don't have an account?</p>
          <Button
            className="create-new-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Create new
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;

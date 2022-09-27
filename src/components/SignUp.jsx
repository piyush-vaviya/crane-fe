import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputAdornment, TextField, ToggleButton } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
import { BiLock } from "react-icons/bi";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const signUpToCrane = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, passwordConfirm } = user;
    if (!password === passwordConfirm) {
      setLoading(false);
      return toast.error("password not matched, try again!");
    }

    const data = await fetch("http://localhost:5000/api/v1/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    });
    const response = await data.json();

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("signUp completed, Now you can login");
      setUser({ userName: "", email: "", password: "", passwordConfirm: "" });
    }
    setLoading(false);
  };

  return (
    <div className="sign-up d-flex flex-column">
      <form action="" onSubmit={signUpToCrane}>
        <h2>Get started with free account</h2>
        <TextField
          id="sign-username"
          className="outlined-textarea"
          label="Username"
          type="text"
          name="name"
          value={user.name}
          onChange={handleInput}
          placeholder="Username"
          required
          autoFocus
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiUserCheck size={22} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="sign-email"
          className="outlined-textarea"
          label="Email"
          type="email"
          placeholder="Email Address"
          name="email"
          value={user.email}
          onChange={handleInput}
          required
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineEmail size={22} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="sign-password"
          className="outlined-textarea"
          label="Password"
          type="password"
          placeholder="Your Password"
          name="password"
          value={user.password}
          onChange={handleInput}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLock size={22} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="sign-confirm-password"
          className="outlined-textarea"
          label="confirm Password"
          type="password"
          placeholder="Enter Password Again"
          name="passwordConfirm"
          value={user.passwordConfirm}
          onChange={handleInput}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLock size={22} />
              </InputAdornment>
            ),
          }}
        />
        <ToggleButton
          value="Sign In"
          className="sign-button"
          sx={{ width: "55%", margin: "auto", height: 40 }}
          aria-label="list"
          type="submit"
        >
          {loading ? "please wait..." : "Sign Up"}
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
          <p className="mr-2">Have already an account?</p>
          <span
            className="login-here-btn text-decoration-underline cursor-pointer fw-bold"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Login Here
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

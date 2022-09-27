import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const isLogged = localStorage.getItem("loginDone");
  return isLogged ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;

import { useAuth } from "Auth/Auth";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let auth = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    auth.signIn(email, pass).then(() => {
      navigate(from, { replace: true });
    });
  }
  if (auth.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="container-fluid p-3">
      <div className="card">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              value={email}
              className="form-control"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              value={pass}
              className="form-control"
              placeholder="Password"
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

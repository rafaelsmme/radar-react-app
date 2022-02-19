import { useAuth } from "Auth/Auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let auth = useAuth();
  const [pass, setPass] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    auth.signIn(pass, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div className="container-fluid p-3">
      <div className="card">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="password"
              value={pass}
              className="form-control"
              id="floatingPassword"
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

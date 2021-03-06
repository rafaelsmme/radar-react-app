import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "Auth/Auth";
import { useState } from "react";

function Nav({ title, disableAdd }) {
  const [show, setShow] = useState(false);
  const auth = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          <FontAwesomeIcon icon={faBroadcastTower} size="lg" className="mr-3" />
          {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${show ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mr-2">
              <Link
                to="/add"
                className={`btn ${
                  disableAdd ? "btn-secondary" : "btn-primary"
                } btn-sm`}
                disabled={disableAdd}
                type="button"
              >
                <FontAwesomeIcon icon={faPlus} /> add new task
              </Link>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-primary btn-sm`}
                type="button"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

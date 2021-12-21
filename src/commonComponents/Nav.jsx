import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroadcastTower,
  faCalendarPlus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import config from "globalConfig.json";

function Nav({ title, disableAdd }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          <FontAwesomeIcon icon={faBroadcastTower} size="lg" className="mr-3" />
          {title}
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item text-light">{config.apiUrl}</li>
          </ul>
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
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
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

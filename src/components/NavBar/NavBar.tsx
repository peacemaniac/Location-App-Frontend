import { Link } from "react-router-dom";

import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Travel App</Link>
      <form
        id="search-form"
        role="search"
        action="/search"
        className="input-group"
      >
        <input
          aria-label="Search locations"
          placeholder="Search"
          type="search"
          name="q"
          required
        />
        <input type="submit" value="Search" className="btn btn-secondary" />
      </form>
      <Link to="/create" className="btn btn-primary">
        Create Location
      </Link>
    </nav>
  );
}

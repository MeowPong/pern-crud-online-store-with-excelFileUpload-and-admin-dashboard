function Navbar() {
  return (
    <nav className="main-header navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/home">
                <i className="fas fa-home me-2"></i>Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                <i className="fas fa-envelope me-2"></i>Contact
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {/* Search Icon */}
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#navbarSearch" role="button" aria-expanded="false" aria-controls="navbarSearch">
                <i className="fas fa-search"></i>
              </a>
            </li>
            {/* Notifications Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="far fa-bell"></i>
                <span className="badge bg-danger">3</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">New Message</a></li>
                <li><a className="dropdown-item" href="#">New Notification</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">See all notifications</a></li>
              </ul>
            </li>
            {/* User Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-user-circle me-2"></i>Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

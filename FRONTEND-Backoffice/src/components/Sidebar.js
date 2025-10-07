import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../config";

function Sidebar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + '/user/info', config.headers());
      if (res.data.result) {
        setUser(res.data.result);
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error',
      });
    }
  };

  const handleSignOut = async () => {
    const button = await Swal.fire({
      title: 'Sign out?',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (button.isConfirmed) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="brand-link text-center">
        <span className="brand-text font-weight-medium fs-4">BackOffice</span>
      </div>

      <div className="sidebar">
        {/* User Panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
          <div className="image">
            <img src="dist/img/catImage.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a href="#" className="d-block">{user.name}</a>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-header">MAIN MENU</li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product" className="nav-link">
                <i className="nav-icon fa fa-box"></i>
                <p>Products</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/billSale" className="nav-link">
                <i className="nav-icon fa fa-chart-bar"></i>
                <p>Sales Report</p>
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleSignOut} className="btn btn-danger w-100" style={{ marginTop: '22rem' }}>
                <i className="fa fa-sign-out-alt me-2"></i>Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

import BackOffice from "../../components/BackOffice";

function Home() {
  return (
    <BackOffice>
      <div className="container-fluid mt-4">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Welcome to the Admin Dashboard</h3>
                <p className="card-text">Here you can manage products, view sales reports, and more!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div className="card bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">Total Sales</h5>
                <p className="card-text">1,234,567 Baht</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Products Sold</h5>
                <p className="card-text">567 Products</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <h5 className="card-title">Pending Orders</h5>
                <p className="card-text">45 Orders</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div className="card bg-danger text-white">
              <div className="card-body">
                <h5 className="card-title">Canceled Orders</h5>
                <p className="card-text">12 Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Recent Activities</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="badge bg-primary me-2">New</span>
                    Product "XYZ" has been added to the inventory.
                  </li>
                  <li className="list-group-item">
                    <span className="badge bg-success me-2">Completed</span>
                    Order #12345 has been successfully processed.
                  </li>
                  <li className="list-group-item">
                    <span className="badge bg-warning me-2">Pending</span>
                    Order #12346 is awaiting payment confirmation.
                  </li>
                  <li className="list-group-item">
                    <span className="badge bg-danger me-2">Canceled</span>
                    Order #12347 was canceled due to stock unavailability.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackOffice>
  );
}

export default Home;

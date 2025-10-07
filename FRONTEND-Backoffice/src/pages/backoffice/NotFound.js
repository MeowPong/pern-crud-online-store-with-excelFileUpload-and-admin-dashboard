import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4">Oops! Page Not Found</h2>
        <p className="lead mb-4">Sorry, the page you are looking for might have been moved or deleted.</p>
        <Link to="/home" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page section">
      <div className="container empty-state">
        <div className="empty-icon">🐕</div>
        <h1>Page not found</h1>
        <p>The page you're sniffing for isn't here. Let's get you back on track.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
}

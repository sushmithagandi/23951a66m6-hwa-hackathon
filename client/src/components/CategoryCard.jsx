import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <img src={category.image} alt={category.name} loading="lazy" />
      <div className="category-overlay" />
      <div className="category-content">
        <span className="category-icon">{category.icon}</span>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </Link>
  );
}

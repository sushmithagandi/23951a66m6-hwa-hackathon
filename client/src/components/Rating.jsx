export default function Rating({ value = 0, reviews }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.round(value);
    return <span key={i} className={filled ? 'star filled' : 'star'}>★</span>;
  });
  return (
    <div className="rating" aria-label={`Rated ${value} out of 5`}>
      <span className="stars">{stars}</span>
      <span className="rating-value">{value.toFixed(1)}</span>
      {typeof reviews === 'number' && <span className="rating-reviews">({reviews})</span>}
    </div>
  );
}

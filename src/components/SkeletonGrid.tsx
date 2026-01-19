export default function SkeletonGrid() {
  return (
    <div className="skeleton-grid" aria-live="polite" aria-busy="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}

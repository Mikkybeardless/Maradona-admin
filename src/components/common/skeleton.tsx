export function LoadingSkeleton() {
  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 animate-pulse">
      <div className="h-6 bg-gray-300 mb-4 rounded"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded"></div>
      <div className="h-5 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}

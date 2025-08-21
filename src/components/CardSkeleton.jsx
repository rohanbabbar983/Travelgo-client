export default function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-4 ring-1 ring-gray-200 shadow-sm">
      <div className="h-40 w-full rounded-lg bg-gray-200" />
      <div className="mt-4 h-5 w-3/5 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-2/5 rounded bg-gray-200" />
      <div className="mt-3 h-4 w-4/5 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
      <div className="mt-4 h-9 w-28 rounded-lg bg-gray-200" />
    </div>
  );
}

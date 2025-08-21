export default function EmptyState({ note = "Nothing to show here yet." }) {
  return (
    <div className="col-span-full rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white ring-1 ring-gray-200">
        <svg width="20" height="20" viewBox="0 0 24 24" className="text-gray-400" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 11H7v-2h6V7h2v4h4v2h-4v4h-2v-4Z" />
        </svg>
      </div>
      <p className="mt-3 text-sm text-gray-600">{note}</p>
    </div>
  );
}

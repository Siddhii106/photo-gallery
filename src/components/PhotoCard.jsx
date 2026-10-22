export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <img
        src={`https://picsum.photos/id/${photo.id}/600/400`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="h-48 w-full object-cover"
      />
      <div className="flex items-center justify-between p-3">
        <p className="truncate text-sm font-medium text-gray-700">{photo.author}</p>
        <button
          onClick={() => onToggle(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className="transition hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${isFavourite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-400'}`}
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
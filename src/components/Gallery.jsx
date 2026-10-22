import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id })
  }, [])

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(q))
  }, [photos, query])

  let content
  if (loading) {
    content = (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500" />
      </div>
    )
  } else if (error) {
    content = <p className="py-20 text-center text-red-600">{error}</p>
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.includes(photo.id)}
            onToggle={toggleFavourite}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by author name..."
        className="mb-6 w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-indigo-500 focus:outline-none"
      />
      {content}
    </div>
  )
}
export const STORAGE_KEY = 'favourites'

export function loadFavourites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    }
    default:
      return state
  }
}
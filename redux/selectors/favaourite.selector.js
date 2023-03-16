export const checkFavourite = (id) => (state) => state.favourites.data[id]
export const selectFavourites = (state) => Object.values(state.favourites.data)
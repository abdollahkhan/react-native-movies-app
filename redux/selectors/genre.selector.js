export const selectAllgenre = (state) => state.genres?.data

export const selectGenreByIds = (ids) => (state) =>
  ids?.map((id) => state.genres?.data?.[id]?.name)

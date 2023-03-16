export const checkSeletedGenre = (id) => (state) => {
  return state.filters.data.genre?.[id]
}
export const selectSortFilter = (state) => state.filters.data.sort
export const selectYearFilter = (state)=>state.filters.data.year
export const selectRuntimeToFilter = (state)=>state.filters.data.runtime.to
export const selectRuntimeFromFilter = (state)=>state.filters.data.runtime.from
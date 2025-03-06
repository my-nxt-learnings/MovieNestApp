import React from 'react'

const statusConstants = {
  loading: 'ISLOADING',
  success: 'SUCCESS',
  failure: 'Failure',
}

const SearchContext = React.createContext({
  searchInput: '',
  onChangeSearchValue: () => {},
  searchPageStatus: statusConstants.loading,
  searchResponse: [],
  onClickSearchButton: () => {},
})

export default SearchContext

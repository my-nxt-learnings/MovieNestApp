import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import SearchContext from '../../context/SearchContext'
import MovieCard from '../MovieCard'
import Header from '../Header'
import FailureView from '../FailureView'
import EmptyView from '../EmptyView'
import Pagination from '../Pagination'

import './index.css'

const statusConstants = {
  loading: 'ISLOADING',
  success: 'SUCCESS',
  failure: 'Failure',
}

const SearchRoute = () => (
  <SearchContext.Consumer>
    {value => {
      const {
        searchInput,
        searchResponse,
        searchPageStatus,
        onClickSearchButton,
      } = value

      if (searchInput === '') {
        return <Redirect to="/" />
      }

      const renderSuccessView = () => {
        const {results} = searchResponse

        if (!results.length) {
          return <EmptyView />
        }
        return (
          <div className="search-body">
            <ul className="search-cards-body">
              {results.map(eachMovie => (
                <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
              ))}
            </ul>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onClickSearchButton}
            />
          </div>
        )
      }

      const renderLoadingView = () => (
        <div className="loader-container">
          <Loader type="TailSpin" color="#032541" />
        </div>
      )

      const renderSearchView = () => {
        switch (searchPageStatus) {
          case statusConstants.success:
            return renderSuccessView()
          case statusConstants.failure:
            return <FailureView />
          case statusConstants.loading:
            return renderLoadingView()
          default:
            return null
        }
      }

      return (
        <>
          <Header />
          {renderSearchView()}
        </>
      )
    }}
  </SearchContext.Consumer>
)

export default SearchRoute

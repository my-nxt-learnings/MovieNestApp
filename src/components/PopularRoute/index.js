import React from 'react'
import Loader from 'react-loader-spinner'
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

class PopularRoute extends React.Component {
  state = {
    popularPageStatus: statusConstants.loading,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = 'f1f789c85412506a33109dee90730767'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({
      popularPageStatus: statusConstants.success,
      popularMovieResponse: newData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderSuccessView = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse
    if (!results.length) {
      return <EmptyView />
    }
    return (
      <div className="cards-body">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </div>
    )
  }

  renderPopularView = () => {
    const {popularPageStatus} = this.state
    switch (popularPageStatus) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.failure:
        return <FailureView />
      case statusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {popularMovieResponse} = this.state
    console.log(this.props)
    return (
      <div>
        <Header />
        <div className="popular-body">
          <div>{this.renderPopularView()}</div>
          <Pagination
            totalPages={popularMovieResponse.totalPages}
            apiCallback={this.getPopularMoviesResponse}
          />
        </div>
      </div>
    )
  }
}

export default PopularRoute

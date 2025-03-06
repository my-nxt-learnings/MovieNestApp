import React from 'react'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import EmptyView from '../EmptyView'
import Header from '../Header'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

const statusConstants = {
  loading: 'ISLOADING',
  success: 'SUCCESS',
  failure: 'Failure',
}

class UpcomingRoute extends React.Component {
  state = {
    upcomingPageStatus: statusConstants.loading,
    upcomingMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse()
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

  getUpcomingMoviesResponse = async (page = 1) => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({
      upcomingPageStatus: statusConstants.success,
      upcomingMovieResponse: newData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderSuccessView = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse
    if (!results.length) {
      return <EmptyView />
    }
    return (
      <ul className="up-cards-body">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  renderUpcomingView = () => {
    const {upcomingPageStatus} = this.state
    switch (upcomingPageStatus) {
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
    const {upcomingMovieResponse} = this.state

    return (
      <>
        <Header />
        <div className="up-body">
          <div>{this.renderUpcomingView()}</div>
          <Pagination
            totalPages={upcomingMovieResponse.totalPages}
            apiCallback={this.getUpcomingMoviesResponse}
          />
        </div>
      </>
    )
  }
}

export default UpcomingRoute

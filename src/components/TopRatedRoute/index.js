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

class TopRatedRoute extends React.Component {
  state = {
    topPageStatus: statusConstants.loading,
    topRatedMovieResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMoviesResponse()
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

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({
      topPageStatus: statusConstants.success,
      topRatedMovieResponse: newData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderSuccessView = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse
    if (!results.length) {
      return <EmptyView />
    }
    return (
      <ul className="top-cards-body">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  renderTopView = () => {
    const {topPageStatus} = this.state
    switch (topPageStatus) {
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
    const {topRatedMovieResponse} = this.state

    return (
      <>
        <Header />
        <div className="top-body">
          <div>{this.renderTopView()}</div>
          <Pagination
            totalPages={topRatedMovieResponse.totalPages}
            apiCallback={this.getTopRatedMoviesResponse}
          />
        </div>
      </>
    )
  }
}

export default TopRatedRoute

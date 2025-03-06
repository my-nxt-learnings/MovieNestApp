import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import MovieDetailRoute from '../MovieDetailRoute'

import './index.css'

const statusConstants = {
  loading: 'ISLOADING',
  success: 'SUCCESS',
  failure: 'Failure',
}

class SingleMovieRoute extends Component {
  state = {
    singleMovieStatus: statusConstants.loading,
    movieResponse: {},
    castResponse: [],
  }

  componentDidMount() {
    this.getMoviesAndCastResponse()
  }

  onSuccessFetch = (movieData, castData) => {
    const finalMovieData = {
      movieImageUrl: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
      title: movieData.title,
      description: movieData.overview,
      releaseDate: movieData.release_date,
      rating: movieData.vote_average,
    }

    const finalCastData = castData.map(each => ({
      name: each.name,
      profileUrl: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
    }))
    this.setState({
      singleMovieStatus: statusConstants.success,
      movieResponse: finalMovieData,
      castResponse: finalCastData,
    })
  }

  getMoviesAndCastResponse = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = 'f1f789c85412506a33109dee90730767'
    const movieFetchResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    )
    const castFetchResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
    )
    console.log(movieFetchResponse, castFetchResponse)

    const movieData = await movieFetchResponse.json()
    const castData = await castFetchResponse.json()

    if (movieFetchResponse.ok && castFetchResponse.ok) {
      this.onSuccessFetch(movieData, castData.cast)
    } else {
      this.setState({singleMovieStatus: statusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderSuccessView = () => {
    const {movieResponse, castResponse} = this.state

    return (
      <div className="single-page-body">
        <h1>Movie Details</h1>
        <MovieDetailRoute movieResponse={movieResponse} />
        <h1>Cast Details</h1>
        <div className="cast-cards-body">
          {castResponse.map(each => {
            const {name, profileUrl} = each
            return (
              <div key={each.name} className="cast-card">
                <img src={profileUrl} alt={name} className="profile-image" />
                <h1 className="cast-name">{name.slice(0, 10)}</h1>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderSingleMovieView = () => {
    const {singleMovieStatus} = this.state
    switch (singleMovieStatus) {
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
    return (
      <div>
        <Header />
        {this.renderSingleMovieView()}
      </div>
    )
  }
}

export default SingleMovieRoute

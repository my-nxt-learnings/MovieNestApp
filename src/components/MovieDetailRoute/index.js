import './index.css'
import {BsHeartFill} from 'react-icons/bs'

const MovieDetailRoute = props => {
  const {movieResponse} = props
  const {movieImageUrl, rating, releaseDate, description, title} = movieResponse
  const newRating = rating.toString().slice(0, 3)

  return (
    <div className="movie-detail-card">
      <img
        src={movieImageUrl}
        alt="movieDetail"
        className="movie-details-image"
      />
      <div className="details-card">
        <div className="head-logo">
          <h1 className="details-heading">{title}</h1>
          <div className="rating-heart-details">
            <BsHeartFill className="details-heart-logo" />
            <span className="details-movie-rating">Rating: {newRating}</span>
          </div>
        </div>
        <p className="details-description">{description}</p>
        <p className="release-date">
          <b>Released on</b>: {releaseDate}
        </p>
      </div>
    </div>
  )
}

export default MovieDetailRoute

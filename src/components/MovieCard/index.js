import {Link} from 'react-router-dom'
import {BsHeartFill} from 'react-icons/bs'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <div className="movie-card-container">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div className="views-visit">
        <div className="title-rating">
          <h1 className="movie-title">{title}</h1>
          <div className="rating-heart">
            <BsHeartFill className="heart-logo" />{' '}
            <span className="movie-rating">Rating: {voteAverage}</span>
          </div>
        </div>
        <Link to={`/movie/${id}`}>
          <button className="view-button" type="button">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MovieCard

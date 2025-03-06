import {Link, withRouter} from 'react-router-dom'

// import {BsSearch} from 'react-icons/bs'

import SearchContext from '../../context/SearchContext'

import './index.css'

const Header = props => {
  const renderSearchBar = () => (
    <SearchContext.Consumer>
      {value => {
        const {searchInput, onChangeSearchValue, onClickSearchButton} = value

        const onChangeHandler = event => {
          onChangeSearchValue(event.target.value)
        }

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onClickSearchButton()
          history.push(`/search`)
        }

        return (
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="searchButton"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )

  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <h1 className="page-logo">movieDB</h1>
      </div>
      <div className="nav-content">
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <h1 className="head">Popular</h1>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/top-rated">
              <h1 className="head">Top Rated</h1>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upcoming">
              <h1 className="head">Upcoming</h1>
            </Link>
          </li>
        </ul>
      </div>
      {renderSearchBar()}
    </nav>
  )
}

export default withRouter(Header)

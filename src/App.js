import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
// import Header from './components/Header'
import SearchRoute from './components/SearchRoute'
import PopularRoute from './components/PopularRoute'
import TopRatedRoute from './components/TopRatedRoute'
import UpcomingRoute from './components/UpcomingRoute'
import SingleMovieRoute from './components/SingleMovieRoute'
import SearchContext from './context/SearchContext'

const statusConstants = {
  loading: 'ISLOADING',
  success: 'SUCCESS',
  failure: 'Failure',
}

class App extends Component {
  state = {
    searchInput: '',
    searchPageStatus: statusConstants.loading,
    searchResponse: [],
  }

  onChangeSearchValue = value => {
    this.setState({searchInput: value})
  }

  onSuccess = data => {
    const searchedData = {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(eachMovie => ({
        id: eachMovie.id,
        posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
        voteAverage: eachMovie.vote_average,
        title: eachMovie.title,
      })),
    }
    this.setState({
      searchPageStatus: statusConstants.success,
      searchResponse: {...searchedData},
    })
  }

  onClickSearchButton = async (page = 1) => {
    const {searchInput} = this.state
    const apiKey = 'f1f789c85412506a33109dee90730767'
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${page}`,
    )
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok) {
      this.onSuccess(fetchedData)
    } else {
      this.setState({searchPageStatus: statusConstants.failure})
    }
  }

  render() {
    const {searchInput, searchResponse, searchPageStatus} = this.state

    return (
      <SearchContext.Provider
        value={{
          searchInput,
          searchResponse,
          searchPageStatus,
          onChangeSearchValue: this.onChangeSearchValue,
          onClickSearchButton: this.onClickSearchButton,
        }}
      >
        <Switch>
          <Route exact path="/" component={PopularRoute} />
          <Route exact path="/search" component={SearchRoute} />
          <Route exact path="/top-rated" component={TopRatedRoute} />
          <Route exact path="/upcoming" component={UpcomingRoute} />
          <Route exact path="/movie/:id" component={SingleMovieRoute} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App

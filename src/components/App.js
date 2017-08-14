import React from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import '../App.css'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import MainPage from './MainPage'

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => {this.setState({books})})
	}

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<MainPage books={this.state.books}/>
				)}/>

				<Route exact path="/search" component={SearchPage} />
			</div>
		)
	}
}

export default BooksApp
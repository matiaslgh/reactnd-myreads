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

	handleShelfChange = (book, shelf) => {
		const bookIndex = this.state.books.findIndex(b => b.id === book.id)
		//First, update the state and then update the books in the server
		if (bookIndex !== -1) {
			this.setState(state => {
				state.books[bookIndex].shelf = shelf
				return state
			})
		} else {
			this.setState(state => {
				state.books.push(book)
				return state
			})
		}

		//Update books in the server, if there is an error reload books, if not do nothing
		BooksAPI.update(book, shelf).then(()=>{}, error => {
			console.error(`There was an error trying to update the book with id=${book.id} with shelf=${shelf}`)
			BooksAPI.getAll().then(books => {this.setState({books})})
		})
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => {this.setState({books})})
	}

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<MainPage books={this.state.books} handleShelfChange={this.handleShelfChange}/>
				)}/>

				<Route exact path="/search" render={() => (
					<SearchPage books={this.state.books} handleShelfChange={this.handleShelfChange}/>
				)} />
			</div>
		)
	}
}

export default BooksApp
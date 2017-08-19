import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import * as BooksAPI from '../utils/BooksAPI'
import BooksGrid from './BooksGrid'

class SearchPage extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		handleShelfChange: PropTypes.func.isRequired
	}

	state = {
		results: []
	}

	search = debounce(query => {
		if (!query) {
			this.setState({results: []})
			return
		}

		BooksAPI.search(query).then(results => {
			if (results && !results.error) {
				this.setState({results: this.updateSelectedShelves(results)})
			} else {
				this.setState({results: []})
			}
		})
	}, 300)

	updateSelectedShelves = books => {
		return books.map(book => {
			const bookInShelf = this.props.books.find(b => b.id === book.id)
			if (bookInShelf) {
				return bookInShelf
			}
			book.shelf = 'none'
			return book
		})
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={e => this.search(e.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">
					<BooksGrid books={this.state.results} handleShelfChange={this.props.handleShelfChange} />
				</div>
			</div>
		)
	}
}

export default SearchPage
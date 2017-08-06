import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchPage extends Component {

	state = {
		results: []
	}

	search = debounce(query => {
		if (!query) {
			this.setState({results: []})
			return
		}

		BooksAPI.search(query).then(results => {
			this.setState(() => results && !results.error ? {results} : {results: []})
		})
	}, 300)

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
					<BooksGrid books={this.state.results} />
				</div>
			</div>
		)
	}
}

export default SearchPage
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import debounce from 'lodash.debounce'
import * as BooksAPI from '../utils/BooksAPI'
import { hashCode } from '../utils/general'
import BooksGrid from './BooksGrid'

class SearchPage extends Component {
	constructor(props) {
		super(props)
		this.state.query = this.getQueryFromURL()
		this.backButtonPressed = false //TODO: Check if using a class property instead of the state is ok
	}

	static propTypes = {
		books: PropTypes.array.isRequired,
		handleShelfChange: PropTypes.func.isRequired
	}

	state = {
		firstRender: true,
		results: [],
		query: '',
		resultsHash: 0 //identify all the results with an unique value
	}

	getQueryFromURL = () => {
		const query = queryString.parse(location.search).query
		return query ? query : ''
	}

	handleQuery = query => {
		this.setState({ query })
		this.search(query)
	}

	search = debounce(query => {
		if (!query) {
			this.setState({
				results: [],
				resultsHash: 0
			})
			this.updateUrl(query, 0)
			return
		}

		BooksAPI.search(query).then(results => {
			if (results && !results.error) {
				const hash = this.getUniqueHash(results)
				this.updateUrl(query, hash)
				this.setState({
					results: this.updateSelectedShelves(results),
					resultsHash: hash
				})
			} else {
				this.updateUrl(query, 0)
				this.setState({
					results: [],
					resultsHash: 0
				})
			}
		})
	}, 300)

	updateUrl = (query, hash) => {
		if (!this.backButtonPressed) {
			const url = query ? `/search?query=${query}` : '/search'
			if (hash !== this.state.resultsHash) {
				window.history.pushState(null, null, url);
			} else {
				window.history.replaceState(null, null, url);
			}
		} else {
			this.backButtonPressed = false
		}
	}

	getUniqueHash = results => results.reduce((hash, book) => hash + hashCode(book.id), 0)

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

	onBackButtonEvent = e => {
		const query = this.getQueryFromURL()
		this.backButtonPressed = true
		this.handleQuery(query)
	}

	componentDidMount() {
		window.onpopstate = this.onBackButtonEvent

		if (this.state.firstRender && this.state.query !== '') {
			this.search(this.state.query)
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={e => this.handleQuery(e.target.value)}
						/>
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
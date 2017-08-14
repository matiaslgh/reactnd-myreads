import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class MainPage extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired
	}

	filterByShelf = (shelf) => {
		return this.props.books.filter(book => book.shelf === shelf)
	}

	render() {
		return(
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>

						<Bookshelf title="Currently Reading" books={this.filterByShelf('currentlyReading')}/>

						<Bookshelf title="Want to Read" books={this.filterByShelf('wantToRead')}/>

						<Bookshelf title="Read" books={this.filterByShelf('read')}/>

					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}

export default MainPage
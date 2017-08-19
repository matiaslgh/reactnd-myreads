import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class MainPage extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		handleShelfChange: PropTypes.func.isRequired
	}

	filterByShelf = (shelf) => {
		return this.props.books.filter(book => book.shelf === shelf)
	}

	render() {
		const { handleShelfChange } = this.props

		return(
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>

						<Bookshelf title="Currently Reading" books={this.filterByShelf('currentlyReading')} handleShelfChange={handleShelfChange}/>

						<Bookshelf title="Want to Read" books={this.filterByShelf('wantToRead')} handleShelfChange={handleShelfChange}/>

						<Bookshelf title="Read" books={this.filterByShelf('read')} handleShelfChange={handleShelfChange}/>

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
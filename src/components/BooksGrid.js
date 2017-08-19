import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BooksGrid = props => {
	return (
		<ol className="books-grid">
			{props.books.map(book => (
				<li key={book.id}><Book book={book} handleShelfChange={props.handleShelfChange}/></li>
			))}
		</ol>
	)
}

BooksGrid.propTypes = {
	books: PropTypes.array.isRequired,
	handleShelfChange: PropTypes.func.isRequired
}

export default BooksGrid
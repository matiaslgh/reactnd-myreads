import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		handleShelfChange: PropTypes.func.isRequired
	}

	render() {
		const { book, handleShelfChange } =  this.props
		const imageUrl = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : '/images/no_cover_thumb.png'

		return (
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{ width: 128, height: 193, background: `black url("${imageUrl}") no-repeat center center`}}>
					</div>
					<div className="book-shelf-changer">
						<select value={book.shelf} onChange={e => handleShelfChange(book, e.target.value)}>
							<option disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">
					{book.title}
				</div>
				<div className="book-authors">
					{book.authors ? book.authors.join(', ') : ''}
				</div>
			</div>
		)
	}
}

export default Book
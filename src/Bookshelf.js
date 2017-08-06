import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class Bookshelf extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired
	}

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					 <BooksGrid books={this.props.books} />
				</div>
			</div>
		)
	}
}

export default Bookshelf
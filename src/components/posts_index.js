import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
	
	componentDidMount() {
		// called after component has appeared in DOM the first time
		this.props.fetchPosts();
	}

	renderPosts() {
		
		// need to use lodash as props is now an object
		return _.map(this.props.posts, post => {
				return (
					<li className="list-group-item" key={post.id}>
						{post.title}
					</li>
				);
			});
	}

	render() {
		// console.log(this.props.posts);
		return (
			<div>
				<div className="text-xs-right">
					<Link className="btn btn-primary" to="/posts/new">
						Add a post
					</Link>
				</div>
				<h3>Posts Index</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

// this allows us to access redux app state from this component
function mapStateToProps(state) {
	return (
		{ posts: state.posts }
	);
}

export default connect(mapStateToProps, { fetchPosts } )(PostsIndex);
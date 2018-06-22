import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { createPost } from '../actions';

// import { Link } from 'react-router-dom';

class PostsNew extends Component {

	// {...field.input} applies a bunch of properties from field to JSX
	renderField(field) {

		const { meta } = field;
		const fieldClassName = `form-group ${meta.touched && meta.error ? 'has-danger': ''}`;
		return (
			<div className={fieldClassName}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{meta.touched ? meta.error: ''}
				</div>
			</div>
		);
	}

	// this is run after redux-form says everything is AOK
	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});

	}

	render() {

		// access prop added by redux-form
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={ 
				handleSubmit(this.onSubmit.bind(this))
			}>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button
					type="submit"
					className="btn btn-primary"
				>Submit</button>

				<Link
					to="/"
					className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}


function validate(values) {

	const errors = {};

	// Validate the input from 'values'
	if (!values.title) {
		errors.title = "Enter a title";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories";
	}
	if (!values.content) {
		errors.content = "Enter some post content please";
	}

	// If errors is empty, the form is fine to submit
	// if errors has *any* properties, redux-form assumes error

	return errors;

}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);

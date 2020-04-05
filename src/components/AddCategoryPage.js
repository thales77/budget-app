import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import { startAddCategory } from '../actions/categories';

export class AddCategoryPage extends React.Component {
  onSubmit = category => {
    this.props.startAddCategory(category);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Category</h1>
          </div>
        </div>
        <div className="content-container">
          <CategoryForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

//we pass dispatch through props
//theoretically we already have access to dispatch
//but by using mapDispatchToProps we decouple the component from 
//Redux, and thus making the component more reusable 
const mapDispatchToProps = dispatch => ({
  startAddCategory: category => dispatch(startAddCategory(category))
});

export default connect(undefined, mapDispatchToProps)(AddCategoryPage);

import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import { startEditCategory, startRemoveCategory } from '../actions/categories';

export class EditCategoryPage extends React.Component {
  onSubmit = category => {
    //pass this to store
    this.props.startEditCategory(this.props.category.id, category);
    this.props.history.push('/dashboard');
  };
  onRemove = () => {
    this.props.startRemoveCategory({ id: this.props.category.id });
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit category</h1>
          </div>
        </div>
        <div className="content-container">
          <CategoryForm category={this.props.category} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>Remove category </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  category: state.categories.find(category => category.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCategory: (id, category) => dispatch(startEditCategory(id, category)),
  startRemoveCategory: data => dispatch(startRemoveCategory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryPage);
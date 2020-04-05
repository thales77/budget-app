import React from 'react';


export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props);

        //if we are editing, setup state from props passed by parent component
        //else if we are adding a new category setup empty state
        this.state = {
            description: props.category ? props.category.description : '',
            note: props.category ? props.category.note : '',
            budgetAmount: props.category ? (props.category.budgetAmount / 100).toString() : '',
            error: ''
        };
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onBudgetAmountChange = (e) => {
        const budgetAmount = e.target.value;

        if (!budgetAmount || budgetAmount.match(/^\d{1,}(\,\d{0,2})?$/)) {
            this.setState(() => ({ budgetAmount }));
        }
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.budgetAmount) {
            this.setState(() => ({ error: 'Please provide description and amount' }))
        } else {
            this.setState(() => ({ error: '' }));

            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                //parsefloat only accepts . for decimal 
                budgetAmount: parseFloat((this.state.budgetAmount).replace(',', '.'), 10) * 100,
            });
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Budget amount"
                    className="text-input"
                    value={this.state.budgetAmount}
                    onChange={this.onBudgetAmountChange}
                />
                <textarea
                    className="textarea"
                    placeholder="Add a note for your category (optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <div>
                    <button className="button">Save Category</button>
                </div>
            </form>
        );
    };
};
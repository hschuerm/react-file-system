import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

class EditItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };

        this.newName = props.defaultValue;
    }

    handleChange(evt) {
        const { isValidRename } = this.props;
        const name = evt.target.value;
        this.newName = name;
        if (!isValidRename(name) && !this.state.hasError) {
            this.setState({ hasError: true })
            return;
        }
        if (this.state.hasError) {
            this.setState({ hasError: false })
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (!this.state.hasError) {
            this.props.onSubmit(this.newName);
            this.props.onExit();
        }
    }

    render() {
        const { defaultValue, onExit } = this.props;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup className="edit-item-form-group"
                validationState={this.state.hasError ? "error" : undefined}>
                    <FormControl defaultValue={defaultValue}
                        className="edit-item-input"
                        autoFocus
                        onChange={this.handleChange.bind(this)}
                        onBlur={onExit} />
                </FormGroup>
            </form>
        )
    }
};

EditItem.propTypes = {
    defaultValue: PropTypes.string.isRequired,
    isValidRename: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default EditItem;
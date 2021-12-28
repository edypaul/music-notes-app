
import React, {Component} from 'react'; 

import './NewPracticeBoxForm.css';

class NewPracticeBoxForm extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            title: this.props.title || '',
        }
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    handleChange(e) {
        const target = e.target; 
        const name = target.name; 
        const val = target.value; 
        this.setState({[name]: val})
    }

    handleSubmit(e) {
        e.preventDefault(); 
        const boxTitle = this.state.title.trim();
        if (boxTitle === '') return; 

        if (this.props.create) {
            this.props.create(boxTitle); 
        } else if (this.props.rename) {
            this.props.handleRename();
            this.props.rename(this.props.id, boxTitle);
        }
        
        this.setState({title: ''});
    }

    render() {
        const submitValue = this.props.title ? 'Save' : 'Create';
        return (
            <form onSubmit={this.handleSubmit} className="NewPracticeBoxForm">
                <input 
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                    placeholder="Create a new practice box"
                />
                <input 
                    type="submit"
                    value={submitValue}
                />
            </form>
        )
    }
}

export default NewPracticeBoxForm; 
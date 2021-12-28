import React, {Component} from 'react'; 
import NewPracticeBoxForm from './NewPracticeBoxForm';

import './BoxTitle.css';

class BoxTitle extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            renaming: false, 
        }

        this.handleDelete = this.handleDelete.bind(this); 
        this.handleRename = this.handleRename.bind(this); 
        this.handlePractice = this.handlePractice.bind(this); 
    }

    handleDelete() {
        this.props.delete(this.props.id);
    }

    handleRename() {
        this.setState( prev => {
            return {
                renaming: !prev.renaming
            }
        }); 

    }

    handlePractice() {
        this.props.startPractice(this.props.id); 
    }

    renderListItem() {
        const {id, title} = this.props;
        return (
            <li key={id} className="BoxTitle-item">
                <span>{title}</span>
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.handleRename}>Rename</button>
                <button onClick={this.handlePractice}>Practice</button>
            </li> 
        )
    }

    render() {
        const {rename, title, id} = this.props; 
        return (
           <div className="BoxTitle">
               {
                    this.state.renaming 
                    ? <NewPracticeBoxForm 
                        rename={rename} 
                        title={title}
                        id={id}
                        handleRename={this.handleRename}
        
                        /> 
                    : this.renderListItem()
               }
           </div>
        )
    }
}

export default BoxTitle;
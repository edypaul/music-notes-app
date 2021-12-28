import React, {Component} from 'react'; 

import './NotesContainer.css';

class NotesContainer extends Component {
    render() {
        const notes = this.props.notes.map(n => <p key={n}>{n}</p>); 
        return (
            <div className="NotesContainer">{notes}</div>
        )
    }
}

export default NotesContainer; 
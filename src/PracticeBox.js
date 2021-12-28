import React, {Component} from 'react'; 
import NotesContainer from './NotesContainer';

import './PracticeBox.css';

class PracticeBox extends Component {
    render() {
        const {box, getRandomNote, clearAllNotes, goToMainPage} = this.props; 
        const {id, notes, title, currentNote} = box;
        const noNotesLeft = notes.length === 12;
        const btnText = noNotesLeft ? 'Again' : 'Clear Notes'; 

        return (
            <div className="PracticeBox">

                <button onClick={goToMainPage} className="PracticeBox-home">Go Back</button>
                
                <div className="PracticeBox-container">

                    <h1 className="PracticeBox-title">{title}</h1>
                    <h2 className="PracticeBox-current-note">{currentNote}</h2>

                    <div className="PracticeBox-buttons">
                        {noNotesLeft || 
                        <button onClick={() => getRandomNote(id)} className="PracticeBox-generate-note">
                            Generate
                        </button>}

                        <button onClick={() => clearAllNotes(id)} className="PracticeBox-clear-notes">
                            {btnText}
                        </button>
                    </div>

                    <section>
                        <NotesContainer notes={notes} />
                    </section>
                </div>
            </div>
        )
    }
}

export default PracticeBox;
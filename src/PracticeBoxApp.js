
import React, {Component} from 'react'; 
import MainPage from './MainPage';
import PracticeBox from './PracticeBox';
import BoxTitle from './BoxTitle';

import { v4 as uuid } from 'uuid';

class PracticeBoxApp extends Component {

    static defaultProps = {
        allNotes: [
            'A', 'B', 'C', 'D', 
            'E', 'F', 'G', 'Ab/G#', 
            'Bb/A#', 'Db/C#', 'Eb/D#', 'Gb/F#'
        ]
    }
    
    constructor(props) {
        super(props); 

        this.state = {
            practiceBoxes: this.loadFromLS(), 
            practicing: false,
            currentBox: null
        }

        this.create = this.create.bind(this); 
        this.delete = this.delete.bind(this);
        this.rename = this.rename.bind(this);
        this.startPractice = this.startPractice.bind(this);
        this.getCurrentPracticeBox = this.getCurrentPracticeBox.bind(this);
        this.generatePracticeBoxList = this.generatePracticeBoxList.bind(this); 
        
        this.getRandomNote = this.getRandomNote.bind(this);
        this.clearAllNotes = this.clearAllNotes.bind(this);
        this.goToMainPage = this.goToMainPage.bind(this);
    }

    create(title) {
        const practiceBox = {
            id: uuid(),
            title, 
            notes: [],
            currentNote: '---'
        }

        this.setState( prev => {
            const newPracticeBoxes = [...prev.practiceBoxes, practiceBox];
            this.saveToLS(newPracticeBoxes)
            return {
                practiceBoxes: newPracticeBoxes
            }
        })
    }

    rename(id, newTitle) {
        const newBoxes = this.state.practiceBoxes.map( box => {
            if (id === box.id) return {...box, title: newTitle}
            return box;
        })

        this.setState({practiceBoxes: newBoxes})
        this.saveToLS(newBoxes);
    }

    delete(id) {
        this.setState(prev => {
            const newPracticeBoxes = prev.practiceBoxes.filter( b => b.id !== id); 
            this.saveToLS(newPracticeBoxes)
            return {
                practiceBoxes: newPracticeBoxes
            }
        })
    }

    startPractice(id) {
        this.setState( prev => {
            return {
                currentBox: id,
                practicing: !prev.practicing
            }
        })
    }

    getCurrentPracticeBox() {
        const box = this.state.practiceBoxes.find( b => b.id === this.state.currentBox);
        return <PracticeBox 
            box={box} 
            getRandomNote={this.getRandomNote}
            clearAllNotes={this.clearAllNotes}
            goToMainPage={this.goToMainPage}
        />
    }

    getRandomNote(id) {
        const practiceBoxes = this.state.practiceBoxes.slice();
        const box = practiceBoxes.find( b => b.id === id); 
        if (box.notes.length === 12) return; 
        const allNotes = this.props.allNotes; 
        let randNote = null;

        do {
            const index = Math.floor(Math.random() * allNotes.length);
            randNote = allNotes[index]; 
        } while (box.notes.includes(randNote))

        box.notes.push(randNote); 
        box.currentNote = randNote; 
        this.setState({practiceBoxes})
        this.saveToLS(practiceBoxes)
    }

    clearAllNotes(id) {
        const practiceBoxes = this.state.practiceBoxes.slice();
        const box = practiceBoxes.find( b => b.id === id); 
        box.notes.length = 0; 
        box.currentNote = '---'; 
        this.setState({practiceBoxes});
        this.saveToLS(practiceBoxes);
    }

    generatePracticeBoxList() {
        const boxes = this.state.practiceBoxes.slice(); 
        return boxes.map( box => {
            return (
                <BoxTitle 
                    key={box.id} 
                    id={box.id}
                    title={box.title}
                    delete={this.delete}
                    rename={this.rename}
                    startPractice={this.startPractice}
                />
            )
        });
    }

    goToMainPage() {
        this.setState( prev => {
            return {
                currentBox: null,
                practicing: !prev.practicing
            }
        })
    }

    saveToLS(practiceBoxes) {
        localStorage.setItem('practiceBoxes', JSON.stringify(practiceBoxes)); 
    }

    loadFromLS() {
        const practiceBoxes = JSON.parse(localStorage.getItem('practiceBoxes')); 
        return practiceBoxes ? practiceBoxes : []
    }

    render() {
        const boxList= this.generatePracticeBoxList(); 
        return (
            <div>
                { this.state.practicing  
                ? this.getCurrentPracticeBox()
                : <MainPage boxList={boxList} create={this.create} /> }
            </div>
        )
    }
}

export default PracticeBoxApp; 
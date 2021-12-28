import React, {Component} from "react";
import NewPracticeBoxForm from './NewPracticeBoxForm';

import './MainPage.css'

class MainPage extends Component {
    render() {
        return (
            <div className="MainPage">
                <nav className="MainPage-title">
                    <h1>Music Notes <i className="fas fa-music"></i></h1>
                    <h2>Practice Box</h2>
                </nav>
                <div className="MainPage-form">
                    <NewPracticeBoxForm create={this.props.create} />
                </div>
                <div className="MainPage-box-list">
                    <ul>{this.props.boxList}</ul>
                </div>
            </div>
        )
    }
}

export default MainPage;
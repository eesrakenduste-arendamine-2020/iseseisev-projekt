import React, { Component } from 'react'
import * as firebase from 'firebase';
import Moment from 'react-moment';

export class JournalForm extends Component {
    //local state initiazied by assigning an object to this.state
    constructor (){
        super();
        this.state = {
            title: '',
            entry: ''
        }

        this.createEntry = this.createEntry.bind(this);
    }
    
    //key = title, evt = event
    onChangeHandler(evt, key) {
        this.setState({
            [key]: evt.target.value
        })
    }

    createEntry () {
        if(this.state.title !== '' && this.state.entry !== '') {
            //see reference siin saveib firebase databasei
            firebase.database().ref('journal').push({
                title: this.state.title,
                entry: this.state.entry,
                //paneme 1000-ga jagama et millisekundid ära võtta
                createdAt: Math.floor(Date.now() / 1000)
            })
        }
    }

    render() {
        return (
            <section className="journalform">
            <h3>Write in your date journal!</h3>
            <div className="form-group">
                <label htmlFor="journalform-title">Title</label>
                <input type="text" id="journalform-title" name="journalform-title" value={this.state.title} onChange={(evt) => this.onChangeHandler(evt, 'title')}/>

            </div>
            <div className="form-group">
                <label htmlFor="journalform-entry">Entry</label>
                <textarea rows="10" name="journalform-entry" id="journalform-entry" value={this.state.entry} onChange={(evt) => this.onChangeHandler(evt, 'entry')}></textarea>
            </div>
            <button onClick={this.createEntry}>Create your entry!</button>
            </section>

        )
    }
}

export default JournalForm
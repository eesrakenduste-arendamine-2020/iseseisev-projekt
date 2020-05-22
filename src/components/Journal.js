import React, { Component } from 'react';
import * as firebase from 'firebase';
import Moment from 'react-moment';

export class Journal extends Component {
  constructor (props) {
    super(props);
  }

  removeNote (id) {
    firebase.database().ref('journal').child(id).remove();
  }

  render() {
    return (
      <section className="journal-wrapper">
        <h3>My Previous Journal Entries</h3>
        <div className="journal">
          {console.log(this.props.journal)}
          {this.props.journal.map(entry => (
            <div className="entry" key={entry.id}>
              <div className="entry-title">
                <h3>{entry.title} <Moment format="YYYY/MM/DD HH:mm" unix>{entry.createdAt}</Moment></h3>
                <div className="remove" onClick={() => this.removeNote(entry.id)}>x</div>
              </div>
              <div className="entry-content">
                <p>{entry.entry}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Journal;
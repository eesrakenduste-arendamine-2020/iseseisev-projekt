
import React, { Component } from 'react';
import * as firebase from 'firebase';
import Moment from 'react-moment';

import Header from './components/Header';
import JournalForm from './components/JournalForm';
import Journal from './components/Journal';

class App extends Component {
  constructor () {
    super();

    this.state = {
      journal: []
    }
    
  }

  //called once the component is actually mounted to the DOM
  componentDidMount () {
    this.db = firebase.database();

    this.listenForChange();
  }

  listenForChange () {
    this.db.ref('journal').on('child_added', snapshot => {
      let entry = {
        id: snapshot.key,
        title: snapshot.val().title,
        entry: snapshot.val().entry,
        createdAt: snapshot.val().createdAt
      }
      console.log(entry.createdAt)

      let journal = this.state.journal;
      journal.push(entry);

      this.setState({
        journal: journal
      });
    });

    this.db.ref('journal').on('child_removed', snapshot => {
      let journal = this.state.journal;
      //kui meie entry pole võrdne id-ga, siis lisame arrayse, aga kui on siis kustutame
      journal = journal.filter(entry => entry.id !== snapshot.key);
      //seejärel paneme state tagasi journal
      this.setState({
        journal: journal
      });
    });
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <JournalForm />
          <Journal journal={this.state.journal} />
        </main>
      </div>
    );
  }
}

export default App;
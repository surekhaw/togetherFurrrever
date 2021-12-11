import React from 'react';
import Profile from './Profile.jsx';
import Form from './Form.jsx';
import Attributes from './Attributes.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      modal: false
    }
    this.makeMatch = this.makeMatch.bind(this);
  }

  makeMatch = payload => {
    fetch('http://localhost:3000/match', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log('resJSON', res);
      if (typeof res === string) {
        this.setState({
          modal: true,
        });
      } else {
        this.setState({
          profiles: res
        });
        console.log(this.state);
      }
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 className='title'><span>Together Fu</span><span className='fur'>rrr</span><span>Ever</span></h1>
        {this.state.profiles.length > 0 && <h2 style={{textAlign: 'center'}}>Your Matches</h2> }
        {this.state.profiles.map(profile => {
          return (
            <div style={{textAlign: 'center'}}>
              <Profile key={ profile._id } profile={ profile } />
            </div>
          );
        })}
        <div className='form'>
          <Form makeMatch={ this.makeMatch } />
        </div>
        <div className='attributes'>
          <Attributes />
        </div>
      </div>
    )
  }
};

export default App;
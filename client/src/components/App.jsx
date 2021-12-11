import React from 'react';
import Form from './Form.jsx';
import Attributes from './Attributes.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1 className='title'><span>Together Fu</span><span className='fur'>rrr</span><span>Ever</span></h1>
        <div className='form'>
          <Form />
        </div>
        <div className='attributes'>
          <Attributes />
        </div>
      </div>
    )
  }
};

export default App;
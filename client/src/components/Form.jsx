import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      firstFavorite: '',
      firstReasons: '',
      secondFavorite: '',
      secondReasons: '',
      petBreed: ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    var words = 'active, adaptable, adventurous, affectionate,aggressive, agile, alert, aloof, amiable, assertive,athletic, attentive, balanced, boisterous, bold, brave, bright,bubbly, calm, cat-like, cautious, charming, cheerful, clever,clownish, companionable, compassionate, confident, cooperative,courageous, curious, detached, determined, devoted, dignified,discerning, docile, dominant, eager, easygoing, energetic,engaging, enterprising, even-tempered, extroverted, faithful,familial, fast, fearless, feisty, fiesty, forgiving, friendly,fun-loving, generous, gentle, good-natured, good-tempered,happy, hard-working, hardy, high-strung, impetuous,independent, inquisitive, instinctual, intelligent, intense,joyful, keen, kind, lively, lovable, loving, loyal, merry,mischevious, nervous, noble, obedient, opinionated, optimistic,outgoing, patient, perceptive, playful, polite, powerful,primitive, protective, proud, quarrelsome, quick, strong,quiet, rational, reliable, reserved, reserverd, respectful,responsibe, responsive, robust, self-assured, self-confident,self-important, sensitive, serious, sociable, social,spirited, stable, steady, strong-willed, stubborn, sturdy, suspicious,sweet, sweet-tempered, swift, tenacious, territorial, thoughtful,tolerant, trainable, trusting, trustworthy, unflappable, vigilant,vocal, watchful, well-mannered, wild, willful'
    console.log(words.split(',').length);
  }

  onChangeHandler = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    // if (name === 'firstReasons' || name === 'secondReasons') {
    //   value = value.toLowerCase().split(', ');
    // }

    this.setState({
      [name]: value
    });
    // console.log(name, value);
  };
  onSubmitHandler = e => {
    e.preventDefault();
    fetch('http://localhost:3000/match', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state)
    })
    .then(res => console.log(res.json));
    console.log('state', this.state);
    this.setState({
      userName: '',
      email: '',
      firstFavorite: '',
      firstReasons: '',
      secondFavorite: '',
      secondReasons: '',
      petBreed: ''
    });
  }

  render() {
    return (
      <div>
        <h2>Profile:</h2>
        <form onSubmit={ this.onSubmitHandler }>
          <div>
            <label htmlFor='userName'>Please choose a userName</label>
            <input id='userName' type='text' name='userName'
              value={ this.state.userName } onChange={ this.onChangeHandler }
              required />
          </div>
          <div>
            <label htmlFor='email'>What is your email address?</label>
            <input id='email' type='email' name='email'
              value={ this.state.email } onChange={ this.onChangeHandler }
              required />
          </div>
          <div>
            <label htmlFor='firstFavorite'>What is your favorite animal?</label>
            <input id='firstFavorite' type='text' name='firstFavorite'
              value={ this.state.firstFavorite } onChange={ this.onChangeHandler }
              required />
          </div>
          <div>
            <label htmlFor='firstReasons'>Why? Please identify three attributes that makes this your favorite animal.
              <input type='text' id='firstReasons' name='firstReasons' value={ this.state.firstReasons } onChange={ this.onChangeHandler }
                required />
            </label>
          </div>
          <div>
            <label htmlFor='secondFavorite'>What is your second favorite animal?</label>
            <input id='secondFavorite' type='text' name='secondFavorite'
              value={ this.state.secondFavorite } onChange={ this.onChangeHandler }
              required />
          </div>
          <div>
            <label htmlFor='secondReasons'>Why? Please identify three attributes that makes this your favorite animal.</label>
              <input type='text' id='secondReasons' name='secondReasons' value={ this.state.secondReasons } onChange={ this.onChangeHandler }
                required />
          </div>
          <div>
            <label htmlFor='petBreed'>What breed is your dog?
            <input type='text' name='petBreed'
            value={ this.state.petBreed } onChange={ this.onChangeHandler }
            required /></label>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
};

export default Form;
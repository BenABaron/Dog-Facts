import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Dog Facts!
 * 
 * On load, produce a random dog image and a random dog fact.
 * Use an input to get a number, and on button press request the amount of dog facts inputted.
 * Also, replace dog image on button press.
 * 
 * https://dog.ceo/api/breeds/image/random
 * https://dog-api.kinduff.com/api/facts
 */

function App() {

  const [imageUrl, setImageUrl] = useState('');
  const [facts, setFacts] = useState([]);
  const [numberOfFacts, setNumberOfFacts] = useState(0);

  const fetchRandomImage = () => {
    return axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then(({ data }) => {return data})
      .catch(error => console.error(error))
  }

  const fetchRandomFacts = () => {
    return axios
      .get(`https://dog-api.kinduff.com/api/facts?number=${numberOfFacts}`, {
        mode: 'no-cors'
      })
      .then(({ data }) => {return data})
      .catch(error => console.error(error))
  }

  const handleNumChange = (e) => {
    e.preventDefault();
    setNumberOfFacts(e.target.value);
  }

  useEffect(() => {
    fetchRandomImage()
      .then(result => setImageUrl(result['message']));
    fetchRandomFacts()
      .then(result => setFacts(result['facts']));
  }, [])

  return (
    <div className='App'>
      <h1>Random Dog Facts!</h1>
      <img src={imageUrl} height='600px'/>
      <div>
        {facts.map((fact, idx) => (
          <p key={idx}>{fact}</p>
      ))}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        fetchRandomImage()
          .then(result => setImageUrl(result['message']));
        fetchRandomFacts()
          .then(result => setFacts(result['facts']));
      }}>
        <input 
        type='number'
        name="numFacts"
        value={numberOfFacts}
        onChange={(e) => handleNumChange(e)}
        placeholder='how many new facts?'/>
        <button type="submit">New facts please!</button>
      </form>
    </div>
  );
}

export default App;

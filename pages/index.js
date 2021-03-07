import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const timeout = 500;

export default function Home() {
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState('No data');

  const setData = (data) => {
    if(typeof data === 'object') {
      setUserData(JSON.stringify(data, undefined, 2));
    } else {
      setUserData(data);
    }
  }

  const fetchData = async () => {
    const {data} = await axios.get('http://localhost:4000/getUserData');

    setData(data);
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, timeout)
  }

  return (
    <div className={styles.container}>
      <button
        onClick={fetchData}
        className={styles.button}
        disabled={disabled}
      >
        Fetch data
      </button>
      <pre>{userData}</pre>
    </div>
  )
}

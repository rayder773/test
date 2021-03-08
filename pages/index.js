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
    if(disabled) {
      setData('Need wait 500ms');
      axios.get('http://localhost:3000/api/badRequestStatistic');
    } else {
      const { data } = await axios.get('http://localhost:3000/api/userData');
      setData(data);
      setDisabled(true);

      axios.get('http://localhost:3000/api/goodRequestStatistic');

      setTimeout(() => {
        setDisabled(false);
      }, timeout)
    }
  }

  return (
    <div className={styles.container}>
      <button
        onClick={fetchData}
        className={styles.button}
      >
        Fetch data
      </button>
      <pre>{userData}</pre>
    </div>
  )
}

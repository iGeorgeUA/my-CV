import './App.css';
import { useState } from 'react';
import { Image } from './components/Image';
import { ContactInfo } from './components/ContactInfo';
import { Experience } from './components/Experience';
import { Counter } from './components/Counter';
import { AddItem } from './components/AddItem';

const initialItems = [
  { id: 1, name: 'CherkasyElevatorMach, Cherkasy', link: 'https://bronto.ua/ua/', title: 'Pre-diploma internship', description: 'Internship and gathering information for designing a graduate work' },
  { id: 2, name: 'Cherkasy State Technological University, Cherkasy', link: 'https://chdtu.edu.ua/', title: 'Pre-diploma internship', description: 'Internship and gathering information for writing a graduate work' },
  { id: 3, name: 'Cherkasy State Technological University, Cherkasy', link: 'https://chdtu.edu.ua/', title: 'Pre-diploma internship', description: 'Internship and gathering information for writing a graduate work' },
]

function App() {

  const [items, setItems] = useState(initialItems);

  function handleAdd(name, link, title, description) {
    const newItem = { id: items.length + 1, name, link, title, description };
    setItems([...items, newItem]);
  }

  return (
    <div className="page">
      <div>
        <Image src="./myPhoto.jpg" />
        <Counter />
      </div>
      <ContactInfo />
      <div>
        <Experience items={items} />
        <AddItem onAdd={handleAdd} />
      </div>
    </div>
  );
}

export default App;
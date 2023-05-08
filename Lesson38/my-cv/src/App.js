import './App.css';
import { Image } from './components/Image';
import { ContactInfo } from './components/ContactInfo';
import { Experience } from './components/Experience';
import { Counter } from './components/Counter';

function App() {
  return (
    <div className="page">
      <Image src="./myPhoto.jpg" />
      <Counter />
      <ContactInfo />
      <Experience />
    </div>
  );
}

export default App;
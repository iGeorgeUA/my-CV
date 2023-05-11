import './App.css';
import { Image } from './components/Image';
import { ContactInfo } from './components/ContactInfo';
import { Experience } from './components/Experience';
import { Counter } from './components/Counter';

const items = {
  
}

function App() {
  return (
    <div className="page">
      <div>
        <Image src="./myPhoto.jpg" />
        <Counter />
      </div>
      <ContactInfo />
      <Experience />
    </div>
  );
}

export default App;
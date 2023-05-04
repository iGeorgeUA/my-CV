import './App.css';
import { Image } from './components/Image';
import { ContactInfo } from './components/ContactInfo';
import { Experience } from './components/Experience';

function App() {
  return (
    <div className="page">
      <Image src="./myPhoto.jpg" />
      <ContactInfo />
      <Experience />
    </div>
  );
}

export default App;
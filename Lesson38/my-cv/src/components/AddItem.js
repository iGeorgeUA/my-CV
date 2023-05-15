import { useState } from "react";

export function AddItem({ onAdd }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleName() {
    onAdd(name);
    setName('');
  }

  function handleLink() {
    onAdd(link);
    setLink('');
  }

  function handleTitle() {
    onAdd(title);
    setTitle('');
  }

  function handleDescription() {
    onAdd(description);
    setDescription('');
  }

  return (
    <div>
      <h4>Add new experiences:</h4>
      <form>
        <input 
          type="text"  
          value={name} 
          name="name" 
          onChange={e => setName(e.target.name)} 
          placeholder="Experience name" 
        />
        <button onClick={handleName}>Add new name</button><br />
        <input 
          type="text" 
          value={link} 
          name="link" 
          onChange={e => setLink(e.target.link)} 
          placeholder="Experience link" 
        />
        <button onClick={handleLink}>Add new link</button><br />
        <input 
          type="text" 
          value={title} 
          name="title" 
          onChange={e => setTitle(e.target.title)} 
          placeholder="Experience title" 
        />
        <button onClick={handleTitle}>Add new title</button><br />
        <input 
          type="text" 
          value={description} 
          name="description"
          onChange={e => setDescription(e.target.description)} 
          placeholder="Experience description" 
        />
        <button onClick={handleDescription}>Add new description</button>
      </form>
    </div>
  )
}
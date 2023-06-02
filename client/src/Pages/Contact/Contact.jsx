import React from 'react'
import { useState } from 'react'
import axios from "axios"


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos a un servidor o realizar una acción en el cliente.
    console.log('Nombre:', name);
    console.log('Email:', email);
    console.log('Mensaje:', message);
    // También puedes reiniciar los valores del formulario después de enviarlo
    setName('');
    setEmail('');
    setMessage('');
    await sendData();
  };

  async function sendData() {
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
    try {
        const response = await axios.post(
            `http://localhost:5000/users/contact`,
            { 
                name: name,
                mail: email,
                message: message
            }
        )
        console.log(response)

    } catch (error) {   
        console.log(error)
    }
}

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;

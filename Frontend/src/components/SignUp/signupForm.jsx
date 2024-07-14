import React, { useState } from 'react';
import axios from 'axios';

export default function SignupForm({ closeModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();
    setPasswordLengthError(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    

    if (password.length < 8) {
      setPasswordLengthError(true);
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password
    };

    axios.post(`${import.meta.env.VITE_API_URL}/users`, data)
      .then(() => alert('Signup Success'))
      .catch(error => console.log(error));

    setError('');
    closeModal();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {/* <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-left m-2">Name</label>
          <input
            onChange={(event) => setName(event.target.value)}
            type="text"
            id="name"
            placeholder="Enter name"
            className="form-input w-full p-2 border rounded m-2"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-left m-2">Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input w-full p-2 border rounded m-2"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-left m-2">Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            id="password"
            placeholder="Enter Password"
            className="form-input w-full p-2 border rounded m-2"
            required
          />
        </div>
        <div>
          <label htmlFor="password2" className="block text-left m-2">Confirm Password</label>
          <input
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            id="password2"
            placeholder="Confirm Password"
            className="form-input w-full p-2 border rounded m-2"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full m-2">Submit</button>
      </form> */}
      <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-left m-2">Name</label>
        <input
          onChange={(event) => setName(event.target.value)}
          type="text"
          id="name"
          placeholder="Enter name"
          className="form-input w-full p-2 border rounded m-2"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-left m-2">Email</label>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="email"
          placeholder="Enter your email"
          className="form-input w-full p-2 border rounded m-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-left m-2">Password</label>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password"
          placeholder="Enter Password"
          className="form-input w-full p-2 border rounded m-2"
          required
        />
        {passwordLengthError && (
          <p className="text-red-500 m-2">Password must be at least 8 characters long</p>
        )}
      </div>
      <div>
        <label htmlFor="password2" className="block text-left m-2">Confirm Password</label>
        <input
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          id="password2"
          placeholder="Confirm Password"
          className="form-input w-full p-2 border rounded m-2"
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full m-2">Submit</button>
    </form>
    </div>
  );
}

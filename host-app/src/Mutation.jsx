import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// Example mutation: Add a country (replace with your actual mutation)
const ADD_COUNTRY = gql`
  mutation AddCountry($code: String!, $name: String!, $emoji: String, $currency: String) {
    addCountry(code: $code, name: $name, emoji: $emoji, currency: $currency) {
      code
      name
      emoji
      currency
    }
  }
`;

export default function Mutation() {
  const [form, setForm] = useState({ code: "", name: "", emoji: "", currency: "" });
  const [addCountry, { data, loading, error }] = useMutation(ADD_COUNTRY);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCountry({ variables: form });
  };

  return (
    <div>
      <h2>Add Country</h2>
      <form onSubmit={handleSubmit}>
        <input name="code" placeholder="Code" value={form.code} onChange={handleChange} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="emoji" placeholder="Emoji" value={form.emoji} onChange={handleChange} />
        <input name="currency" placeholder="Currency" value={form.currency} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Added: {data.addCountry.name}</p>}
    </div>
  );
}
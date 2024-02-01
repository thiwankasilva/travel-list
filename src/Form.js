import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      alert("Description Required");
    } else {
      console.log(e);
      const newItem = { description, quantity, packed: false, id: Date.now() };
      onAddItems(newItem);
      console.log(newItem);
      setDescription("");
      setQuantity(1);
    }
  }
  return (
    <form className="add-form">
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => e.target.value}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

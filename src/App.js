import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList()
  {
    const confirmed = window.confirm("Are you sure");

    if(confirmed)
    {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggle={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> Far Away 💕</h1>;
}

function Form({ onAddItems }) {
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

function PackagingList({ items, onDeleteItem, onToggle,onClearList }) {
  const [sortBy,setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if(sortBy === "description")
  {
    sortedItems = items.slice().sort((a,b) => a.description.localCompare(b.description) )
  }

  if(sortBy === "packed")
  {
    sortedItems = items
    .slice()
    .sort((a,b) => Number(a.packed) - Number(b.packed))
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} onToggle={onToggle} key={item.id} />
        ))}
      </ul>
      <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value= "input"> Sort by input order</option>
        <option value= "description"> Sort by description </option>
        <option value= "packed"> Sort by packed </option>
      </select>
      <button onClick={() => onClearList()}>Clear List</button>

      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start Adding Items</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numItems !== 0 ? Math.round((numPacked / numItems) * 100) : 0;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You Got everything ready to Go"
          : `You have ${numItems} items on your list,
       and you already packed ${numPacked}(${percentage}%)}`}
      </em>
    </footer>
  );
}

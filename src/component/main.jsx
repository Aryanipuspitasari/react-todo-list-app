import { useState, useEffect } from "react";

function Main() {
  const [items, setItems] = useState([]);


  // Load items from local storage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todoItems")) || [];
    setItems(storedItems);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newItem = { todo: formData.get("todo"), id: Date.now() };
    setItems((prevItems) => [...prevItems, newItem]);
    localStorage.setItem("todoItems", JSON.stringify([...items, newItem]));
    event.currentTarget.reset();
  };

  const handleRemove = (index) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <div>
      <h1>Ary's todo App</h1>
      <form onSubmit={handleSubmit}>
        <input name="todo" required placeholder="Write your todo" />
        <button type="submit">Submit</button>
      </form>
      <div className="listContainer">
        {items.map((item, index) => (
          <div key={item.id} className="todoText">
            {index + 1}. {item.todo}
            <button onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
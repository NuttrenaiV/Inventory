import React, { useState } from 'react';
import './App.css';
import InventoryForm from './component/inventoryform';
import InventoryList from './component/inventorylist';

function App() {
  const [selectedInventory, setSelectedInventory] = useState(null);

  const handleEdit = (inventory) => {
    setSelectedInventory(inventory);
  }

  const handleSave = () => {
    setSelectedInventory(null);
  }

  const handleSearch = (inventory) => {
    setSelectedInventory(inventory);
  }

  return (
    <div className="App">
      <InventoryForm selectedInventory={selectedInventory} onSave={handleSave} />
      <InventoryList onEdit={handleEdit} onDelete={handleSave} onSearch={handleSearch} />
    </div>
  );
}

export default App;


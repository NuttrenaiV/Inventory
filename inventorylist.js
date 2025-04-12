import axios from "axios";
import React, { useState, useEffect } from "react";
import './inventory.css'

function InventoryList({onEdit,onDelete,onSearch}) {
    const [inventory, setInventory] = useState([]);
    const [searchId, setSearchId] = useState(null);
    const [searchedInventory, setSearchedInventory] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/inventory")
            .then((res) => {
                setInventory(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/inventory/${id}`)
            .then((res) => {
                alert("Inventory deleted successfully");
                setInventory(inventory.filter((inventory) => inventory.id !== id));
                setSearchedInventory(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSearch = (e) => {
        const id = e.target.value;
        if (id) {
            axios
                .get(`http://localhost:5000/inventory/${id}`)
                .then((res) => {
                    setSearchedInventory(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setSearchedInventory(null);
        }
    }

    return (
        <div>
            <h2>Inventory Search</h2>
            <input type="text" placeholder="Search inventory" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
            <button onClick={() => handleSearch({target: {value: searchId}})}>Search</button>
            <br/>
            {searchedInventory && (
                <div>
                    <h2>Searched Inventory:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Supplier</th>
                                <th>Reorder Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{searchedInventory.id}</td>
                                <td>{searchedInventory.name}</td>
                                <td>{searchedInventory.price}</td>
                                <td>{searchedInventory.quantity}</td>
                                <td>{searchedInventory.supplier}</td>
                                <td>{searchedInventory.reorderLevel}</td>
                                <td>
                                    <button onClick={() => onEdit(searchedInventory)}>Edit</button>
                                    <button onClick={() => handleDelete(searchedInventory.id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
             <br/>
            <h2>Inventory List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Supplier</th>
                        <th>Reorder Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((inventory) => (
                        <tr key={inventory.id}>
                            <td>{inventory.id}</td>
                            <td>{inventory.name}</td>
                            <td>{inventory.price}</td>
                            <td>{inventory.quantity}</td>
                            <td>{inventory.supplier}</td>
                            <td>{inventory.reorderLevel}</td>
                            <td>
                                <button onClick={() => onEdit(inventory)}>Edit</button>
                                <button onClick={() => handleDelete(inventory.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryList;


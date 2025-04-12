import axios from "axios";
import React, { useState, useEffect } from "react";
import './inventory.css'

function InventoryForm({selectedInventory,onSave}) {
    const [inventory, setInventory] = useState([
        {
            name: "",
            price: "",
            quantity: "",
            supplier: "",
            reorderLevel: ""
        }
    ]);

    useEffect(() => {
        if (selectedInventory) {
            setInventory(selectedInventory);
        }
    }, [selectedInventory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory({
            ...inventory,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inventory.id) {
            axios.put(`http://localhost:5000/inventory/${inventory.id}`, inventory)
                .then((res) => {
                    alert("Inventory updated successfully");
                    onSave(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post("http://localhost:5000/inventory", inventory)
                .then((res) => {
                    alert("Inventory added successfully");
                    onSave(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Inventory Form</h2>
                <table>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" value={inventory.name} onChange={handleChange} required /></td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td><input type="text" name="price" value={inventory.price} onChange={handleChange} required /></td>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                        <td><input type="text" name="quantity" value={inventory.quantity} onChange={handleChange} required/></td>
                    </tr>
                    <tr>
                        <td>Supplier</td>
                        <td><input type="text" name="supplier" value={inventory.supplier} onChange={handleChange} required/></td>
                    </tr>
                    <tr>
                        <td>Reorder Level</td>
                        <td><input type="text" name="reorderLevel" value={inventory.reorderLevel} onChange={handleChange} required /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center"><button type="submit">{inventory.id ? "Update" : "Add"}</button></td>
                    </tr>
                </table>
            </div>
        </form>
    );
}

export default InventoryForm;
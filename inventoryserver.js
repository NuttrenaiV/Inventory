import axios from "axios";

const API_URL = "http://localhost:5000/inventory";
const getInventory = () => {
    return axios.get(API_URL);
}
const addInventory = (inventory) => {
    return axios.post(API_URL, inventory);
}
const getInventoryById = (id) => {
    return axios.get(API_URL + "/" + id);
}
const updateInventory = (id, inventory) => {
    return axios.put(API_URL + "/" + id, inventory);
}
const deleteInventory = (id) => {
    return axios.delete(API_URL + "/" + id);
}
export default {
    getInventory,
    addInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
}
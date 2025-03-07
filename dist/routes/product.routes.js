"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const products = [
    { id: 'kjdfkdjfjdkf', name: "PC", description: "A computer", price: 1000 },
    { id: 'gaieijakjdf', name: "Phone", description: "A phone", price: 500 },
    { id: '234897ufahh', name: "Tablet", description: "A tablet", price: 300 },
];
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
productRouter.post("/", (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = { id: (0, uuid_1.v4)(), name, description, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);
    if (!product) {
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(product);
});
productRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const updatedProduct = Object.assign(Object.assign({}, products[index]), { name: name !== null && name !== void 0 ? name : products[index].name, description: description !== null && description !== void 0 ? description : products[index].description, price: price !== null && price !== void 0 ? price : products[index].price });
    res.status(200).json(updatedProduct);
});
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(index, 1);
    res.status(200).send("Product was deleted");
});
exports.default = productRouter;

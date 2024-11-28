import React, { useState } from 'react';
import Header from './header';

function AddProduct() {
    const [name, setName] = useState<string>("");
    const [file, setFile] = useState<File | null>(null); // Typed as File | null
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    async function addProduct() {
        if (!file) {
            alert("Please select a file.");
            return;
        }
        
        const formData = new FormData();
        formData.append("file_path", file);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        
        let result = await fetch('http://localhost:8000/api/add', {
            method: 'POST',
            body: formData
        });
        const data = await result.json();
        console.log("Product added successfully:", data);
        alert("Product added successfully");
        setName("");
        setFile(null);
        setDescription("");
        setPrice("");
    }

    return (
        <>
            <Header />
            <div className='col-sm-6 offset-sm-3'>
                <h1>Add Product</h1><br />
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    className='form-control'
                    value={name}
                    placeholder='Enter Product Name'
                /><br />
                <input
                    type='file'
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                        }
                    }}
                    className='form-control'
                    placeholder='Enter File'
                /><br />
                <input
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    className='form-control'
                    value={description}
                    placeholder='Enter Description'
                /><br />
                <input
                    type='price'
                    onChange={(e) => setPrice(e.target.value)}
                    className='form-control'
                    value={price}
                    placeholder='Enter Price'
                /><br /><br />
                <button onClick={addProduct} className='btn btn-primary'>Add Product</button>
            </div>
        </>
    );
}

export default AddProduct;
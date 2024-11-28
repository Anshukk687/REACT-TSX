import Header from './header';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Product {
    name: string;
    price: string;
    description: string;
    file_path: string;
}

function UpdateProduct() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<Product | null>(null);
    const [name, setName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [filePath, setFilePath] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await fetch("http://localhost:8000/api/edit/" + id);
                const productData: Product = await result.json();
                setData(productData);
                setName(productData.name);
                setPrice(productData.price);
                setDescription(productData.description);
                setFilePath(productData.file_path);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    async function upProduct(id: string) {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('price', price);
        formData.append('name', name);
        formData.append('description', description);

        try {
            let result = await fetch("http://localhost:8000/api/update/" + id, {
                method: 'POST',
                body: formData
            });
            const data = await result.json();
            console.log("Product updated successfully:", data);
            alert("Product has been updated");
            navigate('/');
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    if (!id) {
        return <div>Error: Product ID is missing.</div>;
    }

    return (
        <div>
            <Header />
            <h1>Update Product</h1>
            <p>Product ID: {id}</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
            <input type="file" onChange={(e) => {
                if (e.target.files) {
                    setFile(e.target.files[0]);
                }
            }} /><br />
            <img style={{ width: 50 }} src={"http://localhost:8000/storage/" + filePath} /><br /><br />
            <button onClick={() => upProduct(id)} className="btn btn-primary">Update</button>
        </div>
    );
}

export default UpdateProduct;

import Header from "./header";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    file_path: string;
    description: string;
    price: string;
}

function ProductList() {
    const [data, setData] = useState<Product[]>([]);
    
    useEffect(() => {
        getData();
    }, []);

    async function deleteOpration(id: number) {
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
            method: 'DELETE',
        });
        result = await result.json();
        console.warn(result);
        getData();
    }

    async function getData() {
        const result = await fetch('http://localhost:8000/api/list');
        const resultJSON = await result.json();
        setData(resultJSON);
        console.warn("data", resultJSON);
    }

    return (
        <>
            <Header />
            <div>
                <h1>Product Listing</h1><br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Description</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <img
                                        src={"http://localhost:8000/storage/" + item.file_path}
                                        style={{ width: 100, height: 100 }}
                                        alt={item.name}
                                    />
                                </td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button className="btn btn-danger" onClick={() => { deleteOpration(item.id) }}>
                                        Delete
                                    </Button>
                                    <Link to={"update/" + item.id}>
                                        <span className="btn btn-success">Update</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ProductList;
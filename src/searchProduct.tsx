import Header from "./header";
import React, { useState } from "react";
import { Table } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  file_path: string;
  description: string;
  price: string;
}

const SearchProduct: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

    const search = async (key: string) => {
        if (key.length > 1) {
            try {
                const response = await fetch(`http://localhost:8000/api/search?search=${key}`);
                const result: Product[] = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    return (
        <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
            <h1>Search Product</h1>
            <br />
            <input type="text" onChange={(e) => search(e.target.value)} className="form-control" placeholder="Search Product" />
            <br />
            <br />

            {data.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Description</th>
                            <th>Product Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td><img src={`http://localhost:8000/storage/${item.file_path}`} style={{ width: 100, height: 100 }} alt={item.name} /></td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
        </>
    );
};

export default SearchProduct;

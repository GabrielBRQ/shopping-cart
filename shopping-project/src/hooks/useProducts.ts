import { useState, useEffect } from "react";

// Defina a interface aqui ou importe de types.ts
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { products, loading, error };
};
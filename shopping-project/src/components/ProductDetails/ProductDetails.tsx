// ProductDetails.tsx
import { useParams, useOutletContext } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import styles from "./Detail.module.css";
import type { Product } from "../../main";

interface OutletContextType {
    addToCart: (product: Product) => void;
}

function ProductDetails() {
    const { id } = useParams();

    const { products, loading } = useProducts();
    const { addToCart } = useOutletContext<OutletContextType>();

    if (loading) return <p>Carregando...</p>;

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return <h2>Produto não encontrado!</h2>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage}
                />
            </div>

            <div className={styles.descriptionContainer}>
                <div className={styles.textInfo}>
                    <h2>{product.title}</h2>
                    <span>${product.price}</span>
                </div>
                <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
            </div>
        </div>
    );
}

export default ProductDetails;
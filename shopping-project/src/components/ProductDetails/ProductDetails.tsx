import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import styles from "./Detail.module.css";
import type { Product } from "../../main";

interface OutletContextType {
    addToCart: (product: Product) => string;
    removeFromCart: (cartId: string) => void;
}

function ProductDetails() {
    const { id } = useParams();
    const { products, loading } = useProducts();
    const { addToCart, removeFromCart } = useOutletContext<OutletContextType>();


    const [lastAddedCartId, setLastAddedCartId] = useState<string | null>(null);

    const [showToast, setShowToast] = useState(false);

    // Fecha o aviso automaticamente após 5 segundos
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (showToast) {
            timer = setTimeout(() => setShowToast(false), 5000); // Some após 5 segundos
        }
        return () => clearTimeout(timer);
    }, [showToast]);

    if (loading) return <p>Carregando...</p>;

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return <h2>Produto não encontrado!</h2>;
    }

    //Função para adicionar e disparar o aviso
    const handleAddToCart = () => {
        const generatedCartId = addToCart(product);

        setLastAddedCartId(generatedCartId);

        // 3. Mostra o Toast
        setShowToast(true);
    };

    //Função para desfazer a ação e esconder o aviso
    const handleUndo = () => {
        if (lastAddedCartId) {
            removeFromCart(lastAddedCartId); // Remove usando o UUID
            setShowToast(false); // Esconde o aviso
            setLastAddedCartId(null); // Limpa o estado
        }
    };

    return (
        <div className={styles.container}>
            {/*Renderização condicional do aviso no canto da tela*/}
            {showToast && (
                <div className={styles.toast}>
                    <p>Produto adicionado ao carrinho!</p>
                    <button onClick={handleUndo} className={styles.undoButton}>
                        Desfazer
                    </button>
                </div>
            )}

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
                <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
            </div>
        </div>
    );
}

export default ProductDetails;
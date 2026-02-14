import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import styles from "./Home.module.css";
import videoFile from "../assets/comercial.mp4";

function Home() {
    const { products, loading } = useProducts();

    if (loading) return <p>Carregando...</p>;

    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroContainer}>

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.video}
                >
                    <source src={videoFile} type="video/mp4" />
                </video>

                <Link to={`/product/1`} className={styles.buyButton}>
                    Comprar agora
                </Link>

            </div>
            <h1 className={styles.news}>Novidades</h1>

            <div className={styles.grid}>
                {products.slice(0, 3).map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
                        <div className={styles.card}>

                            <div className={styles.imageContainer}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className={styles.productImage}
                                />
                            </div>

                            <p className={styles.title}>{product.title}</p>
                            <span className={styles.price}>
                                $ {product.price.toFixed(2)}
                            </span>

                        </div>
                    </Link>
                ))}
            </div>
                
            <Link to="/shop" className={styles.exploreButton}>
                Explorar loja
            </Link>
        </div>
    )
}

export default Home
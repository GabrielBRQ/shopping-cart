import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";
import styles from "./Shop.module.css";

function Shop() {
  const { products, loading } = useProducts();

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.productsDiv}>
      <h1>Produtos</h1>

      <div className={styles.grid}>
        {products.map(product => (
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
    </div>


  )
}

export default Shop
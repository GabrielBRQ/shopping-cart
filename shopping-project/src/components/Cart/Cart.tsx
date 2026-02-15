import { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import trash from "../../assets/trash.png";
import type { Product } from "../../main.tsx";

interface CartItem extends Product {
  cartId: string;
}

interface OutletContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
}

function Cart() {
  const { cart, removeFromCart, clearCart } = useOutletContext<OutletContextType>();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsCheckedOut(true);
    clearCart();
  };

  const handleGoHome = () => {
    setIsCheckedOut(false);
    navigate("/");
  };

  if (isCheckedOut) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.successMessage}>
          <h2>Compra efetuada! 🎉</h2>
          <p>Obrigado por comprar na Fake Store!</p>
          <button onClick={handleGoHome} className={styles.checkoutBtn}>
            Voltar para a loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.bag}>
        <h2>Sua Sacola ({cart.length})</h2>

        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.cartId} className={styles.cartItem}>
                <div className={styles.imgContainer}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className={styles.textContainer}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>$ {item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)}>
                    <img src={trash} alt="Remover item" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.summary}>
        <h2>Resumo</h2>
        <div className={styles.calculationsDiv}>
          <div className={styles.calculationsRow}>
            <span>Subtotal:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className={styles.calculationsRow}>
            <span>Frete:</span>
            <strong>Grátis</strong>
          </div>
          <div className={styles.totalRow}>
            <span>Total:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        <button onClick={handleCheckout} className={styles.checkoutBtn}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default Cart;
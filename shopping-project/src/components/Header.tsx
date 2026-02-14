import { Link } from "react-router-dom";
import styles from './Header.module.css';
import logo from "../assets/Logo.png";
import hearth from "../assets/hearth.png";
import bag from "../assets/shopping-bag.png";

interface HeaderProps {
    cartCount: number; // Obrigatório ser um número
}

function Header({ cartCount }: HeaderProps) {
    return (
        <header>
            <Link to="/">
                <img src={logo} className={styles.logo} alt="logo" />
            </Link>
            <div className={styles.departments}>
                <Link to="shop">
                    Produtos
                </Link>
                <Link to="shop">
                    Carrinho
                </Link>
                <Link to="shop">
                    Projeto
                </Link>
            </div>
            <div className={styles.linkContents}>
                <Link to="/">
                    <div className={styles.icon}>
                        <img src={hearth} alt="favorites" />
                    </div>
                </Link>
                <Link to="cart">
                    <div className={styles.icon}>
                        <img src={bag} className={styles.icon} alt="cart" />
                        {cartCount > 0 && (
                            <span className={styles.badge}>{cartCount}</span>
                        )}
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header
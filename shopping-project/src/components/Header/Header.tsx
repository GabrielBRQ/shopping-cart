import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css';
import logo from "../../assets/Logo.png";
import hearth from "../../assets/hearth.png";
import bag from "../../assets/shopping-bag.png";

interface HeaderProps {
    cartCount: number;
}

function Header({ cartCount }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logoContainer}>
                <img src={logo} className={styles.logo} alt="logo" />
            </Link>

            {/* Navegação Principal (Textos) */}
            {/* Adicionamos a classe 'active' se o menu estiver aberto */}
            <nav className={`${styles.departments} ${isMenuOpen ? styles.active : ''}`}>
                <button className={styles.closeMenu} onClick={toggleMenu}>
                    {/* Ícone de Fechar (X) */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <Link to="shop" onClick={toggleMenu}>Produtos</Link>
                <Link to="cart" onClick={toggleMenu}>Carrinho</Link>
                <Link to="about" onClick={toggleMenu}>Projeto</Link>
            </nav>

            {/* Ícones e Menu Hambúrguer */}
            <div className={styles.actions}>
                <div className={styles.linkContents}>
                    <Link to="about">
                        <div className={styles.icon}>
                            <img src={hearth} alt="favorites" />
                        </div>
                    </Link>
                    <Link to="cart">
                        <div className={styles.icon}>
                            <img src={bag} alt="cart" />
                            {cartCount > 0 && (
                                <span className={styles.badge}>{cartCount}</span>
                            )}
                        </div>
                    </Link>
                </div>

                {/* Botão Hambúrguer (Só aparece no mobile) */}
                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            {/* Overlay escuro quando o menu abre */}
            {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
        </header>
    )
}

export default Header;
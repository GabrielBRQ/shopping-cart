import styles from "./About.module.css";
import { SiTypescript, SiReact, SiReactrouter, SiFastapi } from "react-icons/si";

function About() {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.contentWrapper}>
                <h2 className={styles.title}>Sobre o Projeto</h2>
                <p className={styles.description}>
                    Uma simulação completa de E-commerce desenvolvida para demonstrar
                    competências em arquitetura Front-end moderna e Clean Code.
                </p>

                <div className={styles.techGrid}>
                    <div className={styles.techCard}>
                        <a href="https://www.typescriptlang.org/">
                            <div className={styles.cardHeader}>
                                <SiTypescript className={styles.techIcon} color="#3178C6" />
                                <strong>TypeScript</strong>
                            </div>
                            <span>Tipagem estática e segurança para escalabilidade.</span>
                        </a>
                    </div>

                    <div className={styles.techCard}>
                        <a href="https://fakestoreapi.com/">
                            <div className={styles.cardHeader}>
                                <SiFastapi className={styles.techIcon} color="#009688" />
                                <strong>Fake Store API</strong>
                            </div>
                            <span>Integração RESTful para consumo de dados reais.</span>
                        </a>
                    </div>

                    <div className={styles.techCard}>
                        <a href="https://testing-library.com/docs/react-testing-library/intro/">
                            <div className={styles.cardHeader}>
                                <SiReact className={styles.techIcon} color="#FF4154" />
                                <strong>React Testing Library</strong>
                            </div>
                            <span>Testes de integração focados na experiência do usuário.</span>
                        </a>
                    </div>

                    <div className={styles.techCard}>
                        <a href="https://reactrouter.com/">
                            <div className={styles.cardHeader}>
                                <SiReactrouter className={styles.techIcon} color="#CA4245" />
                                <strong>React Router</strong>
                            </div>
                            <span>Navegação SPA fluida sem recarregamento de página.</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
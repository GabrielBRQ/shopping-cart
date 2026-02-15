import icon from "../assets/github-logo.png"
import style from "./Footer.module.css";

function Footer () {
    return (
        <footer className={style.footer}>
            <p>
                Esse site foi desenvolvido por <a href="https://www.github.com/gabrielbrq">Gabriel Medeiros <img src={icon} alt="Github Icon" /></a>
            </p>
        </footer>
    )
}

export default Footer
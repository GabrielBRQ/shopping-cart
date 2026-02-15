import icon from "../assets/github-logo.png"
import "./Footer.module.css";

function Footer () {
    return (
        <footer>
            <p>
                Esse site foi desenvolvido por <a href="https://www.github.com/gabrielbrq">Gabriel Medeiros <img src={icon} alt="Github Icon" /></a>
            </p>
        </footer>
    )
}

export default Footer
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <>
            <h1>Oh não! Essa rota não existe...</h1>
            <Link to="/">
                Você pode voltar para a página clicando aqui
            </Link>
        </>
    )
}

export default ErrorPage
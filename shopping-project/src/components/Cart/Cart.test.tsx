import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Cart from "./Cart";


const mockNavigate = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();

let mockCartData: any[] = [];

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useOutletContext: () => ({
            cart: mockCartData,
            addToCart: vi.fn(),
            removeFromCart: mockRemoveFromCart,
            clearCart: mockClearCart,
        }),
        useNavigate: () => mockNavigate,
    };
});

vi.mock("../../assets/trash.png", () => ({ default: "trash-icon.png" }));

describe("Componente Cart", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockCartData = [];
    });

    const renderCart = () => {
        return render(
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        );
    };

    it("deve renderizar a mensagem de carrinho vazio inicialmente", () => {
        mockCartData = [];
        renderCart();

        expect(screen.getByText("Sua Sacola (0)")).toBeInTheDocument();
        expect(screen.getByText("Seu carrinho está vazio.")).toBeInTheDocument();
    });

    it("deve renderizar itens no carrinho e calcular o total corretamente", () => {
        // PREPARAR: Injetamos dados falsos no contexto
        mockCartData = [
            { cartId: "1", id: 101, title: "Produto Teste A", price: 50.00, image: "img-a.jpg" },
            { cartId: "2", id: 102, title: "Produto Teste B", price: 25.50, image: "img-b.jpg" },
        ];

        renderCart();

        // VERIFICAR
        expect(screen.getByText("Sua Sacola (2)")).toBeInTheDocument();
        expect(screen.getByText("Produto Teste A")).toBeInTheDocument();
        expect(screen.getByText("$ 50")).toBeInTheDocument();

        const prices = screen.getAllByText("$75.50");
        // Encontra 2 porque tem o total e subtotal
        expect(prices).toHaveLength(2);
    });

    it("deve chamar a função de remover item ao clicar na lixeira", async () => {
        const user = userEvent.setup();

        mockCartData = [
            { cartId: "abc-123", id: 101, title: "Produto Para Remover", price: 10, image: "img.jpg" }
        ];

        renderCart();

        const removeBtn = screen.getByRole("button", { name: /remover item/i });
        await user.click(removeBtn);

        expect(mockRemoveFromCart).toHaveBeenCalledWith("abc-123");
    });

    it("deve finalizar a compra, limpar o carrinho e mostrar mensagem de sucesso", async () => {
        const user = userEvent.setup();
        mockCartData = [{ cartId: "1", id: 1, title: "Item", price: 10, image: "" }]; // Carrinho não pode estar vazio para checkout

        renderCart();

        const checkoutBtn = screen.getByRole("button", { name: /finalizar compra/i });
        await user.click(checkoutBtn);

        expect(screen.getByText("Compra efetuada! 🎉")).toBeInTheDocument();

        expect(mockClearCart).toHaveBeenCalled();
    });

    it("deve navegar para a home ao clicar em 'Voltar para a loja' na tela de sucesso", async () => {
        const user = userEvent.setup();
        mockCartData = [{ cartId: "1", id: 1, title: "Item", price: 10, image: "" }];

        renderCart();

        // Clica primeiro em finalizar para ir para a tela de sucesso
        await user.click(screen.getByRole("button", { name: /finalizar compra/i }));

        // Agora clica em voltar
        const backBtn = screen.getByRole("button", { name: /voltar para a loja/i });
        await user.click(backBtn);

        // Verifica se o navigate foi chamado com "/"
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
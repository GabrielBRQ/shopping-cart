import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductDetails from "./ProductDetails";

const mockAddToCart = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => ({
      addToCart: mockAddToCart,
    }),
    useParams: () => mockUseParams(),
  };
});

const mockUseProducts = vi.fn();

vi.mock("../../hooks/useProducts", () => ({
  useProducts: () => mockUseProducts(),
}));

const mockProductsList = [
  { id: 1, title: "Produto Teste 1", price: 100, image: "img1.jpg", description: "Desc 1" },
  { id: 2, title: "Produto Teste 2", price: 200, image: "img2.jpg", description: "Desc 2" },
];

describe("Componente ProductDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve mostrar 'Carregando...' quando o hook estiver buscando dados", () => {
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseProducts.mockReturnValue({
      products: [],
      loading: true,
    });

    render(<ProductDetails />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve mostrar mensagem de erro se o produto não for encontrado", () => {
    mockUseParams.mockReturnValue({ id: "99" });
    mockUseProducts.mockReturnValue({
      products: mockProductsList,
      loading: false,
    });

    render(<ProductDetails />);

    expect(screen.getByText("Produto não encontrado!")).toBeInTheDocument();
  });

  it("deve renderizar os detalhes do produto corretamente quando encontrado", () => {
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseProducts.mockReturnValue({
      products: mockProductsList,
      loading: false,
    });

    render(<ProductDetails />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "img1.jpg");
    expect(img).toHaveAttribute("alt", "Produto Teste 1");

    expect(screen.getByText("Produto Teste 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("deve chamar a função addToCart com o produto correto ao clicar no botão", async () => {
    const user = userEvent.setup();

    mockUseParams.mockReturnValue({ id: "2" });
    mockUseProducts.mockReturnValue({
      products: mockProductsList,
      loading: false,
    });

    render(<ProductDetails />);

    const button = screen.getByRole("button", { name: /adicionar ao carrinho/i });
    await user.click(button);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProductsList[1]);
  });
});
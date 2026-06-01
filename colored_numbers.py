def print_colored_numbers():
    # Lista de códigos de escape ANSI para cores no terminal
    # 31: Vermelho, 32: Verde, 33: Amarelo, 34: Azul, 35: Magenta, 36: Ciano
    colors = [
        "\033[31m", "\033[32m", "\033[33m", 
        "\033[34m", "\033[35m", "\033[36m"
    ]
    reset = "\033[0m"

    for i in range(1, 101):
        # Seleciona uma cor da lista usando o operador módulo (%)
        color = colors[i % len(colors)]
        # Imprime o número com a cor e reseta para o padrão logo em seguida
        # end=" " para imprimir na mesma linha
        print(f"{color}{i:3}{reset}", end=" " if i % 10 != 0 else "\n")

if __name__ == "__main__":
    print_colored_numbers()

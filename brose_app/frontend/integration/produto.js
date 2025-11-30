window.addEventListener("DOMContentLoaded", loadProducts);
window.loadProducts = loadProducts;

window.addEventListener("DOMContentLoaded", () => {
  const botaoRelatorio = document.getElementById("btn-relatorio");
  
  if (botaoRelatorio) {
    botaoRelatorio.addEventListener("click", gerarRelatorioProdutos);
  }
});

// Função para deletar produto
async function deletarProduto(idProduto, elemento) { 
  if (!confirm("Deseja realmente excluir este produto?")) return;

  try {
    const response = await fetch(
      `http://localhost:5000/produtos/${idProduto}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Erro ao deletar");

    if (elemento) {
      elemento.remove();
    } else {
      loadProducts();
    }
    
  } catch (err) {
    console.error(err);
    alert("Erro ao deletar produto");
  }
}

async function gerarRelatorioProdutos() {
  try {
    const response = await fetch("http://localhost:5000/relatorios/produtos");

    if (!response.ok) {
      throw new Error("Erro ao gerar relatório");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio_produtos.csv"; 
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    alert("Erro ao gerar relatório.");
  }
}

// Função para carregar produtos do backend
async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/produtos");
    if (!response.ok) throw new Error("Erro ao buscar produtos");

    const produtos = await response.json();
    const itemsContainer = document.querySelector(".grid-main");

    if (!itemsContainer) {
      console.error("Erro: container .grid-main não encontrado");
      return;
    }

    itemsContainer.innerHTML = "";

    if (produtos.length === 0) {
      itemsContainer.innerHTML =
        "<p class='nenhum-produto'>Nenhum produto cadastrado.</p>";
      return;
    }

    produtos.forEach((produto) => {
      const newItem = document.createElement("div");
      newItem.id = `${produto.id_produto}`;
      newItem.classList.add("items");
      newItem.dataset.id = produto.id_produto;

      newItem.innerHTML = `
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <div class="buttons-main">
          <button type="button" class="white-btn">Ver Detalhes</button>
          <button type="button" class="red-btn">Excluir</button>
        </div>
      `;

      itemsContainer.appendChild(newItem);

      const detailBtn = newItem.querySelector(".white-btn");
      const deleteBtn = newItem.querySelector(".red-btn");

      // Abrir modal de detalhes usando a função global
      detailBtn.addEventListener("click", () => {
        window.abrirDetalhes(produto);
      });

      // Deletar produto
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        deletarProduto(produto.id_produto, newItem);
      });
    });

    console.log("Produtos carregados com sucesso:", produtos);
    
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let produtoAtual = null;

  // Captura o evento do modal
  document.addEventListener("modalDetalhesAberto", (e) => {
    produtoAtual = e.detail;
    configurarEdicaoQuantidade();
  });

  function configurarEdicaoQuantidade() {
    const editBtn = document.querySelector(".edit-bottom-contabiliza");
    const quantidadeSpan = document.getElementById("detailQuantidade");

    if (!editBtn || !quantidadeSpan) return;

    editBtn.onclick = () => {
      const input = document.createElement("input");
      input.type = "number";
      input.min = 0;
      input.value = quantidadeSpan.textContent;
      input.style.width = "60px";
      input.id = "tempQuantidadeInput";

      quantidadeSpan.replaceWith(input);
      input.focus();

      input.onblur = async () => {
        const novaQuantidade = parseInt(input.value);

        if (!isNaN(novaQuantidade)) {
          try {
            await fetch(`http://localhost:5000/produtos/${produtoAtual.id_produto}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ quantidade: novaQuantidade })
            });

            const novoSpan = document.createElement("span");
            novoSpan.id = "detailQuantidade";
            novoSpan.className = "contador-numero";
            novoSpan.textContent = novaQuantidade;

            input.replaceWith(novoSpan);
          } catch (err) {
            console.error(err);
            alert("Erro ao atualizar quantidade");
          }
        }
      };
    };
  }
});



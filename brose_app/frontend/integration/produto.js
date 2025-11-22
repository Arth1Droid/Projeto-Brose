window.addEventListener("DOMContentLoaded", loadProducts);
window.loadProducts = loadProducts;

// Função para deletar produto
async function deletarProduto(idProduto, elemento) { 
  if (!confirm("Deseja realmente excluir este produto?")) return;
  try {
    const response = await fetch(
      `http://localhost:5000/produtos/${idProduto}`,
      {
        method: "DELETE",
      }
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

// Função para abrir detalhes do produto
function abrirDetalhes(produto) {
  const detailModal = document.getElementById("detailModal");
  detailModal.classList.add("active");
  document.getElementById("detailName").textContent = produto.nome;
  document.getElementById("detailDesc").textContent = produto.descricao;
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

      // Adicionar listeners aos botões
      const detailBtn = newItem.querySelector(".white-btn");
      const deleteBtn = newItem.querySelector(".red-btn");

      detailBtn.addEventListener("click", () => {
        abrirDetalhes(produto);
      });

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

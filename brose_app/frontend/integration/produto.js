window.addEventListener("DOMContentLoaded", loadProducts);
window.loadProducts = loadProducts;

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

// Função para cadastrar produto
async function cadastrarProduto() {
  const nome = document.getElementById("productName").value.trim();
  const descricao = document.getElementById("productDesc").value.trim();

  if (!nome || !descricao) {
    alert("Preencha todos os campos!");
    return;
  }
  const produto = { nome, descricao, quantidade: 0 };
  try {
    const response = await fetch("http://localhost:5000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      const erro = await response.json();
      alert("Erro ao cadastrar: " + erro.erro);
      return;
    }

    const novoProduto = await response.json();
    console.log("Produto cadastrado:", novoProduto);

    // Atualiza lista de produtos
    if (window.loadProducts) window.loadProducts();

  } catch (err) {
    console.error(err);
    alert("Erro na conexão com o servidor!");
  }
}



// Função para gerar relatórios csv
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

      // Cadastrar produto
      const cadastrarBtn = document.getElementById("continue-btn");
        if (cadastrarBtn) {
          cadastrarBtn.addEventListener("click", () => {
            cadastrarProduto();
          });
        }

     const botaoRelatorio = document.getElementById("btn-relatorio");
        if (botaoRelatorio) {
          botaoRelatorio.addEventListener("click", gerarRelatorioProdutos);
        }

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

async function carregarHistorico(idProduto) {
  const historicoList = document.getElementById("historico-list");
  if (!historicoList) return;

  // Limpa histórico anterior
  historicoList.innerHTML = "";

  try {
    const response = await fetch(`http://localhost:5000/produtos/${idProduto}/historico`);
    if (!response.ok) throw new Error("Erro ao buscar histórico");

    const registros = await response.json();

    if (registros.length === 0) {
      historicoList.innerHTML = "<li>Nenhum registro encontrado.</li>";
      return;
    }

    registros.forEach((r) => {
      const li = document.createElement("li");
      li.textContent = `Quantidade: ${r.quantidade || "-"} | Data: ${new Date(r.data_registro).toLocaleString()}`;
      historicoList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    historicoList.innerHTML = "<li>Erro ao carregar histórico</li>";
  }
}





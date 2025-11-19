document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("productForm");
  const itemsContainer = document.querySelector(".grid-main");
  const cadastroModal = document.getElementById("cadastroModal");
  const successModal = document.getElementById("successModal");
  const cancelBtn = document.getElementById("cancel-btn");
  const closeModalBtn = document.getElementById("closeModal");

  // Função para carregar produtos do backend
  async function loadProducts() {
    try {
      const response = await fetch("http://localhost:5000/produtos");
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const produtos = await response.json();

      produtos.forEach(p => {
        addNewProduct(p.id, p.nome, p.descricao); // <- passa o ID do banco
      });
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  }

  // Função para adicionar novo produto na tela
function addNewProduct(id, name, descricao) {
  if (!itemsContainer) {
    console.error("Erro: container .grid-main não encontrado");
    return;
  }

  // Evitar duplicados pelo nome e descrição
  const items = itemsContainer.querySelectorAll(".items");
  const existe = Array.from(items).some(item => {
    const nomeItem = item.querySelector("h2").textContent.trim().toLowerCase();
    const descItem = item.querySelector("p").textContent.trim().toLowerCase();
    return nomeItem === name.toLowerCase() && descItem === descricao.toLowerCase();
  });

  if (existe) {
    alert("Erro: Este produto já foi cadastrado!");
    return;
  }

  // Criar novo item
  const newItem = document.createElement("div");
  newItem.classList.add("items");
  newItem.dataset.id = id; // <- armazena o ID do banco
  newItem.dataset.quantidade = 1;

  newItem.innerHTML = `
    <h2>${name}</h2>
    <p>${descricao}</p>
    <div class="buttons-main">
      <button type="button" class="detail-button">Ver Detalhes</button>
      <button type="button" class="delete-button">Excluir</button>
    </div>
  `;

  itemsContainer.appendChild(newItem);

  // Adicionar listeners nos novos botões
  attachDetailListeners(newItem);
  attachDeleteListeners(newItem);
}

  // Função para abrir modal de cadastro
  function openCadastroModal() {
    cadastroModal.classList.add("active");
  }

  // Função para fechar modal de cadastro
  function closeCadastroModal() {
    cadastroModal.classList.remove("active");
    form.reset();
  }

  // Função para abrir modal de sucesso
  function openSuccessModal() {
    successModal.classList.add("active");
    setTimeout(() => {
      successModal.classList.remove("active");
    }, 2000);
  }

  // Cadastro de produto
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nome: document.getElementById("productName").value.trim(),
      descricao: document.getElementById("productDesc").value.trim()
    };

    try {
      const response = await fetch("http://localhost:5000/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Erro na requisição");

      const result = await response.json(); // <- backend retorna o produto com ID
      console.log("Produto cadastrado:", result);

      addNewProduct(result.id, result.nome, result.descricao); // usa o ID do backend
      closeCadastroModal();
      openSuccessModal();

    } catch (err) {
      console.error(err);
      
    }
  });

  // Cancelar modal
  cancelBtn.addEventListener("click", closeCadastroModal);
  closeModalBtn.addEventListener("click", closeCadastroModal);

  // Botão para abrir modal de cadastro
  const addBtn = document.getElementById("homepage-add");
  addBtn.addEventListener("click", openCadastroModal);

  // Funções para detalhes e exclusão
  function attachDetailListeners(item) {
    const detailBtn = item.querySelector(".detail-button");
    detailBtn.addEventListener("click", () => {
      const detailModal = document.getElementById("detailModal");
      detailModal.classList.add("active");

      const detailName = document.getElementById("detailName");
      const detailDesc = document.getElementById("detailDesc");

      detailName.textContent = item.querySelector("h2").textContent;
      detailDesc.textContent = item.querySelector("p").textContent;
    });
  }

  function attachDeleteListeners(item) {
    const deleteBtn = item.querySelector(".delete-button");
    deleteBtn.addEventListener("click", async () => {
      const id = item.dataset.id; // <- pega o ID armazenado
      if (!id) {
        console.error("ID do produto não encontrado!");
        return;
      }

      if (!confirm("Deseja realmente excluir este produto?")) return;

      try {
        const response = await fetch(`http://localhost:5000/produtos/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.erro || "Erro ao deletar produto");
        }

        // Remove item da tela
        item.remove();
        console.log(`Produto ${id} deletado com sucesso.`);
      } catch (err) {
        console.error(err);
        
      }
    });
  }

  // Carrega produtos do banco ao iniciar
  loadProducts();

});

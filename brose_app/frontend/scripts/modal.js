document.addEventListener('DOMContentLoaded', function() {
    /*localizando o elemento do modal */
    // Essa linha SÓ será executada após o HTML estar completamente carregado
    const successModal = document.getElementById('successModal');

    if (successModal) {
        // --- FUNÇÕES ---
        function showSuccessModal(){
            successModal.classList.add('active');
        }

        function hideSuccessModal(){
            successModal.classList.remove('active');
        }

        // --- EVENT LISTENER para fechar ---
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                hideSuccessModal();
            }
        });

    }
});
// botão cadastramento
document.addEventListener('DOMContentLoaded', function () {
    const modalCadastro = document.getElementById('cadastroModal'); // Modal de cadastro
    const modalSucesso = document.getElementById('successModal');   // Modal de sucesso
    const form = document.getElementById('productForm');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const addButton = document.querySelector('.homepage_add');
    const itemsContainer = document.querySelector('.grid-main');
    const notFoundDiv = document.querySelector('.notfound-item');
    const searchInput = document.querySelector('input[name="q"]');

    // ---- Função para mostrar o modal de sucesso ----
    function showSuccessModal() {
        modalSucesso.classList.add('active');
        setTimeout(() => {
            modalSucesso.classList.remove('active');
        }, 2000); // fecha automaticamente após 2 segundos
    }

    // ---- Função para mostrar e esconder o modal de cadastro ----
    function showCadastroModal() {
        modalCadastro.classList.add('active');
    }

    function hideCadastroModal() {
        modalCadastro.classList.remove('active');
    }

    if (addButton) {
        addButton.addEventListener('click', showCadastroModal);
    }
    if (closeBtn) closeBtn.addEventListener('click', hideCadastroModal);
    if (cancelBtn) cancelBtn.addEventListener('click', hideCadastroModal);

    // ---- Função de adicionar produto ----
    function addNewProduct(name, descricao) {
        const newItem = document.createElement('div');
        newItem.classList.add('items');
        newItem.innerHTML = `
            <h2>${name}</h2>
            <p>${descricao}</p>
            <div class="buttons-main">
                <button type="button" class="detail-button">Ver Detalhes</button>
                <button type="button" class="red-button">Excluir</button>
            </div>
        `;
        itemsContainer.appendChild(newItem);
        filterProducts();
    }

    // ---- Submissão do formulário de produto ----
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const descricao = document.getElementById('productDesc').value.trim();

        if (name && descricao) {
            addNewProduct(name, descricao);
            hideCadastroModal();
            form.reset();
            showSuccessModal(); 
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });

    // ---- Filtro de pesquisa ----
    function filterProducts() {
        const query = searchInput?.value.trim().toLowerCase() || '';
        const pecas = document.querySelectorAll('.items');
        let encontrou = false;

        pecas.forEach(peca => {
            const nome = peca.querySelector('h2').textContent.toLowerCase();
            if (nome.includes(query)) {
                peca.style.display = '';
                encontrou = true;
            } else {
                peca.style.display = 'none';
            }
        });

        if (notFoundDiv) {
            notFoundDiv.style.display = encontrou ? 'none' : 'block';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
});

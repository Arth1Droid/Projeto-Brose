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
    const items = document.querySelectorAll('.items');
    let itemExistente = null;

    // Procurar item igual (nome + descrição)
    items.forEach(item => {
        const nomeItem = item.querySelector('h2').textContent.trim().toLowerCase();
        const descItem = item.querySelector('p').textContent.trim().toLowerCase();

        if (nomeItem === name.toLowerCase() && descItem === descricao.toLowerCase()) {
            itemExistente = item;
        }
    });

    if (itemExistente) {
        // Se já existe, apenas exibe alerta e não adiciona novamente
        alert("Este produto já está cadastrado!");
        return; // interrompe a execução da função
    } else {
        // Criar novo item com contador inicial 1
        const newItem = document.createElement('div');
        newItem.classList.add('items');
        newItem.dataset.quantidade = 1;

        newItem.innerHTML = `
            <h2>${name}</h2>
            <p>${descricao}</p>
            <div class="buttons-main">
                <button type="button" class="detail-button">Ver Detalhes</button>
                <button type="button" class="red-button">Excluir</button>
            </div>
        `;

        itemsContainer.appendChild(newItem);
    }

    attachDetailListeners(); // garante que o botão "ver detalhes" funcione para novos itens
    filterProducts(); // atualiza pesquisa
}


    const contadorSpan = document.getElementById('detailQuantidade');
    const historicoList = document.getElementById('historico-list');
    const editButton = document.querySelector('.edit-bottom-contabiliza');
    const contadorBox = document.querySelector('.contador-box');
    const produtoNome = document.getElementById('detailName');

    let contador = parseInt(contadorSpan.textContent);
    let editMode = false;

    // Função para salvar no localStorage
function salvarEstado() {
  const nomeProduto = produtoNome.textContent.trim();
  if (!nomeProduto) return;

  const data = {
    quantidade: contador,
    historico: Array.from(historicoList.querySelectorAll('li')).map(li => li.innerHTML)
  };

  localStorage.setItem(`produto_${nomeProduto}`, JSON.stringify(data));
}

    // Função para carregar dados do localStorage
function carregarEstado() {
  const nomeProduto = produtoNome.textContent.trim();
  if (!nomeProduto) return;

  const dados = JSON.parse(localStorage.getItem(`produto_${nomeProduto}`));
  if (dados) {
    contador = dados.quantidade || 0;
    contadorSpan.textContent = contador;
    historicoList.innerHTML = dados.historico.join('');
  }
}

    // Atualiza histórico
function atualizarHistorico() {
  historicoList.innerHTML = '';
  const hoje = new Date().toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });

  for (let i = 0; i < contador; i++) {
    const li = document.createElement('li');
        li.innerHTML = `<span>${hoje}</span><span>${contador}</span>`;
            historicoList.appendChild(li);
  }

  salvarEstado();
}

    // Botão de editar (ativar/desativar modo edição)
editButton.addEventListener('click', (e) => {
  e.preventDefault();
  editMode = !editMode;

  if (editMode) {
    // Criar controles se não existirem
    if (!document.querySelector('.contador-controles')) {
      const controls = document.createElement('div');
      controls.classList.add('contador-controles');
      controls.innerHTML = `
        <button id="menos" class="btn-control">-</button>
        <button id="mais" class="btn-control">+</button>
      `;
      contadorBox.appendChild(controls);

      // Eventos dos botões
      document.getElementById('mais').addEventListener('click', () => {
        contador++;
        contadorSpan.textContent = contador;
        atualizarHistorico();
      });

      document.getElementById('menos').addEventListener('click', () => {
        if (contador > 0) {
          contador--;
          contadorSpan.textContent = contador;
          atualizarHistorico();
        }
      });
    }

    editButton.style.opacity = "0.6";
  } else {
    const controls = document.querySelector('.contador-controles');
    if (controls) controls.remove();
    editButton.style.opacity = "20";
  }
});

    // Carrega dados do produto assim que o modal for aberto
document.addEventListener('DOMContentLoaded', carregarEstado);
    

    // Função para exibir detalhes do produto
    function attachDetailListeners() {
    const detailButtons = document.querySelectorAll('.detail-button');
    const detailModal = document.getElementById('detailModal');
    const closeDetailModal = document.getElementById('closeDetailModal');
    const historicoList = document.getElementById('historico-list');
    const contadorSpan = document.getElementById('detailQuantidade');
    const editButton = document.querySelector('.edit-bottom-contabiliza');
    const contadorBox = document.querySelector('.contador-box');

    let produtoAtual = null;
    let editMode = false;

        //Carregar dados do localStorage
    function carregarDados() {
        const data = localStorage.getItem('produtos');
        return data ? JSON.parse(data) : {};
    }

        //Salvar dados no localStorage (será mudado para salvar no bd)
    function salvarDados(dados) {
        localStorage.setItem('produtos', JSON.stringify(dados));
    }

        // Atualiza histórico e salvar permanentemente
    function atualizarHistorico(acao) {
        const dados = carregarDados();
        const produto = dados[produtoAtual];
            if (!produto) return;

        const hoje = new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });

    if (acao === '+') {
        // ao incrementar: adiciona uma entrada ao histórico com o total atual
        produto.historico.push({
            data: hoje,
            total: produto.quantidade
        });
    } else if (acao === '-') {
        // ao decrementar: remove a última entrada do histórico (se existir)
        if (produto.historico.length > 0) {
            produto.historico.pop();
        }
    } else {
        // sem ação: não altera o array
    }

    salvarDados(dados);
    renderHistorico();

}

        //Renderiza histórico no modal (lendo direto do localStorage)
    function renderHistorico() {
        const dados = carregarDados();
        const produto = dados[produtoAtual];
        historicoList.innerHTML = '';

        if (produto && produto.historico.length > 0) {
            produto.historico.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${item.data}</span><span>${item.total}</span>`;
                historicoList.appendChild(li);
            });
        }
    }
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', limparHistorico);
}


        // Atualiza contador e salvar no no "localStorage maquina
    function atualizarContador(qtd) {
        const dados = carregarDados();
        if (!dados[produtoAtual]) return;

        dados[produtoAtual].quantidade = qtd;
        salvarDados(dados);
        contadorSpan.textContent = qtd;
    }
        // Limpa histórico do produto atual (temporario)
    function limparHistorico() {
    const dados = carregarDados();
        if (!dados[produtoAtual]) return;

        // limpa histórico apenas do produto exibido (temporário)
    dados[produtoAtual].historico = [];
        salvarDados(dados);
        renderHistorico(); // atualiza visualmente
}



        // Ao Clicar no botão de detalhes
    detailButtons.forEach(button => {
        button.onclick = () => {
            const item = button.closest('.items');
            const name = item.querySelector('h2').textContent;
            const desc = item.querySelector('p').textContent;
            const quantidade = parseInt(item.dataset.quantidade || 1);

            produtoAtual = name;

            const dados = carregarDados();

            // Se não existir o produto, cria no localStorage
            if (!dados[name]) {
                dados[name] = { quantidade: quantidade, historico: [] };
                salvarDados(dados);
            }

            const produto = dados[name];

            document.getElementById('detailName').textContent = name;
            document.getElementById('detailDesc').textContent = desc;
            contadorSpan.textContent = produto.quantidade;

            renderHistorico();
            detailModal.classList.add('active');
        };
    });

    //Fecha o modal
    if (closeDetailModal) {
        closeDetailModal.onclick = () => {
            detailModal.classList.remove('active');
            const controls = document.querySelector('.contador-controles');
            if (controls) controls.remove();
            editMode = false;
        };
    }

    //Fecha ao clicar fora
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('active');
            const controls = document.querySelector('.contador-controles');
            if (controls) controls.remove();
            editMode = false;
        }
    });

    //Clique no botão de editar
    if (editButton) {
        editButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!produtoAtual) return; // garante que há um produto aberto

            editMode = !editMode;

            if (editMode) {
                // Cria os botões + e - apenas uma vez
                if (!document.querySelector('.contador-controles')) {
                    const controls = document.createElement('div');
                    controls.classList.add('contador-controles');
                    controls.innerHTML = `
                        <button id="menos" class="btn-control">-</button>
                        <button id="mais" class="btn-control">+</button>
                    `;
                    contadorBox.appendChild(controls);

                    const dados = carregarDados();

                    // Incrementar (mais 1)
                    document.getElementById('mais').addEventListener('click', () => {
                        const dados = carregarDados();
                        dados[produtoAtual].quantidade++;
                        salvarDados(dados);
                        atualizarContador(dados[produtoAtual].quantidade);
                        atualizarHistorico('+'); // <-- adiciona entrada
                    });

                    // Decrementar (menos 1)
                    document.getElementById('menos').addEventListener('click', () => {
                        const dados = carregarDados();
                        if (dados[produtoAtual].quantidade > 0) {
                            dados[produtoAtual].quantidade--;
                            salvarDados(dados);
                            atualizarContador(dados[produtoAtual].quantidade);
                            atualizarHistorico('-'); // <-- remove última entrada
                        }
                    });
                }

                editButton.style.opacity = "0.6";
            } else {
                // Fecha o modo de edição e remove botões (+ e -)
                const controls = document.querySelector('.contador-controles');
                if (controls) controls.remove();
                editButton.style.opacity = "1";
            }
        });
    }
}

// Executará assim que a página carrega
attachDetailListeners();


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

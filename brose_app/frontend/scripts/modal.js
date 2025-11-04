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
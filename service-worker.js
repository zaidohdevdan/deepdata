<script>
    let deferredPrompt;
    const installButton = document.getElementById('installButton');

    // Registra o Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration.scope);
                })
                .catch(error => {
                    console.log('❌ Falha ao registrar Service Worker:', error);
                });
        });
    }

    // Captura o evento de instalação
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        // Mostra o botão de instalação
        installButton.classList.add('show');
    });

    // Ação do botão de instalação
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) {
            alert('Este app já está instalado ou o navegador não suporta instalação!');
            return;
        }

        // Mostra o prompt de instalação
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('✅ Usuário aceitou a instalação');
        } else {
            console.log('❌ Usuário recusou a instalação');
        }
        
        deferredPrompt = null;
        installButton.classList.remove('show');
    });

    // Detecta quando o app foi instalado
    window.addEventListener('appinstalled', () => {
        console.log('✅ App instalado com sucesso!');
        installButton.classList.remove('show');
    });
</script>

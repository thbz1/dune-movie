document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');

    // Função que gerencia a visibilidade do cabeçalho conforme a rolagem da página
    function headerState() {
        const heroHeight = hero.offsetHeight - 70;
        const scrollPosition = window.scrollY; // Obtém a posição atual do scroll na página

        if (scrollPosition < heroHeight) {
            header.classList.add('header--hidden');
            header.classList.remove('header--visible');
        } else {
            header.classList.remove('header--hidden');
            header.classList.add('header--visible');
        }
    }

    // Chama a função ao carregar a página
    headerState();
    // Executa a função sempre que o usuário rolar a página
    window.addEventListener('scroll', headerState);


    // Ajusta a rolagem dos links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Obtém o valor do atributo href do link clicado e seleciona o elemento com esse id
            const targetElement = document.querySelector(this.getAttribute('href'));

            // Realiza a rolagem suave, considerando a altura do navbar (65px)
            window.scrollTo({
                top: targetElement.offsetTop - 65,
                behavior: 'smooth'
            });
        });
    });


    // Seleciona os links das abas e os painéis de conteúdo
    const tabLinks = document.querySelectorAll('.characters__tab-link');
    const panels = document.querySelectorAll('.characters__panel');

    // Adiciona um ouvinte de evento para cada link de aba
    tabLinks.forEach(tablink => {
        tablink.addEventListener('click', () => {
            const target = tablink.getAttribute('data-tab'); // Obtém o valor do atributo 'data-tab' que contém o id do painel correspondente

            // Remove o estado 'ativo' de todos os links e painéis
            tabLinks.forEach(link => link.classList.remove('characters__tab-link--active'));
            panels.forEach(panel => panel.classList.remove('characters__panel--active'));

            // Adiciona o estado 'ativo' ao link da aba clicada e ao painel correspondente
            tablink.classList.add('characters__tab-link--active');
            document.getElementById(target).classList.add('characters__panel--active');
        });
    });


    const accordions = document.querySelectorAll("[data-accordion]");

    accordions.forEach(accordion => {
        const triggers = accordion.querySelectorAll(".accordion__trigger");

        triggers.forEach(trigger => {
            trigger.addEventListener("click", () => {
                // Verifica se o botão clicado já está expandido
                const isExpanded = trigger.getAttribute("aria-expanded") === "true";
                // Pega o conteúdo correspondente a este botão (o próximo elemento irmão do pai do botão)
                const content = trigger.parentElement.nextElementSibling;

                // Fecha todos os itens do accordion (todos os triggers e conteúdos)
                accordion.querySelectorAll(".accordion__trigger").forEach(btn => {
                    btn.setAttribute("aria-expanded", "false");
                    btn.parentElement.nextElementSibling.classList.remove("is-open");
                });

                // Abre o botão clicado se estava fechado
                if (!isExpanded) {
                    trigger.setAttribute("aria-expanded", "true");
                    content.classList.add("is-open");
                }
            });
        });
    });
});
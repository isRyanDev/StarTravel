// DECLARANDO OS ELEMENTOS QUE VÃO TER A CLASSE ALTERADA //

const theme_input = document.querySelector('input.theme-input');
const body = document.querySelector('body');
const hover_text = document.querySelector('span.hover-text');
const header_button_options = document.querySelector('div.header-button-options');
const button_link = document.querySelector('button.icon-button')
const main_title = document.querySelector('h1.main-title');
const main_subtitle = document.querySelector('h2.main-subtitle');
const description_text = document.querySelector('p.description-text');
const main_buttons = document.querySelector('div.main-buttons');
const services_subtitle = document.querySelector('h3.services-subtitle');
const services_title = document.querySelector('h1.services-title');
const destinations_subtitle = document.querySelector('h3.destinations-subtitle');
const destinations_title = document.querySelector('h1.destinations-title');
const subscribe_title = document.querySelector('h1.subscribe-title');
const footer_subtitle = document.querySelector('p.footer-subtitle');
const footer_company_title = document.querySelector('h1.footer-company-title');
const footer_contacts_title = document.querySelector('h1.footer-contacts-title');
const footer_discover = document.querySelector('div.footer-discover-app');
const footer_copyright = document.querySelector('p.footer-copyright');

// DECLARANDO AS IMAGENS QUE VÃO SER ALTERADAS //

const button_buy = document.querySelector('button.main-button-buy');
const arrow_icon = document.querySelector('img#arrow-icon');

const destinations_ui_img = document.querySelector('img#destinations-ui-img');
const services_ui_background = document.querySelector('img#services-background-img');
const services_ui_img = document.querySelector('img#services-ui-img');

// DECALARANDO OS CARDS //

const services_cards = document.querySelectorAll('div.services-card');
const destinations_cards = document.querySelectorAll('div.destinations-card');
const services_ui_element = document.querySelector('div.services-ui-element');

// TROCA O TEMA DA PAGINA DE ACORDO COM O CHECKBOX DE DARK MODE //

theme_input.addEventListener("click", function(){
    if(theme_input.checked){
        body.classList = 'body-dark';
        button_link.classList = 'icon-button-dark'; 
        hover_text.classList = 'hover-text-dark';
        header_button_options.classList = 'header-button-options-dark';
        main_title.classList = 'main-title-dark';
        main_subtitle.classList = 'main-subtitle-dark';
        description_text.classList = 'description-text-dark';
        main_buttons.classList = 'main-buttons-dark';
        services_subtitle.classList = 'services-subtitle-dark';
        services_title.classList = 'services-title-dark';
        destinations_subtitle.classList = 'destinations-subtitle-dark';
        destinations_title.classList = 'destinations-title-dark';
        subscribe_title.classList = 'subscribe-title-dark';
        footer_subtitle.classList = 'footer-subtitle-dark';
        footer_company_title.classList = 'footer-company-title-dark';
        footer_contacts_title.classList = 'footer-contacts-title-dark';
        footer_discover.classList = 'footer-discover-app-dark';
        footer_copyright.classList = 'footer-copyright-dark';

        setTimeout(() => {
            arrow_icon.src = './assets/images/arrow.png';
            arrow_icon.style.opacity = 1; 
            destinations_ui_img.src = './assets/images/destinations-ui-element-dark.png';
            services_ui_img.src = './assets/images/services-ui-element-dark.png';
            services_ui_background.src = './assets/images/background-element-dark.png';
        }, 160);
    }
    else{
        body.classList = 'body';
        button_link.classList = 'icon-button';
        hover_text.classList = 'hover-text';
        header_button_options.classList = 'header-button-options';
        main_title.classList = 'main-title';
        main_subtitle.classList = 'main-subtitle';
        description_text.classList = 'description-text';
        main_buttons.classList = 'main-buttons';
        services_subtitle.classList = 'services-subtitle';
        services_title.classList = 'services-title';
        destinations_subtitle.classList = 'destinations-subtitle';
        destinations_title.classList = 'destinations-title';
        subscribe_title.classList = 'subscribe-title';
        footer_subtitle.classList = 'footer-subtitle';
        footer_company_title.classList = 'footer-company-title';
        footer_contacts_title.classList = 'footer-contacts-title';
        footer_discover.classList = 'footer-discover-app';
        footer_copyright.classList = 'footer-copyright';

        setTimeout(() => {
            arrow_icon.src = './assets/images/arrow-black.png';
            arrow_icon.style.opacity = 1; 
            services_ui_background.src = './assets/images/background-element.png';
            services_ui_img.src = './assets/images/services-ui-element.png';
            destinations_ui_img.src = './assets/images/destinations-ui-element.png';
        }, 160);
    }
})

// TROCA A COR DA FLECHA NO BOTÃO PURCHASE //

button_buy.addEventListener('mouseover', () => {
    if(theme_input.checked){
        setTimeout(() => {
            arrow_icon.src = './assets/images/arrow-black.png';
            arrow_icon.style.opacity = 1; 
        }, 160);
    }
    else{
        setTimeout(() => {
            arrow_icon.src = './assets/images/arrow.png';
            arrow_icon.style.opacity = 1; 
        }, 160);
    }
});

button_buy.addEventListener('mouseout', () => {
    if(theme_input.checked){
        setTimeout(() => {
            arrow_icon.src = './assets/images/arrow.png';
            arrow_icon.style.opacity = 1; 
        }, 160);
    }
    else{
        setTimeout(() => {
            arrow_icon.src = './assets/images/arrow-black.png';
            arrow_icon.style.opacity = 1; 
        }, 160);
    }   
});

// TIRA A OPACIDADE DOS CARDS QUE NÃO ESTÃO EM FOCO //

services_cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        services_cards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('dimmed');
                services_ui_element.classList.add('dimmed')
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        services_cards.forEach(otherCard => {
            otherCard.classList.remove('dimmed');
            services_ui_element.classList.remove('dimmed');
        });
    });
});

destinations_cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        destinations_cards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('dimmed');
                destinations_ui_img.classList.add('dimmed')
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        destinations_cards.forEach(otherCard => {
            otherCard.classList.remove('dimmed');
            destinations_ui_img.classList.remove('dimmed');
        });
    });
});
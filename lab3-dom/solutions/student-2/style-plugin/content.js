'use strict'

function addSteamPunkMode() {
    let isSteamPunkMode = localStorage.getItem('steamPunkEnabled') === 'true';
    const setIf = (el, setter) => { if (el) setter(el); };

    function applySteamPunkMode(enable) {
        const target = Boolean(enable);
        if (isSteamPunkMode !== target) {
            toggleSteamPunkMode();
        } else {
            const prev = isSteamPunkMode;
            isSteamPunkMode = !prev;
            toggleSteamPunkMode();
        }
    }

    function toggleSteamPunkMode() {
        const pageWrapper = document.getElementById('page_wrapper');
        const mainSlider = document.querySelector('.main_slider_holder');
        const menus = document.querySelectorAll('.menu-list, .breadcrumb');
        const buttons = document.querySelectorAll('.kai-btn-block, .next-arr, .prev-arr, .kai-btn-block, .events_nav, .inst-slide');
        const footer = document.querySelector('footer');
        const header = document.querySelector('header');
        const links = document.querySelectorAll('a[href^="https://kai.ru/prioritet"]');
        const newsBox = document.querySelector('.news_box');
        const logo = document.querySelector('div.logo_rus');
        const logoF = document.querySelector('a.logo');
        const portlets = document.querySelectorAll('.portlet');
        const desc = document.querySelectorAll('.desc');
        const badDesc = Array.from(document.querySelectorAll('div.desc'))
            .filter(el => getComputedStyle(el).padding !== '13px 19px 19px')
            .filter(el => getComputedStyle(el).padding !== '13px 18px 19px')
            .filter(el => getComputedStyle(el).padding !== '10px 20px');
        const items = document.querySelectorAll('.item');
        const badItems = Array.from(document.querySelectorAll('.item.slick-slide'))
            .filter(el => getComputedStyle(el).margin !== '0px 5px');
        const text = document.querySelectorAll('.t1, .title, .slogan, .text, .date, .section, .box, .research_box, .welcome_box, .contact_box, a, span, h1, strong, p');
        const navs = document.querySelectorAll('.nav, .tabs, .tab_items');
        const steamTexture = chrome.runtime.getURL('textures/steampunk.png');
        const steamBackTexture = chrome.runtime.getURL('textures/background.png');
        const steamLogo = chrome.runtime.getURL('textures/kai-logo-steampunk.png');
        const steamLogoF = chrome.runtime.getURL('textures/logo_f_steampunk.png');
        const institutesBox = document.querySelectorAll('.institutes_box, .institutes_slider_box');
        const nextBtn = document.querySelector('.inst-slide.next');
        const prevBtn = document.querySelector('.inst-slide.prev');
        const fontUrl = chrome.runtime.getURL('fonts/kurobara-gothic-regular.ttf');
        const kurobaraFont = new FontFace('Kurobara Gothic', `url(${fontUrl}) format('truetype')`);

        let mainColor = 'rgba(133, 96, 69, 0.6)';
        let sideColor = 'rgba(21, 61, 82, 0.7)';
        let textColor = '#ffffffff';

        kurobaraFont.load().then(loadedFace => {
            document.fonts.add(loadedFace);
            console.log('Шрифт Kurobara Gothic загружен');
        }).catch(err => console.error('Ошибка загрузки шрифта:', err));

        const willEnable = !isSteamPunkMode;

        if (pageWrapper) {
            if (!willEnable) {
                setIf(footer, el => el.style.background = '');
                setIf(header, el => el.style.background = '');
                setIf(nextBtn, el => el.style.backgroundColor = '');
                setIf(prevBtn, el => el.style.backgroundColor = '');
                setIf(mainSlider, el => el.style.background = '');
                setIf(newsBox, el => el.style.backgroundImage = '');

                portlets.forEach(portlet => { 
                    portlet.style.backgroundColor = ''; 
                    const parent = portlet.parentElement;
                    if (parent) parent.style.backgroundColor = '';
                });
                menus.forEach(menu => { 
                    menu.style.background = ''; 
                    for (const child of menu.children) {
                    child.style.opacity = '';
                    }
                });
                buttons.forEach(button => { button.style.background = ''; });
                desc.forEach(item => { item.style.backgroundColor = ''; });
                links.forEach(link => { link.style.backgroundColor = ''; link.style.border = ''; });
                items.forEach(item => { item.style.backgroundColor = ''; });
                text.forEach(title => { title.style.color = ''; title.style.fontFamily = ''; });
                navs.forEach(nav => { nav.style.backgroundColor = ''; });
                institutesBox.forEach(box => { box.style.backgroundColor = ''; });

                if (logo) {
                    logo.style.backgroundImage = 'url("https://kai.ru/kai-theme/img/kai-logo.png")';
                    logo.style.backgroundSize = '';
                    logo.style.backgroundRepeat = '';
                    logo.style.backgroundPosition = '';
                }
                if (logoF) {
                    logoF.style.backgroundImage = 'url("https://kai.ru/kai-theme/img/logo_f.png")';
                    logoF.style.backgroundSize = '';
                    logoF.style.backgroundRepeat = '';
                    logoF.style.backgroundPosition = '';
                }

                pageWrapper.classList.remove('steampunk-active');
                document.documentElement.style.background = '';
                document.documentElement.style.backgroundAttachment = '';
                document.documentElement.style.backgroundSize = '';
                document.documentElement.style.backgroundRepeat = '';
                document.documentElement.style.backgroundPosition = '';
                document.body.style.background = '';
            } else {
                document.documentElement.style.background = `url('${steamTexture}')`;
                document.documentElement.style.backgroundAttachment = 'fixed';
                document.documentElement.style.backgroundPosition = 'center center';
                document.body.style.background = 'transparent';

                setIf(footer, el => el.style.background = mainColor);
                setIf(header, el => el.style.background = mainColor);
                setIf(nextBtn, el => el.style.backgroundColor = sideColor);
                setIf(prevBtn, el => el.style.backgroundColor = sideColor);
                setIf(mainSlider, el => el.style.background = 'rgba(133, 96, 69, 0)');
                setIf(newsBox, el => el.style.backgroundImage = `url('${steamBackTexture}')`);

                portlets.forEach(portlet => { 
                    portlet.style.background = mainColor; 
                    const parent = portlet.parentElement;
                    if (parent) parent.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                });
                menus.forEach(menu => { 
                    menu.style.background = sideColor; 
                    for (const child of menu.children) {
                    child.style.opacity = '0.95';
                    }
                });
                buttons.forEach(button => { button.style.background = sideColor; });
                desc.forEach(item => { item.style.backgroundColor = sideColor; });
                links.forEach(link => { link.style.backgroundColor = sideColor; link.style.border = 'none'; });
                badDesc.forEach(item => { item.style.backgroundColor = 'rgba(0, 255, 64, 0)'; });
                items.forEach(item => { item.style.backgroundColor = sideColor; });
                badItems.forEach(item => { item.style.backgroundColor = 'rgba(0, 255, 64, 0)'; });
                text.forEach(title => { title.style.color = textColor; title.style.fontFamily = '"Kurobara Gothic", sans-serif'; });
                navs.forEach(nav => { nav.style.backgroundColor = 'rgba(133, 96, 69, 0)'; });
                institutesBox.forEach(box => { box.style.backgroundColor = 'rgba(133, 96, 69, 0)'; });

                if (logo) {
                    logo.style.backgroundImage = `url('${steamLogo}')`;
                    logo.style.backgroundSize = 'cover';
                    logo.style.backgroundRepeat = 'no-repeat';
                    logo.style.backgroundPosition = 'center 10%';
                }
                if (logoF) {
                    logoF.style.backgroundImage = `url('${steamLogoF}')`;
                    logoF.style.backgroundSize = 'contain';
                    logoF.style.backgroundRepeat = 'no-repeat';
                    logoF.style.backgroundPosition = 'center 50%';
                }

                pageWrapper.classList.add('steampunk-active');
            }

            isSteamPunkMode = willEnable;
            localStorage.setItem('steamPunkEnabled', isSteamPunkMode);
            updateButton();
        } else {
            console.log('Элемент с id="page_wrapper" не найден');
        }
    }

    function updateButton() {
        const button = document.getElementById('steampunk-toggle-btn');
        if (button) {
            if (isSteamPunkMode) {
                button.textContent = '⚙️ ON';
                button.title = 'Выключить SteamPunk стиль';
                button.style.background = 'linear-gradient(to bottom, #398eb2, #153d52)';
                button.style.color = '#ffbf6b';
                button.style.border = '2px ridge #398eb2';
            } else {
                button.textContent = '⚙️ OFF';
                button.title = 'Включить SteamPunk стиль';
                button.style.background = 'linear-gradient(to bottom, #d89841, #b26e41)';
                button.style.color = '#153d52';
                button.style.border = '2px ridge #a7793e';
            }
        }
    }
    
    function createToggleButton() {
        if (document.getElementById('steampunk-toggle-btn')) {
            console.log('Кнопка уже добавлена');
            return;
        }

        const buttonContainer = document.querySelector('.box_links');
        if (!buttonContainer) {
            console.log('Не найден контейнер для кнопок');
            return;
        }

        const button = document.createElement('div');
        button.id = 'steampunk-toggle-btn';
        button.textContent = isSteamPunkMode ? '⚙️ ON' : '⚙️ OFF';
        button.title = isSteamPunkMode ? 'Выключить SteamPunk стиль' : 'Включить SteamPunk стиль';
        
        Object.assign(button.style, {
            width: '60px',
            height: '35px',
            border: '2px ridge #a7793e',
            background: isSteamPunkMode ? 
                'linear-gradient(to bottom, #398eb2, #153d52)' : 
                'linear-gradient(to bottom, #d89841, #b26e41)',
            color: isSteamPunkMode ? '#ffbf6b' : '#153d52',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            margin: '0 0 0 10px',
            boxShadow: '0 3px 12px rgba(167, 121, 62, 0.4)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            fontFamily: 'Georgia, serif',
            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease'
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 5px 20px rgba(255, 191, 107, 0.5)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 3px 12px rgba(167, 121, 62, 0.4)';
        });
        button.addEventListener('click', toggleSteamPunkMode);
        buttonContainer.appendChild(button);
        console.log('Кнопка переключения темного режима добавлена');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createToggleButton();
            if (isSteamPunkMode) {
                setTimeout(() => applySteamPunkMode(true), 100);
            } 
        });
    } else {
        createToggleButton();
        if (isSteamPunkMode) {
            setTimeout(() => applySteamPunkMode(true), 100);
        }
    }
}

addSteamPunkMode();

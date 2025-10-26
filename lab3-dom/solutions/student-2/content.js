'use strict'

function addSteamPunkMode() {
    let isSteamPunkMode = localStorage.getItem('steamPunkEnabled') === 'true';

// Функция для переключения фона
    function toggleSteamPunkMode() {
        const pageWrapper = document.getElementById('page_wrapper');
        const mainSlider = document.querySelector('.main_slider_holder');
        const footer = document.querySelector('footer');
        const newsBox = document.querySelector('.news_box');
        const logo = document.querySelector('div.logo_rus');
        const logoF = document.querySelector('a.logo');
        const sections = document.querySelectorAll('.section, .box, .research_box, .welcome_box, .contact_box');
        const portlets = document.querySelectorAll('.portlet, .portlet-content, .portlet-body, .portlet-static, .portlet-journal-content');
        const descItems = document.querySelectorAll('.desc, .item');
        const titles = document.querySelectorAll('.t1, .title, .slogan');
        //const forms = document.querySelectorAll('.form, .popup_form, .search_form, .fieldset');
        //Окно поиска в футтере
        //const inputs = document.querySelectorAll('.search_text, .input-container, .field, .controls');
        //Тоже окно поиска в футтере, но круче
        const navs = document.querySelectorAll('.nav, .tabs, .tab_items');
        //const activeElements = document.querySelectorAll('.active');
        //кнопки снизу "СТРАТЕГИЧЕСКИЕ ПРОЕКТЫ УНИВЕРСИТЕТА" при нажатии (нужно откатывать изменения)
        //const menuBoxes = document.querySelectorAll('.menu-box, .search-box');
        const lists = document.querySelectorAll('.entry-links');
        const steamTexture = chrome.runtime.getURL('textures/steampunk.png');
        //const copperTexture = chrome.runtime.getURL('textures/copper2.png');
        const steamBackTexture = chrome.runtime.getURL('textures/background.png');
        const steamLogo = chrome.runtime.getURL('textures/kai-logo-steampunk.png');
        const steamLogoF = chrome.runtime.getURL('textures/logo_f_steampunk.png');
        const institutesBox = document.querySelectorAll('.institutes_box, .institutes_slider_box');
        //let mainColor = 'rgba(133, 96, 69, 0)';

        
        if (pageWrapper) {
            
            if (isSteamPunkMode) {
                // Возвращаем оригинальные стили
                footer.style.background = '';

                mainSlider.style.background = '';
                mainSlider.style.border = '';
                mainSlider.style.borderRadius = '';
                mainSlider.style.color = '';
                mainSlider.style.boxShadow = '';
                
                newsBox.style.background = '';
                newsBox.style.border = '';
                newsBox.style.borderRadius = '';
                newsBox.style.color = '';
                newsBox.style.boxShadow = '';
                newsBox.style.backgroundImage = '';

                sections.forEach(section => {
                section.style.backgroundColor = '';
                section.style.color = '';
                });

                portlets.forEach(portlet => {
                    const isNested = portlet.closest('.portlet');
                    if (!isNested) {
                        portlet.style.background = '';
                        portlet.style.border = '';
                        portlet.style.borderRadius = '';
                        portlet.style.boxShadow = '';
                    } else {
                        // Вложенные портлеты - без границ
                        portlet.style.background = '';
                        portlet.style.border = '';
                    }
                    portlet.style.color = '';
                    portlet.style.padding = '';
                    portlet.style.backgroundColor = '';
                    portlet.style.color = '';
                });

                descItems.forEach(item => {
                    item.style.backgroundColor = '';
                    item.style.color = '';
                });

                titles.forEach(title => {
                    title.style.color = '';
                });
                
                navs.forEach(nav => {
                    nav.style.backgroundColor = '';
                });

                lists.forEach(list => {
                    list.style.backgroundColor = '';
                });

                institutesBox.forEach(box => {
                    box.style.backgroundColor = '';
                    box.style.color = '';
                });

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
                
                pageWrapper.style.backgroundColor = '';
                pageWrapper.style.color = '';
                pageWrapper.style.fontSize = '';
                pageWrapper.style.backgroundImage = `url('')`;
                pageWrapper.style.backgroundAttachment = '';
                pageWrapper.classList.remove('steampunk-active');
                
                
            } else {
                // Устанавливаем темный режим
                /*
                pageWrapper.style.backgroundColor = '#B8860B';
                pageWrapper.style.color = '#6b4131';
                pageWrapper.style.backgroundImage = `url('${steamTexture}')`;
                pageWrapper.style.backgroundAttachment = 'fixed';
                */
                pageWrapper.style.backgroundImage = `url('${steamTexture}')`;
                pageWrapper.style.backgroundAttachment = 'fixed';

                footer.style.background = 'rgba(133, 96, 69, 0.7)';

                /*
                mainSlider.style.background = 'linear-gradient(135deg, rgba(167, 121, 62, 0.85), rgba(21, 61, 82, 0.9))';
                mainSlider.style.border = '3px ridge #d89841';
                mainSlider.style.borderRadius = '8px';
                mainSlider.style.color = '#e1c289';
                mainSlider.style.boxShadow = '0 4px 20px rgba(216, 152, 65, 0.3)';
                */
                mainSlider.style.background = 'rgba(133, 96, 69, 0.5)';
                //mainSlider.style.border = '3px ridge #d89841';
                


                //newsBox.style.backgroundColor = 'rgba(133, 96, 69, 0.6)';
                newsBox.style.backgroundImage = `url('${steamBackTexture}')`;
                //newsBox.style.border = '2px ridge #ffbf6b';
                //newsBox.style.borderRadius = '6px';
                newsBox.style.color = '#e1c289';
                //newsBox.style.boxShadow = '0 3px 15px rgba(255, 191, 107, 0.25)';

                sections.forEach(section => {
                const hasParentWithBorder = section.closest('.section, .box, .portlet');
                if (!hasParentWithBorder) {
                    section.style.background = '';
                    section.style.boxShadow = '';
                    //Вообще ничего не меняет
                } else {
                    // Для вложенных элементов - только фон, без границ
                    // Вот это важно
                    section.style.background = 'rgba(133, 96, 69, 0.4)';
                    section.style.border = 'none';
                }
                section.style.color = '#e1c289';
                //Кое-какой текст
                });

                portlets.forEach(portlet => {
                    const isNested = portlet.closest('.portlet');
                    if (!isNested) {
                        //portlet.style.background = 'linear-gradient(135deg, rgba(99, 128, 106, 0.8), rgba(21, 61, 82, 0.85))';
                        //portlet.style.border = '2px ridge #63806a';
                        //portlet.style.borderRadius = '6px';
                        portlet.style.border = '';
                        portlet.style.borderRadius = '';
                        //portlet.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.3)';
                    } else {
                        // Вложенные портлеты - без границ
                        // Ничего не меняет
                        portlet.style.background = 'rgba(99, 128, 106, 0.6)';
                        portlet.style.border = 'none';
                    }
                    //portlet.style.color = '#e1c289';
                    //portlet.style.padding = '12px';
                    portlet.style.padding = '';
                    //portlet.style.backgroundColor = '#808080';
                    portlet.style.backgroundColor = 'rgba(133, 96, 69, 0.4)';
                    portlet.style.border = 'none';
                    //portlet.style.color = '#e0e0e0';
                    portlet.style.color = '';
                });

                descItems.forEach(item => {
                    item.style.backgroundColor = 'rgba(21, 61, 82, 0.85)';
                    item.style.color = '#e0e0e0';
                });

                for (let i = 0; i < 42; i++) {
                    descItems[i].style.backgroundColor = '';
                    descItems[i].style.color = '';
                }

                titles.forEach(title => {
                    title.style.color = '#e0e0e0';
                });

                navs.forEach(nav => {
                    //СТРАТЕГИЧЕСКИЕ ПРОЕКТЫ УНИВЕРСИТЕТА по бокам
                    nav.style.backgroundColor = 'rgba(133, 96, 69, 0)';
                    
                });

                lists.forEach(list => {
                    //Ничего не меняет
                    list.style.backgroundColor = 'rgba(212, 0, 255, 1)';
                });

                institutesBox.forEach(box => {
                    //Учебные подразделения
                    box.style.backgroundColor = 'rgba(133, 96, 69, 0)';
                    box.style.color = '#e0e0e0';
                });

                if (logo) {
                    logo.style.backgroundImage = `url('${steamLogo}')`;
                    logo.style.backgroundSize = 'cover'; // или 'cover' в зависимости от нужного эффекта
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

            isSteamPunkMode = !isSteamPunkMode;
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
    
    // Создаем и добавляем кнопку в DOM
    function createToggleButton() {
        // Проверяем, не создана ли уже кнопка
        if (document.getElementById('dark-mode-toggle-btn')) {
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
        
        // Стили для кнопки
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
        
        // Эффекты при наведении
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 5px 20px rgba(255, 191, 107, 0.5)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 3px 12px rgba(167, 121, 62, 0.4)';
        });
        
        // Обработчик клика
        button.addEventListener('click', toggleSteamPunkMode);
        
        // Добавляем кнопку на страницу
        buttonContainer.appendChild(button);
        
        console.log('Кнопка переключения темного режима добавлена');
    }
    
    // Запускаем создание кнопки
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createToggleButton();
            if (isSteamPunkMode) {
                setTimeout(toggleSteamPunkMode, 100);
            } 
        });
    } else {
        createToggleButton();
        if (isSteamPunkMode) {
            setTimeout(toggleSteamPunkMode, 100);
        }
    }
}

addSteamPunkMode();


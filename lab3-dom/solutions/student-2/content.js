'use strict'

function addSteamPunkMode() {
    let isSteamPunkMode = localStorage.getItem('steamPunkEnabled') === 'true';

// Функция для переключения фона
    function toggleSteamPunkMode() {
        const pageWrapper = document.getElementById('page_wrapper');
        const mainSlider = document.querySelector('.main_slider_holder');
        const spans = document.querySelectorAll('span');
        const a = document.querySelectorAll('a');
        const menus = document.querySelectorAll('.menu-list');
        const buttons = document.querySelectorAll('.kai-btn-block, .next-arr, .prev-arr, .slick-disable, .kai-btn-block, .events_nav');
        const footer = document.querySelector('footer');
        const header = document.querySelector('header');
        const newsBox = document.querySelector('.news_box');
        const logo = document.querySelector('div.logo_rus');
        const logoF = document.querySelector('a.logo');
        const sections = document.querySelectorAll('.section, .box, .research_box, .welcome_box, .contact_box');
        const portletsOthers = document.querySelectorAll('.portlet-content, .portlet-body, .portlet-static, .portlet-journal-content'); //не меняет текст вообще!
        const portlets = document.querySelectorAll('.portlet');
        const desc = document.querySelectorAll('.desc');
        const items = document.querySelectorAll('.item');
        const titles = document.querySelectorAll('.t1, .title, .slogan, .text, .date');
        const forms = document.querySelectorAll('.form, .popup_form, .search_form, .fieldset'); //не меняет текст вообще!
        //Окно поиска в футтере
        const inputs = document.querySelectorAll('.search_text, .input-container, .field, .controls');//не меняет текст вообще!
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
        const nextBtn = document.querySelector('.inst-slide.next');
        const prevBtn = document.querySelector('.inst-slide.prev');
        const fontUrl = chrome.runtime.getURL('fonts/kurobara-gothic-regular.ttf');
        const kurobaraFont = new FontFace('Kurobara Gothic', `url(${fontUrl}) format('truetype')`);
        let mainColor = 'rgba(133, 96, 69, 0.6)';
        let sideColor = 'rgba(21, 61, 82, 0.7)';
        let textColor = '#ffffffff';

        kurobaraFont.load().then(loadedFace => {
            document.fonts.add(loadedFace);
            console.log('✅ Шрифт Kurobara Gothic загружен');
        }).catch(err => console.error('Ошибка загрузки шрифта:', err));

        
        if (pageWrapper) {
            
            if (isSteamPunkMode) {
                // Возвращаем оригинальные стили
                footer.style.background = '';
                footer.style.color = '';
                header.style.background = '';
                header.style.color = '';

                nextBtn.style.backgroundColor = '';
                prevBtn.style.backgroundColor = '';

                mainSlider.style.background = '';
                mainSlider.style.color = '';
                
                newsBox.style.color = '';
                newsBox.style.backgroundImage = '';

                sections.forEach(section => {
                section.style.color = '';
                section.style.fontFamily = '';
                });

                forms.forEach(form => {
                    form.style.color = '';
                })

                inputs.forEach(input => {
                    input.style.color = '';
                })

                portlets.forEach(portlet => {
                    portlet.style.backgroundColor = '';
                    portlet.style.color = '';
                });

                portletsOthers.forEach(portlet => {
                    portlet.style.color = '';
                });

                spans.forEach(span => {
                    span.style.color = '';
                    span.style.fontFamily = '';
                });

                a.forEach(text => {
                    text.style.color = '';
                    text.style.fontFamily = '';
                });

                menus.forEach(menu => {
                    menu.style.background = '';
                })

                buttons.forEach(button => {
                    button.style.background = '';
                })

                desc.forEach(item => {
                    item.style.backgroundColor = '';
                    item.style.color = '';
                });

                items.forEach(item => {
                    item.style.backgroundColor = '';
                    item.style.color = '';
                });

                titles.forEach(title => {
                    title.style.color = '';
                    title.style.fontFamily = '';
                });
                
                navs.forEach(nav => {
                    nav.style.backgroundColor = '';
                    nav.style.color = '';
                });

                lists.forEach(list => {
                    list.style.color = '';
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
                
                pageWrapper.classList.remove('steampunk-active');
                pageWrapper.style.color = '';

                document.documentElement.style.background = '';
                document.documentElement.style.backgroundAttachment = '';
                document.documentElement.style.backgroundSize = '';
                document.documentElement.style.backgroundRepeat = '';
                document.documentElement.style.backgroundPosition = '';
                document.body.style.background = '';
                
                
            } else {
                document.documentElement.style.background = `url('${steamTexture}')`;
                document.documentElement.style.backgroundAttachment = 'fixed';
                //document.documentElement.style.backgroundSize = 'cover';
                //document.documentElement.style.backgroundRepeat = 'no-repeat';
                document.documentElement.style.backgroundPosition = 'center center';
                document.body.style.background = 'transparent';

                footer.style.background = mainColor;
                footer.style.color = textColor;
                
                header.style.background = mainColor;
                header.style.color = textColor;

                nextBtn.style.backgroundColor = sideColor;
                prevBtn.style.backgroundColor = sideColor;

                mainSlider.style.background = 'rgba(133, 96, 69, 0)';
                mainSlider.style.color = textColor;
                
                newsBox.style.backgroundImage = `url('${steamBackTexture}')`;
                newsBox.style.color = textColor;

                sections.forEach(section => {
                section.style.color = textColor;
                section.style.fontFamily = '"Kurobara Gothic", sans-serif';
                //Кое-какой текст
                });

                forms.forEach(form => {
                    form.style.color = textColor;
                })

                inputs.forEach(input => {
                    input.style.color = textColor;
                })

                portlets.forEach(portlet => {
                    portlet.style.background = mainColor;
                    portlet.style.color = textColor;
                    //Делает мейнслайдер и все кроме футера и верхнего блока
                });

                portletsOthers.forEach(portlet => {
                    portlet.style.color = textColor;
                });

                spans.forEach(span => {
                    span.style.color = textColor;
                    span.style.fontFamily = '"Kurobara Gothic", sans-serif';
                });

                a.forEach(text => {
                    text.style.color = textColor;
                    text.style.fontFamily = '"Kurobara Gothic", sans-serif';
                });

                menus.forEach(menu => {
                    menu.style.background = sideColor;
                })

                buttons.forEach(button => {
                    button.style.background = sideColor;
                })

                desc.forEach(item => {
                    item.style.backgroundColor = sideColor;
                    item.style.color = textColor;
                });
                
                for (let i = 0; i < 21; i++) {
                    desc[i].style.backgroundColor = '';
                    desc[i].style.color = '';
                }
                /*
                for (let i = 21; i < 34; i++) {
                    desc[i].style.backgroundColor = 'rgba(195, 0, 255, 1)';
                    desc[i].style.color = '';
                }
                */
                for (let i = 34; i < 61; i++) {
                    desc[i].style.backgroundColor = 'rgba(2, 255, 23, 0)';
                }

                items.forEach(item => {
                    item.style.backgroundColor = sideColor;
                    item.style.color = textColor;
                });

                for (let i = 34; i < 61; i++) {
                    items[i].style.backgroundColor = 'rgba(0, 255, 64, 0)';
                    items[i].style.color = '';
                }

                titles.forEach(title => {
                    title.style.color = textColor;
                    title.style.fontFamily = '"Kurobara Gothic", sans-serif';
                });

                navs.forEach(nav => {
                    //СТРАТЕГИЧЕСКИЕ ПРОЕКТЫ УНИВЕРСИТЕТА по бокам
                    //Не нужно, если делаю portlet
                    nav.style.backgroundColor = 'rgba(133, 96, 69, 0)';
                    nav.style.color = textColor;
                });

                lists.forEach(list => {
                    list.style.color = textColor;
                });

                institutesBox.forEach(box => {
                    //Учебные подразделения
                    box.style.backgroundColor = 'rgba(133, 96, 69, 0)';
                    //Не нужно, если делаю portlet
                    box.style.color = textColor;
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

                pageWrapper.style.color = textColor;
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


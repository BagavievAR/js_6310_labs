'use strict'

function addSteamPunkMode() {
    // Состояние темы из localStorage
    let isSteamPunkMode = localStorage.getItem('steamPunkEnabled') === 'true';

    // Функция для переключения SteamPunk режима
    function toggleSteamPunkMode() {
        const pageWrapper = document.getElementById('page_wrapper');
        const mainSlider = document.querySelector('.main_slider_holder');
        const newsBox = document.querySelector('.news_box');
        const sections = document.querySelectorAll('.section, .box, .research_box, .welcome_box, .contact_box');
        const portlets = document.querySelectorAll('.portlet, .portlet-content, .portlet-body, .portlet-static, .portlet-journal-content');
        const descItems = document.querySelectorAll('.desc, .item');
        const titles = document.querySelectorAll('.t1, .title, .slogan, h1, h2, h3, h4, h5, h6');
        const navs = document.querySelectorAll('.nav, .tabs, .tab_items');
        const lists = document.querySelectorAll('.list, .entry-links');
        const institutesBox = document.querySelectorAll('.institutes_box, .institutes_slider_box');
        const buttons = document.querySelectorAll('button, .btn, input[type="submit"], input[type="button"]');
        const links = document.querySelectorAll('a');
        const inputs = document.querySelectorAll('input, textarea, select');
        
        // Загружаем текстуру
        const steamTexture = chrome.runtime.getURL('textures/steampunk.png');
        
        if (pageWrapper) {
            // Используем класс для определения состояния вместо проверки стилей
            const isSteamPunk = pageWrapper.classList.contains('steampunk-active');
            
            if (isSteamPunk) {
                // Возвращаем оригинальные стили
                resetAllStyles();
                pageWrapper.classList.remove('steampunk-active');
            } else {
                // Устанавливаем SteamPunk режим
                applySteamPunkStyles();
                pageWrapper.classList.add('steampunk-active');
            }

            // Сохраняем состояние
            isSteamPunkMode = !isSteamPunk;
            localStorage.setItem('steamPunkEnabled', isSteamPunkMode);
            updateButton();
        } else {
            console.log('Элемент с id="page_wrapper" не найден');
        }

        function applySteamPunkStyles() {
            // Основной фон с текстурой
            pageWrapper.style.backgroundColor = '#153d52';
            pageWrapper.style.backgroundImage = `url('${steamTexture}')`;
            pageWrapper.style.backgroundSize = 'cover';
            pageWrapper.style.backgroundAttachment = 'fixed';
            pageWrapper.style.backgroundBlendMode = 'overlay';
            pageWrapper.style.color = '#e1c289';
            pageWrapper.style.fontFamily = 'Georgia, "Times New Roman", serif';
            pageWrapper.style.letterSpacing = '0.3px';

            // Основные блоки - только внешние границы
            if (mainSlider) {
                mainSlider.style.background = 'linear-gradient(135deg, rgba(167, 121, 62, 0.85), rgba(21, 61, 82, 0.9))';
                mainSlider.style.border = '3px ridge #d89841';
                mainSlider.style.borderRadius = '8px';
                mainSlider.style.color = '#e1c289';
                mainSlider.style.boxShadow = '0 4px 20px rgba(216, 152, 65, 0.3)';
            }

            if (newsBox) {
                newsBox.style.background = 'linear-gradient(135deg, rgba(178, 110, 65, 0.8), rgba(21, 61, 82, 0.85))';
                newsBox.style.border = '2px ridge #ffbf6b';
                newsBox.style.borderRadius = '6px';
                newsBox.style.color = '#e1c289';
                newsBox.style.boxShadow = '0 3px 15px rgba(255, 191, 107, 0.25)';
            }

            // Секции - только внешние контейнеры
            sections.forEach(section => {
                // Проверяем, не является ли элемент вложенным
                const hasParentWithBorder = section.closest('.section, .box, .portlet');
                if (!hasParentWithBorder) {
                    section.style.background = 'linear-gradient(135deg, rgba(133, 96, 69, 0.8), rgba(21, 61, 82, 0.9))';
                    section.style.border = '2px ridge #a7793e';
                    section.style.borderRadius = '6px';
                    section.style.boxShadow = '0 2px 12px rgba(167, 121, 62, 0.2)';
                } else {
                    // Для вложенных элементов - только фон, без границ
                    section.style.background = 'rgba(133, 96, 69, 0.6)';
                    section.style.border = 'none';
                }
                section.style.color = '#e1c289';
                section.style.padding = '15px';
                section.style.margin = '10px 0';
            });

            // Портлеты - только основные контейнеры
            portlets.forEach(portlet => {
                const isNested = portlet.closest('.portlet');
                if (!isNested) {
                    portlet.style.background = 'linear-gradient(135deg, rgba(99, 128, 106, 0.8), rgba(21, 61, 82, 0.85))';
                    portlet.style.border = '2px ridge #63806a';
                    portlet.style.borderRadius = '6px';
                    portlet.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.3)';
                } else {
                    // Вложенные портлеты - без границ
                    portlet.style.background = 'rgba(99, 128, 106, 0.6)';
                    portlet.style.border = 'none';
                }
                portlet.style.color = '#e1c289';
                portlet.style.padding = '12px';
            });

            // Элементы .desc и .item - только если не внутри уже оформленного блока
            descItems.forEach((item, index) => {
                const parentWithStyle = item.closest('.section, .box, .portlet, .research_box');
                
                if (!parentWithStyle) {
                    // Элементы вне оформленных блоков
                    if (index < 42) {
                        item.style.background = 'rgba(57, 142, 178, 0.7)';
                        item.style.border = '1px solid #398eb2';
                        item.style.color = '#e1c289';
                    } else {
                        item.style.background = 'rgba(107, 65, 49, 0.8)';
                        item.style.border = '1px solid #6b4131';
                        item.style.color = '#ffbf6b';
                    }
                    item.style.borderRadius = '4px';
                    item.style.padding = '8px';
                    item.style.margin = '5px 0';
                } else {
                    // Элементы внутри оформленных блоков - минимальное оформление
                    item.style.background = 'transparent';
                    item.style.border = 'none';
                    item.style.color = '#e1c289';
                }
            });

            // Заголовки - всегда меняем цвет, но не добавляем границы
            titles.forEach(title => {
                title.style.color = '#ffbf6b';
                title.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
                title.style.fontWeight = 'bold';
                title.style.letterSpacing = '0.5px';
                title.style.border = 'none'; // Убираем возможные границы
            });

            // Навигация - только основные навбары
            navs.forEach(nav => {
                const isMainNav = !nav.closest('.section, .box, .portlet');
                if (isMainNav) {
                    nav.style.background = 'linear-gradient(to right, rgba(127, 69, 54, 0.9), rgba(21, 61, 82, 0.95))';
                    nav.style.border = '2px ridge #7f4536';
                    nav.style.borderRadius = '4px';
                } else {
                    nav.style.background = 'rgba(127, 69, 54, 0.7)';
                    nav.style.border = 'none';
                }
                nav.style.color = '#e1c289';
                nav.style.padding = '10px';
            });

            // Списки - только основные списки
            lists.forEach(list => {
                const hasStyledParent = list.closest('.section, .box, .portlet');
                if (!hasStyledParent) {
                    list.style.background = 'rgba(136, 121, 114, 0.8)';
                    list.style.border = '1px solid #887972';
                    list.style.borderRadius = '4px';
                } else {
                    list.style.background = 'transparent';
                    list.style.border = 'none';
                }
                list.style.color = '#e1c289';
                list.style.padding = '10px';
            });

            // Блоки институтов - основные блоки
            institutesBox.forEach(box => {
                box.style.background = 'linear-gradient(135deg, rgba(150, 49, 46, 0.8), rgba(21, 61, 82, 0.9))';
                box.style.border = '2px ridge #96312e';
                box.style.borderRadius = '6px';
                box.style.color = '#e1c289';
                box.style.padding = '15px';
                box.style.boxShadow = '0 3px 15px rgba(150, 49, 46, 0.3)';
            });

            // Кнопки - все кнопки, но с более тонкими границами
            buttons.forEach(btn => {
                btn.style.background = 'linear-gradient(to bottom, #d89841, #b26e41)';
                btn.style.color = '#153d52';
                btn.style.border = '1px ridge #a7793e'; // Более тонкая граница
                btn.style.borderRadius = '4px';
                btn.style.fontWeight = 'bold';
                btn.style.textShadow = '1px 1px 1px rgba(255, 255, 255, 0.5)';
                btn.style.cursor = 'pointer';
            });

            // Ссылки
            links.forEach(link => {
                link.style.color = '#ffbf6b';
                link.style.textDecoration = 'none';
                link.style.fontWeight = 'bold';
                link.style.transition = 'color 0.3s ease';
            });

            // Поля ввода
            inputs.forEach(input => {
                input.style.background = 'rgba(176, 190, 197, 0.8)';
                input.style.border = '1px solid #b0bec5';
                input.style.color = '#153d52';
                input.style.borderRadius = '3px';
                input.style.padding = '5px';
            });
        }

        function resetAllStyles() {
            // Полностью сбрасываем ВСЕ стили у ВСЕХ элементов на странице
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.style) {
                    element.removeAttribute('style');
                }
            });
            
            console.log('Все стили сброшены, сайт возвращен в исходное состояние');
        }
    }

    // Обновляем текст и стиль кнопки
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
        if (document.getElementById('steampunk-toggle-btn')) {
            return;
        }

        const buttonContainer = document.querySelector('.box_links');
        if (!buttonContainer) {
            console.log('Не найден контейнер для кнопок');
            addButtonToBody();
            return;
        }

        const button = document.createElement('div');
        button.id = 'steampunk-toggle-btn';
        button.textContent = isSteamPunkMode ? '⚙️ ON' : '⚙️ OFF';
        button.title = isSteamPunkMode ? 'Выключить SteamPunk стиль' : 'Включить SteamPunk стиль';
        
        // SteamPunk стили для кнопки
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
        
        button.addEventListener('click', toggleSteamPunkMode);
        buttonContainer.appendChild(button);
    }

    function addButtonToBody() {
        const button = document.createElement('div');
        button.id = 'steampunk-toggle-btn';
        button.textContent = isSteamPunkMode ? '⚙️ ON' : '⚙️ OFF';
        button.title = isSteamPunkMode ? 'Выключить SteamPunk стиль' : 'Включить SteamPunk стиль';
        
        Object.assign(button.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '35px',
            zIndex: '10000',
            border: '2px ridge #a7793e',
            background: isSteamPunkMode ? 
                'linear-gradient(to bottom, #398eb2, #153d52)' : 
                'linear-gradient(to bottom, #d89841, #b26e41)',
            color: isSteamPunkMode ? '#ffbf6b' : '#153d52',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)'
        });

        button.addEventListener('click', toggleSteamPunkMode);
        document.body.appendChild(button);
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
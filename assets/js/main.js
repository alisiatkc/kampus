/**
 * ОТКРЫТЫЙ КАМПУС - ОСНОВНОЙ JAVASCRIPT
 */

// --------------------------------------------
// МОДАЛЬНОЕ ОКНО РЕГИСТРАЦИИ
// --------------------------------------------
const modal = {
    overlay: document.getElementById('registrationModal'),
    title: document.getElementById('modalEventTitle'),
    form: document.getElementById('registrationForm'),
    successMsg: document.getElementById('successMessage'),

    open(eventTitle) {
        if (this.title) {
            this.title.textContent = eventTitle 
                ? `Регистрация: ${eventTitle}` 
                : 'Регистрация на событие';
        }
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.overlay?.classList.remove('active');
        this.successMsg?.classList.remove('show');
        this.form?.reset();
        document.body.style.overflow = '';
    },

    submit(event) {
        event.preventDefault();
        this.successMsg?.classList.add('show');
        setTimeout(() => this.close(), 3000);
    }
};

// Инициализация модального окна
document.addEventListener('DOMContentLoaded', () => {
    // Закрытие по клику на оверлей
    modal.overlay?.addEventListener('click', (e) => {
        if (e.target === modal.overlay) modal.close();
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.overlay?.classList.contains('active')) {
            modal.close();
        }
    });
});

// Глобальные функции для onclick
window.openModal = (event, title) => {
    event?.preventDefault();
    modal.open(title);
};

window.closeModal = () => modal.close();

window.submitRegistration = (event) => modal.submit(event);

// --------------------------------------------
// ПОДПИСКА НА РАССЫЛКУ
// --------------------------------------------
const subscribeForm = document.getElementById('subscribeForm');
subscribeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо за подписку! Проверьте вашу почту.');
    e.target.reset();
});

// --------------------------------------------
// МОБИЛЬНОЕ МЕНЮ
// --------------------------------------------
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('show');
});

// --------------------------------------------
// КАЛЕНДАРЬ (если на странице)
// --------------------------------------------
const initCalendar = () => {
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) return;

    const today = new Date(2026, 2, 13); // 13 марта 2026 для демо
    const events = [13, 14, 18, 21, 25, 28]; // Даты с событиями

    // Генерация дней месяца
    const daysInMonth = 31;
    let html = '';

    for (let i = 1; i <= daysInMonth; i++) {
        const hasEvent = events.includes(i);
        const isToday = i === 13;
        const isSelected = i === 13;
        
        html += `<div class="calendar-day ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}" onclick="selectDate(${i})">${i}</div>`;
    }

    calendarDays.innerHTML = html;
};

window.selectDate = (day) => {
    console.log(`Выбрана дата: ${day} марта 2026`);
    // Здесь можно добавить фильтрацию событий
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCalendar);

// --------------------------------------------
// КАРТА - ВСПЛЫВАЮЩИЕ ПОДСКАЗКИ
// --------------------------------------------
const mapBuildings = document.querySelectorAll('.map-building');
const tooltip = document.createElement('div');
tooltip.className = 'map-tooltip';
tooltip.style.cssText = `
    position: absolute;
    background: white;
    padding: 8px 16px;
    border-radius: 40px;
    font-size: 0.9rem;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 10;
`;
document.querySelector('.isometric-map')?.appendChild(tooltip);

mapBuildings.forEach(building => {
    building.addEventListener('mousemove', (e) => {
        const names = {
            'open-living': 'Открытая гостиная',
            'workshop-down': 'Мастерская нижняя',
            'workshop-up': 'Мастерская верхняя',
            'building6': '6-й корпус',
            'bookstore': 'Книжный магазин',
            'garden': 'Сад',
            'square': 'Сквер'
        };
        const space = building.getAttribute('data-space') || 
                     building.closest('a')?.getAttribute('href')?.split('=')[1] || 
                     'space';
        
        tooltip.style.opacity = '1';
        tooltip.style.left = (e.clientX - 50) + 'px';
        tooltip.style.top = (e.clientY - 60) + 'px';
        tooltip.textContent = names[space] || 'Пространство';
    });

    building.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
});

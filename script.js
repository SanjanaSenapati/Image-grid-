function toggleImage(item) {
    if (item.classList.contains('marked')) {
        return;
    }

    const images = document.querySelectorAll('.grid-item img');
    images.forEach(img => img.style.display = 'none');

    const img = item.querySelector('img');
    img.style.display = 'block';

    item.classList.add('marked');

    saveState();

    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popup-image');
    popupImage.src = img.src;
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';

    const images = document.querySelectorAll('.grid-item img');
    images.forEach(img => img.style.display = 'none');
}

function saveState() {
    const items = document.querySelectorAll('.grid-item');
    const state = Array.from(items).map(item => item.classList.contains('marked'));
    localStorage.setItem('gridState', JSON.stringify(state));
}

function loadState() {
    const state = JSON.parse(localStorage.getItem('gridState'));
    if (state) {
        const items = document.querySelectorAll('.grid-item');
        state.forEach((marked, index) => {
            if (marked) {
                const item = items[index];
                item.classList.add('marked');
            }
        });
    }
}

function checkPageRestore() {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        loadState();
    }
}

window.onload = checkPageRestore;

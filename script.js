const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const categoryFilter = document.getElementById('category-filter');

// JSON-Datei laden und Kategorien im Dropdown-Menü anzeigen
async function loadCategories() {
    try {
        const response = await fetch('begriffe.json');
        const glossary = await response.json();
        
        populateCategories(glossary);

        // Klick-Event für den Suchen-Button
        searchButton.addEventListener('click', redirectToSearch);
    } catch (error) {
        console.error('Fehler beim Laden der Kategorien:', error);
    }
}

// Kategorien zum Dropdown hinzufügen
function populateCategories(glossary) {
    const categories = new Set(glossary.map(item => item.kategorie));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Funktion zur Weiterleitung zur Suchseite
function redirectToSearch() {
    const query = searchInput.value.trim();
    const category = categoryFilter.value;
    let url = `suche.html?query=${encodeURIComponent(query)}`;
    
    if (category !== 'all') {
        url += `&category=${encodeURIComponent(category)}`;
    }
    
    window.location.href = url;
}

// Initiales Laden der Kategorien
loadCategories();

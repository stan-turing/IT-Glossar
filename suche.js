const resultsContainer = document.getElementById('results-container');

// Funktion, um den URL-Parameter zu extrahieren
function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Suchergebnisse laden und anzeigen
async function loadSearchResults() {
    const query = getParameterByName('query')?.toLowerCase() || '';
    const category = getParameterByName('category');

    try {
        const response = await fetch('begriffe.json');
        const glossary = await response.json();

        const filteredResults = glossary.filter(item => {
            const matchesCategory = !category || category === 'all' || item.kategorie === category;
            const matchesQuery = item.begriff.toLowerCase().includes(query) ||
                                 item.definition.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });

        displayResults(filteredResults);
    } catch (error) {
        console.error('Fehler beim Laden der Suchergebnisse:', error);
    }
}

// Funktion zur Anzeige der Suchergebnisse
function displayResults(glossary) {
    resultsContainer.innerHTML = '';
    if (glossary.length === 0) {
        resultsContainer.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
    } else {
        glossary.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            // Dynamische Kategorie-Klasse
            const categoryClass = `category-${item.kategorie.toLowerCase().replace(/\s+/g, '')}`;
            
            resultItem.innerHTML = `
                <a href="artikel.html?begriff=${encodeURIComponent(item.begriff)}">
                    <h2>${item.begriff}</h2>
                    <p>${item.definition}</p>
                </a>
                <span class="category-badge ${categoryClass}">${item.kategorie}</span>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }
}

// Suchergebnisse laden
loadSearchResults();

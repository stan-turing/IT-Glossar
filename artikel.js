const artikelContainer = document.getElementById('artikel-container');

// Funktion, um den URL-Parameter zu extrahieren
function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Begriffsdetails laden und anzeigen
async function loadArtikel() {
    const begriff = getParameterByName('begriff');
    
    if (begriff) {
        try {
            const response = await fetch('begriffe.json');
            const glossary = await response.json();
            
            const item = glossary.find(entry => entry.begriff === begriff);
            
            if (item) {
                displayArtikel(item);
            } else {
                artikelContainer.innerHTML = '<p>Begriff nicht gefunden</p>';
            }
        } catch (error) {
            console.error('Fehler beim Laden der Begriffsdetails:', error);
        }
    } else {
        artikelContainer.innerHTML = '<p>Kein Begriff ausgewählt</p>';
    }
}

// Funktion zur Anzeige der Begriffsdetails
function displayArtikel(item) {
    const categoryClass = `category-${item.kategorie.toLowerCase().replace(/\s+/g, '')}`;
    // Dynamische Kategorie-Klasse
    artikelContainer.innerHTML = `
        <h2>${item.begriff}</h2>
        <span class="category-badge ${categoryClass}" style="margin-left: 12px;">${item.kategorie}</span>
        <p>${item.definition}</p>
        <h4>Kurzgesagt:</h4>
        <p>${item.zusammenfassung}</p>
    `;
}


// Artikelansicht laden
loadArtikel();


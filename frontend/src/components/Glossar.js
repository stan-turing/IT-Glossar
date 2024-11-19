import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Glossar = () => {
    const [begriffe, setBegriffe] = useState([]); // State für die Begriffe
    const [loading, setLoading] = useState(true); // State für den Ladezustand

    // Funktion, um die Begriffe vom Backend zu laden
    const fetchBegriffe = async () => {
        try {
            const response = await axios.get('http://localhost:5000/begriffe'); // API-Endpunkt
            setBegriffe(response.data); // Begriffe in den State speichern
            setLoading(false); // Laden abgeschlossen
        } catch (error) {
            console.error('Fehler beim Laden der Begriffe:', error);
            setLoading(false);
        }
    };

    // Effekt, der die Begriffe beim Laden der Komponente abruft
    useEffect(() => {
        fetchBegriffe();
    }, []);

    // Rendering
    if (loading) return <p>Lädt...</p>;

    return (
        <div>
            <h1>IT-Glossar</h1>
            <ul>
                {begriffe.map((begriff) => (
                    <li key={begriff.id}>
                        <strong>{begriff.name}:</strong> {begriff.beschreibung}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Glossar;

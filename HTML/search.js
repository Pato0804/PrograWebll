function handleSearch() {

    const searchInput = document.querySelector('.nav-search input');
    const searchQuery = searchInput.value.trim();

    if (!searchQuery) return; 

    // Checa si se agregó un año válido (4 dígitos)
    const yearRegex = /^\d{4}$/;

    if (yearRegex.test(searchQuery)) {
        window.location.href = `../HTML/worldcup-details.html?year=${searchQuery}`;
    } else {
        alert("🔍 Please enter a World Cup year to search (e.g., 1986 or 2022).");
        searchInput.value = '';
    }
}

// esperamos a que el DOM esté completamente cargado antes de agregar los event listeners  
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.nav-search input');
    const searchBtn = document.querySelector('.nav-search button');

    if (searchInput && searchBtn) {
        
        searchBtn.addEventListener('click', handleSearch);

        
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); s
                handleSearch();
            }
        });
    }
});
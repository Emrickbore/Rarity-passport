
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initMainSearch();
    initHeaderSearch();
    initCategoryCards();
    initWatchPage();
}


function initMainSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const suggestionsContainer = document.querySelector('.search-suggestions');
    
    if (!searchInput) return;
    
    let selectedIndex = -1;
    let currentSuggestions = [];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            hideSuggestions(suggestionsContainer);
            return;
        }
        
        currentSuggestions = searchWatches(query).slice(0, 8);
        selectedIndex = -1;
        
        if (currentSuggestions.length > 0) {
            displaySuggestions(currentSuggestions, suggestionsContainer, query);
            suggestionsContainer.classList.add('active');
        } else {
            hideSuggestions(suggestionsContainer);
        }
    });
    

    searchInput.addEventListener('keydown', (e) => {
        const items = suggestionsContainer.querySelectorAll('.suggestion-item');
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateSelected(items, selectedIndex);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSelected(items, selectedIndex);
                break;
                
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && currentSuggestions[selectedIndex]) {
                    goToWatch(currentSuggestions[selectedIndex].id);
                } else if (searchInput.value.trim()) {
                    goToSearch(searchInput.value.trim());
                }
                break;
                
            case 'Escape':
                hideSuggestions(suggestionsContainer);
                break;
        }
    });
    
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                goToSearch(query);
            }
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSuggestions(suggestionsContainer);
        }
    });
}


function initHeaderSearch() {
    const headerSearch = document.querySelector('.header-search');
    if (!headerSearch) return;
    
    const input = headerSearch.querySelector('input');
    const button = headerSearch.querySelector('button');
    const suggestionsContainer = headerSearch.querySelector('.search-suggestions');
    
    if (!input) return;
    
    let selectedIndex = -1;
    let currentSuggestions = [];
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            if (suggestionsContainer) suggestionsContainer.classList.remove('active');
            return;
        }
        
        currentSuggestions = searchWatches(query).slice(0, 6);
        selectedIndex = -1;
        
        if (currentSuggestions.length > 0 && suggestionsContainer) {
            displaySuggestions(currentSuggestions, suggestionsContainer, query);
            suggestionsContainer.classList.add('active');
        } else if (suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (!suggestionsContainer) return;
        
        const items = suggestionsContainer.querySelectorAll('.suggestion-item');
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateSelected(items, selectedIndex);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSelected(items, selectedIndex);
                break;
                
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && currentSuggestions[selectedIndex]) {
                    goToWatch(currentSuggestions[selectedIndex].id);
                } else if (input.value.trim()) {
                    goToSearch(input.value.trim());
                }
                break;
                
            case 'Escape':
                suggestionsContainer.classList.remove('active');
                break;
        }
    });
    
    if (button) {
        button.addEventListener('click', () => {
            const query = input.value.trim();
            if (query) {
                goToSearch(query);
            }
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search') && suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
        }
    });
}


function displaySuggestions(suggestions, container, query) {
    if (!container) return;
    
    container.innerHTML = suggestions.map(watch => {
        const highlightedName = highlightMatch(watch.name, query);
        const highlightedRef = highlightMatch(watch.reference, query);
        const brandClass = getBrandClass(watch.brand);
        
        return `
            <div class="suggestion-item" onclick="goToWatch(${watch.id})">
                <img src="assets/images/${watch.image}" alt="${watch.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23F5F1EB%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2230%22>⌚</text></svg>'">
                <div class="suggestion-info">
                    <div class="brand" style="color: var(--${brandClass === 'rolex' ? 'rolex-green' : brandClass === 'ap' ? 'ap-blue' : 'patek-brown'})">${watch.brand}</div>
                    <div class="name">${highlightedName}</div>
                    <div class="reference">Réf. ${highlightedRef}</div>
                </div>
            </div>
        `;
    }).join('');
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateSelected(items, index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest' });
    }
}

function hideSuggestions(container) {
    if (container) {
        container.classList.remove('active');
    }
}


function goToWatch(watchId) {
    window.location.href = `search.html?id=${watchId}`;
}

function goToSearch(query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function goToCategory(brand) {
    window.location.href = `search.html?q=${encodeURIComponent(brand)}`;
}


function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('watch-tag')) {
                return;
            }
            
            const brand = card.dataset.brand;
            if (brand) {
                goToCategory(brand);
            }
        });
    });
    
    const watchTags = document.querySelectorAll('.watch-tag');
    watchTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const watchName = tag.textContent.trim();
            goToSearch(watchName);
        });
    });
}


function initWatchPage() {
    const watchPage = document.querySelector('.watch-page');
    if (!watchPage) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const watchId = parseInt(urlParams.get('id'));
    
    if (!watchId) {
        showWatchError();
        return;
    }
    
    const watch = getWatchById(watchId);
    
    if (!watch) {
        showWatchError();
        return;
    }
    
    applyBrandTheme(watch.brand);
    
    displayWatchPage(watch);
    
    loadSimilarWatches(watch);
}

function getBrandClass(brand) {
    const brandLower = brand.toLowerCase();
    if (brandLower.includes('rolex')) return 'rolex';
    if (brandLower.includes('patek')) return 'patek';
    if (brandLower.includes('audemars') || brandLower.includes('ap')) return 'ap';
    return '';
}

function applyBrandTheme(brand) {
    const body = document.body;
    body.classList.remove('theme-rolex', 'theme-patek', 'theme-ap');
    
    const brandClass = getBrandClass(brand);
    if (brandClass) {
        body.classList.add(`theme-${brandClass}`);
    }
}

function displayWatchPage(watch) {
    const brandClass = getBrandClass(watch.brand);
    
    const mainImage = document.getElementById('watch-main-image');
    if (mainImage) {
        mainImage.src = `assets/images/${watch.image}`;
        mainImage.alt = watch.name;
    }
    
    const brandEl = document.getElementById('watch-brand');
    if (brandEl) {
        brandEl.textContent = watch.brand;
        brandEl.className = `brand ${brandClass}-brand`;
    }
    
    const nameEl = document.getElementById('watch-name');
    if (nameEl) nameEl.textContent = watch.name;
    
    const refEl = document.getElementById('watch-reference');
    if (refEl) refEl.textContent = `Référence: ${watch.reference}`;
    
    const descEl = document.getElementById('watch-description');
    if (descEl) descEl.textContent = watch.description || `La ${watch.brand} ${watch.name} est un modèle emblématique de l'horlogerie de luxe, alliant savoir-faire exceptionnel et design intemporel.`;
    
    if (watch.specs) {
        updateSpec('spec-diameter', watch.specs.diameter);
        updateSpec('spec-movement', watch.specs.movement);
        updateSpec('spec-water', watch.specs.waterResistance);
        updateSpec('spec-material', watch.specs.material);
    }
    
    document.title = `${watch.name} - ${watch.brand} | LuxWatch`;
}

function updateSpec(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value || 'N/A';
}

function loadSimilarWatches(currentWatch) {
    const similarGrid = document.getElementById('similar-grid');
    if (!similarGrid) return;
    
    const similar = watchesDB
        .filter(w => w.brand === currentWatch.brand && w.id !== currentWatch.id)
        .slice(0, 4);
    
    if (similar.length === 0) {
        const others = watchesDB.filter(w => w.id !== currentWatch.id).slice(0, 4);
        displaySimilarWatches(others, similarGrid);
    } else {
        displaySimilarWatches(similar, similarGrid);
    }
}

function displaySimilarWatches(watches, container) {
    container.innerHTML = watches.map(watch => {
        const brandClass = getBrandClass(watch.brand);
        return `
            <div class="similar-card" onclick="goToWatch(${watch.id})">
                <img src="assets/images/${watch.image}" alt="${watch.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23F5F1EB%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2230%22>⌚</text></svg>'">
                <div class="similar-card-info">
                    <div class="brand" style="color: var(--${brandClass === 'rolex' ? 'rolex-green' : brandClass === 'ap' ? 'ap-blue' : 'patek-brown'})">${watch.brand}</div>
                    <div class="name">${watch.name}</div>
                </div>
            </div>
        `;
    }).join('');
}

function showWatchError() {
    const watchPage = document.querySelector('.watch-page');
    if (watchPage) {
        watchPage.innerHTML = `
            <div style="text-align: center; padding: 100px 20px;">
                <div style="font-size: 80px; margin-bottom: 30px;">⌚</div>
                <h1 style="font-size: 32px; margin-bottom: 20px; color: var(--text-primary);">Montre non trouvée</h1>
                <p style="color: var(--text-secondary); margin-bottom: 30px;">Cette montre n'existe pas dans notre catalogue.</p>
                <a href="index.html" style="display: inline-block; padding: 15px 40px; background: var(--accent-primary); color: white; border-radius: 30px; text-decoration: none;">Retour à l'accueil</a>
            </div>
        `;
    }
}

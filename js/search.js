
let currentWatch = null;
let searchResults = [];

document.addEventListener('DOMContentLoaded', () => {
    initSearchPage();
});

function initSearchPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    const watchId = urlParams.get('id');
    
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        input.value = searchQuery;
    });
    
    if (watchId) {
        const watch = getWatchById(parseInt(watchId));
        if (watch) {
            searchResults = [watch];
            displayResults(searchResults);
            selectWatch(watch);
            searchInputs.forEach(input => {
                input.value = watch.name;
            });
        } else {
            showNoResults();
        }
    }
    else if (searchQuery) {
        performSearch(searchQuery);
    } else {
        showNoResults();
    }
    
    initHeaderSearch();
}

function performSearch(query) {
    searchResults = searchWatches(query);
    
    displayResults(searchResults);
    
    if (searchResults.length > 0) {
        selectWatch(searchResults[0]);
    }
}

function displayResults(watches) {
    const resultsList = document.getElementById('results-list');
    const resultsCount = document.getElementById('results-count');
    
    if (!resultsList) return;
    
    if (resultsCount) {
        resultsCount.textContent = watches.length;
    }
    
    if (watches.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <div style="font-size: 50px; margin-bottom: 20px;">🔍</div>
                <p>Aucune montre trouvée</p>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = watches.map(watch => {
        const brandClass = getBrandClass(watch.brand);
        return `
            <div class="result-item ${brandClass}-item" data-id="${watch.id}" onclick="selectWatch(getWatchById(${watch.id}))">
                <img src="assets/images/${watch.image}" alt="${watch.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23F5F1EB%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2230%22>⌚</text></svg>'">
                <div class="result-info">
                    <div class="brand ${brandClass}-brand">${watch.brand}</div>
                    <div class="name">${watch.name}</div>
                    <div class="reference">Réf. ${watch.reference}</div>
                </div>
                <div class="result-arrow">→</div>
            </div>
        `;
    }).join('');
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

function selectWatch(watch) {
    if (!watch) return;
    
    currentWatch = watch;
    
    applyBrandTheme(watch.brand);
    
    document.querySelectorAll('.result-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.id) === watch.id) {
            item.classList.add('active');
        }
    });
    
    displayWatchDetail(watch);
}

function displayWatchDetail(watch) {
    const detailPanel = document.getElementById('detail-panel');
    if (!detailPanel) return;
    
    const brandClass = getBrandClass(watch.brand);
    const isPaid = checkIfPaid(watch.id);
    
    detailPanel.innerHTML = `
        <div class="watch-detail scale-in">
            <div class="watch-detail-header">
                <img src="assets/images/${watch.image}" alt="${watch.name}" class="watch-detail-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23F5F1EB%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2230%22>⌚</text></svg>'">
                <div class="watch-detail-info">
                    <div class="brand ${brandClass}-brand">${watch.brand}</div>
                    <h1>${watch.name}</h1>
                    <div class="reference">Référence: ${watch.reference}</div>
                    <div class="watch-specs-mini">
                        ${watch.specs ? `
                            <div class="spec-item">
                                <div class="label">Diamètre</div>
                                <div class="value">${watch.specs.diameter || 'N/A'}</div>
                            </div>
                            <div class="spec-item">
                                <div class="label">Mouvement</div>
                                <div class="value">${watch.specs.movement || 'N/A'}</div>
                            </div>
                            <div class="spec-item">
                                <div class="label">Étanchéité</div>
                                <div class="value">${watch.specs.waterResistance || 'N/A'}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div class="pdf-section" id="pdf-section">
                <div class="pdf-loading">
                    <div class="spinner"></div>
                    <p>Chargement du document...</p>
                </div>
            </div>
        </div>
    `;
    

    if (watch.pdf) {
        checkPDFExists(watch, isPaid, brandClass);
    } else {
        displayFakeDocument(watch, isPaid, brandClass);
    }
}

function checkPDFExists(watch, isPaid, brandClass) {
    const pdfPath = `montre/${watch.pdf}`;
    
    fetch(pdfPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                displayRealPDF(watch, isPaid, brandClass);
            } else {
                displayFakeDocument(watch, isPaid, brandClass);
            }
        })
        .catch(() => {
            displayFakeDocument(watch, isPaid, brandClass);
        });
}

function displayRealPDF(watch, isPaid, brandClass) {
    const pdfSection = document.getElementById('pdf-section');
    if (!pdfSection) return;
    
    pdfSection.innerHTML = `
        <div class="pdf-container ${isPaid ? '' : 'blurred'}" id="pdf-container">
            <div class="pdf-header">
                <div class="pdf-icon ${brandClass}-pdf">PDF</div>
                <div class="pdf-info">
                    <h3>Fiche technique - ${watch.name}</h3>
                    <p>${watch.brand} | Réf. ${watch.reference}</p>
                </div>
            </div>
            <div class="pdf-content" id="pdf-content">
                <iframe src="montre/${watch.pdf}" title="Fiche technique ${watch.name}"></iframe>
            </div>
            
            <div class="payment-overlay ${isPaid ? 'hidden' : ''}" id="payment-overlay">
                <div class="payment-box">
                    <div class="lock-icon">🔒</div>
                    <h3>Document Premium</h3>
                    <p>Accédez à la fiche technique complète<br>de cette montre exceptionnelle</p>
                    <button class="pay-button" onclick="processPayment(${watch.id}, true)">
                        PAYER LA LICENCE 10$
                    </button>
                </div>
            </div>
        </div>
        
        <div class="download-section ${isPaid ? '' : 'hidden'}" id="download-section">
            <button class="download-button" onclick="downloadRealPDF('${watch.pdf}')">
                <span>📥</span>
                Télécharger le PDF
            </button>
        </div>
    `;
}

function displayFakeDocument(watch, isPaid, brandClass) {
    const pdfSection = document.getElementById('pdf-section');
    if (!pdfSection) return;
    
    const brandColors = {
        rolex: { primary: '#006039', secondary: '#A37E2C', light: '#E8F5EE' },
        patek: { primary: '#8B7355', secondary: '#C9B99A', light: '#FAF8F5' },
        ap: { primary: '#1E4A8D', secondary: '#2D6BC4', light: '#EBF3FF' }
    };
    
    const colors = brandColors[brandClass] || brandColors.patek;
    
    const fakeDocumentHTML = generateFakeDocumentHTML(watch, colors);
    
    pdfSection.innerHTML = `
        <div class="pdf-container ${isPaid ? '' : 'blurred'}" id="pdf-container">
            <div class="pdf-header">
                <div class="pdf-icon ${brandClass}-pdf">PDF</div>
                <div class="pdf-info">
                    <h3>Fiche technique - ${watch.name}</h3>
                    <p>${watch.brand} | Réf. ${watch.reference}</p>
                </div>
            </div>
            <div class="pdf-content fake-document" id="pdf-content">
                ${fakeDocumentHTML}
            </div>
            
            <div class="payment-overlay ${isPaid ? 'hidden' : ''}" id="payment-overlay">
                <div class="payment-box">
                    <div class="lock-icon">🔒</div>
                    <h3>Document Premium</h3>
                    <p>Accédez à la fiche technique complète<br>de cette montre exceptionnelle</p>
                    <button class="pay-button" onclick="processPayment(${watch.id}, false)">
                        PAYER LA LICENCE 10$
                    </button>
                </div>
            </div>
        </div>
        
        <div class="download-section ${isPaid ? '' : 'hidden'}" id="download-section">
            <button class="download-button" onclick="downloadFakeDocument(${watch.id})">
                <span>📥</span>
                Télécharger la fiche
            </button>
        </div>
    `;
}

function generateFakeDocumentHTML(watch, colors) {
    const specs = watch.specs || {};
    
    return `
        <div class="fake-pdf-document" style="background: white; padding: 40px; min-height: 600px; position: relative; font-family: 'Georgia', serif;">
            <!-- Filigrane -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 60px; color: rgba(0,0,0,0.03); font-weight: bold; white-space: nowrap; pointer-events: none;">
                DOCUMENT OFFICIEL
            </div>
            
            <!-- En-tête -->
            <div style="border-bottom: 3px solid ${colors.primary}; padding-bottom: 20px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h1 style="color: ${colors.primary}; margin: 0; font-size: 28px; letter-spacing: 2px;">${watch.brand.toUpperCase()}</h1>
                        <p style="color: #666; margin: 5px 0 0 0; font-style: italic;">Certificat d'authenticité</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="background: ${colors.primary}; color: white; padding: 10px 20px; font-size: 12px;">
                            FICHE TECHNIQUE OFFICIELLE
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Titre du modèle -->
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: ${colors.primary}; font-size: 32px; margin: 0;">${watch.name}</h2>
                <p style="color: ${colors.secondary}; font-size: 18px; margin: 10px 0 0 0;">Référence: ${watch.reference}</p>
            </div>
            
            <!-- Image placeholder -->
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="width: 200px; height: 200px; margin: 0 auto; background: ${colors.light}; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid ${colors.secondary};">
                    <span style="font-size: 80px;">⌚</span>
                </div>
            </div>
            
            <!-- Spécifications -->
            <div style="background: ${colors.light}; padding: 30px; margin-bottom: 30px;">
                <h3 style="color: ${colors.primary}; margin: 0 0 20px 0; font-size: 18px; border-bottom: 1px solid ${colors.secondary}; padding-bottom: 10px;">
                    SPÉCIFICATIONS TECHNIQUES
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666; width: 40%;">Marque</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${watch.brand}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666;">Modèle</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${watch.name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666;">Référence</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${watch.reference}</td>
                    </tr>
                    ${specs.diameter ? `
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666;">Diamètre</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${specs.diameter}</td>
                    </tr>` : ''}
                    ${specs.movement ? `
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666;">Mouvement</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${specs.movement}</td>
                    </tr>` : ''}
                    ${specs.powerReserve ? `
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666;">Réserve de marche</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${specs.powerReserve}</td>
                    </tr>` : ''}
                    ${specs.waterResistance ? `
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666;">Étanchéité</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${specs.waterResistance}</td>
                    </tr>` : ''}
                    ${specs.material ? `
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
                        <td style="padding: 12px 0; color: #666;">Matériau</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${specs.material}</td>
                    </tr>` : ''}
                    ${specs.crystal ? `
                    <tr>
                        <td style="padding: 12px 0; color: #666;">Verre</td>
                        <td style="padding: 12px 0; color: #333; font-weight: bold;">${specs.crystal}</td>
                    </tr>` : ''}
                </table>
            </div>
            
            <!-- Description -->
            ${watch.description ? `
            <div style="margin-bottom: 30px;">
                <h3 style="color: ${colors.primary}; margin: 0 0 15px 0; font-size: 16px;">DESCRIPTION</h3>
                <p style="color: #555; line-height: 1.8; text-align: justify;">${watch.description}</p>
            </div>
            ` : ''}
            
            <!-- Pied de page -->
            <div style="border-top: 2px solid ${colors.primary}; padding-top: 20px; margin-top: 40px; text-align: center;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                    Document généré par LuxWatch® | © ${new Date().getFullYear()} Tous droits réservés
                </p>
                <p style="color: ${colors.secondary}; font-size: 11px; margin: 10px 0 0 0;">
                    Ce document est fourni à titre informatif uniquement
                </p>
            </div>
        </div>
    `;
}

function processPayment(watchId, isRealPDF) {
    const payButton = document.querySelector('.pay-button');
    const overlay = document.getElementById('payment-overlay');
    const pdfContainer = document.getElementById('pdf-container');
    const downloadSection = document.getElementById('download-section');
    
    if (!payButton) return;
    
    payButton.disabled = true;
    payButton.classList.add('processing');
    payButton.innerHTML = '⏳ Traitement en cours...';
    
    setTimeout(() => {
        payButton.innerHTML = '✓ Paiement accepté !';
        
        setTimeout(() => {
            savePaidWatch(watchId);
            
            if (pdfContainer) {
                pdfContainer.classList.remove('blurred');
            }
            
            if (overlay) {
                overlay.classList.add('hidden');
            }
            
            if (downloadSection) {
                downloadSection.classList.remove('hidden');
            }
        }, 1000);
    }, 2000);
}


function downloadRealPDF(pdfFile) {
    const link = document.createElement('a');
    link.href = `montre/${pdfFile}`;
    link.download = pdfFile;
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function downloadFakeDocument(watchId) {
    const watch = getWatchById(watchId);
    if (!watch) return;
    
    const brandClass = getBrandClass(watch.brand);
    const brandColors = {
        rolex: { primary: '#006039', secondary: '#A37E2C', light: '#E8F5EE' },
        patek: { primary: '#8B7355', secondary: '#C9B99A', light: '#FAF8F5' },
        ap: { primary: '#1E4A8D', secondary: '#2D6BC4', light: '#EBF3FF' }
    };
    const colors = brandColors[brandClass] || brandColors.patek;
    
    const fakeDocHTML = generateFakeDocumentHTML(watch, colors);
    
    const fullHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiche Technique - ${watch.brand} ${watch.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Georgia, serif; }
        @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    ${fakeDocHTML}
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${watch.brand}_${watch.name}_FicheTechnique.html`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

function checkIfPaid(watchId) {
    const paidWatches = JSON.parse(localStorage.getItem('paidWatches') || '[]');
    return paidWatches.includes(watchId);
}

function savePaidWatch(watchId) {
    const paidWatches = JSON.parse(localStorage.getItem('paidWatches') || '[]');
    if (!paidWatches.includes(watchId)) {
        paidWatches.push(watchId);
        localStorage.setItem('paidWatches', JSON.stringify(paidWatches));
    }
}

function showNoResults() {
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
        detailPanel.innerHTML = `
            <div class="detail-placeholder">
                <div class="icon">⌚</div>
                <p>Effectuez une recherche pour découvrir nos montres</p>
            </div>
        `;
    }
}

function initHeaderSearch() {
    const headerInput = document.querySelector('.header-search input');
    const headerSuggestions = document.querySelector('.header-search .search-suggestions');
    
    if (!headerInput || !headerSuggestions) return;
    
    let selectedIndex = -1;
    let currentSuggestions = [];
    
    headerInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            headerSuggestions.classList.remove('active');
            return;
        }
        
        currentSuggestions = searchWatches(query).slice(0, 6);
        selectedIndex = -1;
        
        if (currentSuggestions.length > 0) {
            displayHeaderSuggestions(currentSuggestions, headerSuggestions, query);
            headerSuggestions.classList.add('active');
        } else {
            headerSuggestions.classList.remove('active');
        }
    });
    
    headerInput.addEventListener('keydown', (e) => {
        const items = headerSuggestions.querySelectorAll('.suggestion-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelectedSuggestion(items, selectedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            updateSelectedSuggestion(items, selectedIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && currentSuggestions[selectedIndex]) {
                const watch = currentSuggestions[selectedIndex];
                searchResults = [watch];
                displayResults(searchResults);
                selectWatch(watch);
                headerSuggestions.classList.remove('active');
                headerInput.value = watch.name;
            } else {
                const query = headerInput.value.trim();
                if (query) {
                    performSearch(query);
                    headerSuggestions.classList.remove('active');
                }
            }
        } else if (e.key === 'Escape') {
            headerSuggestions.classList.remove('active');
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search')) {
            headerSuggestions.classList.remove('active');
        }
    });
}

function displayHeaderSuggestions(suggestions, container, query) {
    container.innerHTML = suggestions.map(watch => {
        const highlightedName = highlightMatch(watch.name, query);
        const highlightedRef = highlightMatch(watch.reference, query);
        
        return `
            <div class="suggestion-item" onclick="selectWatchFromSuggestion(${watch.id})">
                <img src="assets/images/${watch.image}" alt="${watch.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23F5F1EB%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2230%22>⌚</text></svg>'">
                <div class="suggestion-info">
                    <div class="brand">${watch.brand}</div>
                    <div class="name">${highlightedName}</div>
                    <div class="reference">Réf. ${highlightedRef}</div>
                </div>
            </div>
        `;
    }).join('');
}

function selectWatchFromSuggestion(watchId) {
    const watch = getWatchById(watchId);
    if (!watch) return;
    
    searchResults = [watch];
    displayResults(searchResults);
    selectWatch(watch);
    
    const headerSuggestions = document.querySelector('.header-search .search-suggestions');
    const headerInput = document.querySelector('.header-search input');
    
    if (headerSuggestions) {
        headerSuggestions.classList.remove('active');
    }
    if (headerInput) {
        headerInput.value = watch.name;
    }
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateSelectedSuggestion(items, index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

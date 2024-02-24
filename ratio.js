// Calculate the mcap / volume ratio of any crypto

function createRatioElement(ratio, color) {
    const pClass = document.body.classList.contains('NIGHT') ? 'sc-4984dd93-0 bpmdQz' : 'sc-4984dd93-0 ihZPK';
    const ratioElement = document.createElement('p');
    ratioElement.className = pClass;
    ratioElement.innerHTML = `Ratio: <span style="color: ${color};"><span style="font-weight: 600;">${ratio}</span></span>`;
    ratioElement.classList.add('custom-ratio');
    return ratioElement;
}

function updateTextWithRatios() {
    document.querySelectorAll('.cmc-table tbody tr').forEach(updateRowWithRatio);
}

function updateRowWithRatio(row) {
    const marketCapTd = row.querySelector('td:nth-child(8)');
    const volumeTd = row.querySelector('td:nth-child(9)');
    if (!marketCapTd || !volumeTd) {
        console.log("Market cap or volume cell not found in this row. Skipping.");
        return;
    }

    const marketCap = parseFloat(marketCapTd.innerText.replace(/[$,]/g, ''));
    const volume = parseFloat(volumeTd.innerText.replace(/[$,]/g, ''));
    const ratio = Math.floor(marketCap / volume);
    const ratioColor = getRatioColor(ratio);

    const targetDiv = volumeTd.querySelector('div[data-nosnippet="true"]');
    if (targetDiv && !targetDiv.querySelector('.custom-ratio')) {
        const originalP = targetDiv.querySelector('p');
        if (originalP) originalP.style.display = 'none';
        const ratioElement = createRatioElement(ratio, ratioColor);
        targetDiv.appendChild(ratioElement);
    }
}

function getRatioColor(ratio) {
    if (ratio <= 50) {
        return 'var(--up-color)';
    } else if (ratio <= 100) {
        return '#f6b87e';
    } else {
        return 'var(--down-color)';
    }
}

// Improved initial update logic
function initialUpdate() {
    const checkAndExecute = () => {
        if (document.querySelector('.cmc-table tbody tr')) {
            updateTextWithRatios();
        } else {
            setTimeout(checkAndExecute, 500); // Check again after a delay
        }
    };
    checkAndExecute();
}

const tableObserver = new MutationObserver((mutationsList, observer) => {
    updateTextWithRatios();
});

const themeObserver = new MutationObserver((mutationsList, observer) => {
    if (mutationsList.some(mutation => mutation.attributeName === 'class')) {
        document.querySelectorAll('.custom-ratio').forEach(element => {
            element.className = document.body.classList.contains('NIGHT') ? 'sc-4984dd93-0 bpmdQz custom-ratio' : 'sc-4984dd93-0 ihZPK custom-ratio';
        });
    }
});

// Start with the improved initial update logic
initialUpdate();

// Start observing the table for dynamic content loading
const tableConfig = { childList: true, subtree: true };
const tableElement = document.querySelector('.cmc-table');
if (tableElement) {
    tableObserver.observe(tableElement, tableConfig);
} else {
    // Fallback or retry logic if table is not immediately available
    setTimeout(() => {
        const retryTableElement = document.querySelector('.cmc-table');
        if (retryTableElement) {
            tableObserver.observe(retryTableElement, tableConfig);
        }
    }, 1000); // Adjust timing based on expected delay for table loading
}

// Delay the theme observer to ensure it only starts after the initial setup is complete
setTimeout(() => {
    const bodyConfig = { attributes: true, attributeFilter: ['class'] };
    themeObserver.observe(document.body, bodyConfig);
}, 1000); // Adjust this delay based on the expected time for the table to be fully loaded

console.log("Script initialized with dynamic theme update functionality.");

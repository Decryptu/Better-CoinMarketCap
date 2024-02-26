// Function to calculate and display the Fully Diluted Valuation (FDV) with dynamic coloring based on MCAP to FDV ratio
function displayFDVWithDynamicColoring() {
    document.querySelectorAll('.cmc-table tbody tr').forEach((row) => {
      const marketCapSpan = row.querySelector('td:nth-child(8) span[data-nosnippet="true"]');
      const circulatingSupplyColumn = row.querySelector('td:nth-child(10)');
      const fdvElementExists = row.querySelector('.custom-fdv');
  
      if (fdvElementExists || !marketCapSpan || !circulatingSupplyColumn) return;
  
      const marketCap = parseFloat(marketCapSpan.textContent.replace(/[$,]/g, ''));
      const progressBar = circulatingSupplyColumn.querySelector('div[class^="sc-4ff2400b-1"]');
      let fdv, fdvText, fdvColor;
  
      if (progressBar) {
        const progressBarWidth = progressBar.clientWidth;
        const containerWidth = progressBar.parentNode.clientWidth;
        const completionPercentage = progressBarWidth / containerWidth;
        fdv = marketCap / completionPercentage;
        const ratio = ((fdv - marketCap) / marketCap) * 100;
  
      // Determine color based on MCAP to FDV ratio
      if (ratio <= 10) {
        fdvColor = 'var(--up-color)'; // Green
      } else if (ratio <= 50) {
        fdvColor = '#f6b87e'; // Yellow
      } else {
        fdvColor = 'var(--down-color)'; // Red
      }

      fdvText = `FDV: <span style="color: ${fdvColor};">$${fdv.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`;
      } else {
        fdvText = 'FDV: ∞';
      }
  
      // Theme-dependent class selection
      const pClass = document.body.classList.contains('NIGHT') ? 'sc-4984dd93-0 bpmdQz' : 'sc-4984dd93-0 ihZPK';
  
      // Create and append the FDV element
      const fdvElement = document.createElement('span');
      fdvElement.className = `${pClass} custom-fdv`; // Apply theme-dependent class
      fdvElement.style.display = 'block';
      fdvElement.style.marginTop = '5px';
      fdvElement.innerHTML = fdvText;
  
      const marketCapContainer = marketCapSpan.parentNode;
      if (marketCapContainer) {
        marketCapContainer.appendChild(fdvElement);
      }
    });
  }
  
  // Initiate FDV display with dynamic coloring and observe for changes
  function initFDVDynamicDisplay() {
    displayFDVWithDynamicColoring();
  
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          displayFDVWithDynamicColoring();
        }
      });
    });
  
    const table = document.querySelector('.cmc-table tbody');
    if (table) {
      observer.observe(table, { childList: true, subtree: true });
    } else {
      console.log('CMC table not found.');
    }
  
    // Theme change observer to update FDV elements' classes
    const themeObserver = new MutationObserver(() => {
      document.querySelectorAll('.custom-fdv').forEach((fdvElement) => {
        fdvElement.className = document.body.classList.contains('NIGHT') ? 'sc-4984dd93-0 bpmdQz custom-fdv' : 'sc-4984dd93-0 ihZPK custom-fdv';
      });
    });
  
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFDVDynamicDisplay);
  } else {
    initFDVDynamicDisplay();
  }
  
  console.log("FDV Script with dynamic coloring initialized and monitoring for updates.");
  
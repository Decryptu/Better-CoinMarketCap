console.log("Better CMC Extension Loaded");

// Function to add our custom content
function addCustomContent() {
    // Create a new div element
    const newContentDiv = document.createElement('div');
    newContentDiv.className = 'sc-f70bb44c-0 joWCPb glo-stat-item';
    // Fetch the extension version from manifest.json
    const extensionVersion = chrome.runtime.getManifest().version;
    newContentDiv.innerHTML = `<span class="sc-f70bb44c-0 jNqpFI base-text">Better CMC:</span>&nbsp;<a href="https://github.com/Decryptu/Better-CoinMarketCap" class="sc-f70bb44c-0 iQEJet cmc-link">${extensionVersion}</a>`;

    // Use a more stable selector based on data-role and structural hierarchy
    const headerWrapper = document.querySelector('div[data-role="global-header"]');
    if (headerWrapper) {
        const globalStatsDiv = headerWrapper.querySelector('.global-stats');
        if (globalStatsDiv) {
            // Add the new content to the desired div
            globalStatsDiv.appendChild(newContentDiv);

            // Stop observing changes since we've added our content
            observer.disconnect();
            console.log("Custom content added successfully.");
        }
    }
}

// Callback for the observer when changes are detected
const observeChanges = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Use the updated selector to check if the desired div is now in the DOM
            const headerWrapper = document.querySelector('div[data-role="global-header"]');
            if (headerWrapper && headerWrapper.querySelector('.global-stats')) {
                addCustomContent();
                break; // Exit the loop once our content has been added
            }
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observeChanges);

// Configuration for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Start observing the document body for changes including the entire subtree
observer.observe(document.body, config);

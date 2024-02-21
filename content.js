console.log("Better CMC Extension Loaded");

// Function to add our custom content
function addCustomContent() {
    // Create a new div element
    const newContentDiv = document.createElement('div');
    newContentDiv.className = 'sc-f70bb44c-0 joWCPb glo-stat-item';
    // Fetch the extension version from manifest.json
    const extensionVersion = chrome.runtime.getManifest().version;
    newContentDiv.innerHTML = `<span class="sc-f70bb44c-0 jNqpFI base-text">Better CMC:</span>&nbsp;<a href="https://github.com/Decryptu/Better-CoinMarketCap" class="sc-f70bb44c-0 iQEJet cmc-link">${extensionVersion}</a>`;

    // Look for the desired div where our new content should be added
    const desiredDiv = document.querySelector('.sc-57ed43ab-1.dysfqt.global-stats');
    if (desiredDiv) {
        // Add the new content to the desired div
        desiredDiv.appendChild(newContentDiv);

        // Stop observing changes since we've added our content
        observer.disconnect();
        console.log("Custom content added successfully.");
    }
}

// Callback for the observer when changes are detected
const observeChanges = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if the desired div is now in the DOM
            if (document.querySelector('.sc-57ed43ab-1.dysfqt.global-stats')) {
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

// Note: This setup observes changes in the entire body to find the right moment to add our custom content.
// It's tailored to be gentle and efficient, stopping as soon as our job is done.

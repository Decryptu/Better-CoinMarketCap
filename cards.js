(function() {
    // Flags to prevent multiple initializations
    let initialized = false;

    // Unique function name to avoid conflicts
    function uniqueCreateMarketOverviewExtensionV2() {
        console.log('Attempting to initialize Market Overview Extension...');

        // Function to update theme-specific classes
        const updateThemeClasses = () => {
            const isNight = document.body.classList.contains('NIGHT');
            const pElements = document.querySelectorAll('.card-info-p');
            pElements.forEach(p => {
                // Remove both classes to avoid conflicts
                p.classList.remove('etDiuO', 'kKpPOn');
                // Add the appropriate class based on the theme
                if (isNight) {
                    p.classList.add('etDiuO');
                } else {
                    p.classList.add('kKpPOn');
                }
            });
        };

        // Function to hide the existing div and create the new structure
        const updateMarketOverview = () => {
            if (initialized) {
                console.log('Market Overview Extension already initialized. Skipping...');
                return;
            }

            const targetDiv = document.querySelector('.jSZydc .sc-1a5c8bdf-0.dyzKpp .sc-1a5c8bdf-1.aZNqQ');
            if (targetDiv) {
                console.log('Target div found. Proceeding with updates...');
                // Mark as initialized to prevent future executions
                initialized = true;

                // Hide the existing div
                targetDiv.style.display = 'none';

                // Create new div structure
                const newDiv = document.createElement('div');
                newDiv.className = 'sc-1a5c8bdf-1 aZNqQ';
                newDiv.innerHTML = `
                    <div>
                        <div class="sc-61710cb6-0 fyYcGd">
                            <div class="card-title">
                                <span class="card-title-icon">🪐</span>
                                <span class="card-title-text">Market Overview</span>
                            </div>
                            <a href="/charts">
                                <span>More</span>
                            </a>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-1">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                            </div>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-2">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                            </div>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-3">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                            </div>
                        </div>
                    </div>`;

                // Insert the new div after the hidden one
                targetDiv.parentNode.insertBefore(newDiv, targetDiv.nextSibling);

                // Update theme classes initially and on theme change
                updateThemeClasses();

                // Fetch and populate data from the header
                const globalHeader = document.querySelector('div[data-role="global-header"]');
                const statItems = globalHeader.querySelectorAll('.glo-stat-item');
                const cards = newDiv.querySelectorAll('.sc-c50d2aab-13.kilDhP');
                [2, 3, 4].forEach((index, i) => { // Adjusted to 0-based indexing
                    if (statItems[index]) {
                        const text = statItems[index].querySelector('.sc-f70bb44c-0.jNqpFI.base-text').innerText;
                        let data;
                        // Check if the data is directly in an <a> tag or within a <div> first
                        const directA = statItems[index].querySelector('a');
                        const divWrappedA = statItems[index].querySelector('.sc-59e437b5-2.hRcdAX a');
                        if (directA && !divWrappedA) {
                            data = directA.innerText;
                        } else if (divWrappedA) {
                            data = divWrappedA.innerText;
                        }

                        if (data) { // Ensure data is available before attempting to populate
                            cards[i].querySelector('.card-info-p').innerText = text;
                            cards[i].querySelector('.card-data-span').innerText = data;
                            console.log(`Card ${i+1} populated with data.`);
                        } else {
                            console.log(`Data for card ${i+1} not found.`);
                        }
                    }
                });
            } else {
                console.log('Target div not found. Waiting...');
            }
        };

        // Listen for theme changes to update classes dynamically
        const themeObserver = new MutationObserver(updateThemeClasses);
        themeObserver.observe(document.body, {
            attributes: true, // Listen for attribute changes
            attributeFilter: ['class'] // Specifically for class changes
        });

        // MutationObserver to wait for the page to load the required divs
        const observer = new MutationObserver((mutations, obs) => {
            if (!initialized) {
                updateMarketOverview();
            } else {
                console.log('Initialization complete. Disconnecting observer...');
                obs.disconnect(); // Stop observing after initialization is complete
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Execute the function
    uniqueCreateMarketOverviewExtensionV2();
})();

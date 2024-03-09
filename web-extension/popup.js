document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getTitle').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: function () {
                    var titleElement = document.getElementById('titleSection');
                    var bankofferElement = document.getElementById('itembox-InstantBankDiscount');
                    var cashbackElement = document.getElementById('itembox-GCCashback');
                    var pictureElement = document.getElementById('landingImage');

                    var title = titleElement ? titleElement.innerText : '';
                    var bankoffer = bankofferElement ? bankofferElement.innerText : '';
                    var cashback = cashbackElement ? cashbackElement.innerText : '';
                    var picture = pictureElement ? pictureElement.src : '';

                    return { title: title, bankoffer: bankoffer, cashback: cashback, picture: picture };
                }
            }, function (infos) {
                var title = infos[0].result.title;
                var bankoffer = infos[0].result.bankoffer;
                var cashback = infos[0].result.cashback;
                var picture = infos[0].result.picture;

                // Function to remove 'hidden' class and display the component
                function showComponent(componentId) {
                    var component = document.getElementById(componentId);
                    if (component) {
                        component.classList.remove('hidden');
                    }
                }

                if (title !== "") {
                    // Display product details
                    showComponent('productDetails');

                    document.getElementById('extension-title').innerText = title;
                    document.getElementById('extension-image').src = picture;

                    // Display bank offers
                    showComponent('bankOffers');
                    document.getElementById('bank-offers').innerText = bankoffer;
                    document.getElementById('cashback').innerText = cashback;

                    fetch('http://localhost:5000/get_flipkart_price', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ amazon_title: title })
                    })
                        .then(response => response.json())
                        .then(data => {
                            var flipkart_price = data.flipkart_price;

                            // Display Flipkart price
                            showComponent('flipkartPrice');
                            document.getElementById('flipkart-offers').innerText = "Flipkart: " + flipkart_price;
                        })
                        .catch(error => {
                            console.error('Error fetching Flipkart price:', error);
                            document.getElementById('extension-price').innerText = "Flipkart: Error fetching price";
                        });
                } else {
                    document.getElementById('extension-title').innerText = "No title found";
                }
            })

        })
    })
});

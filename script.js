function openBookDetails(bookTitle, bookPrice, bookImageURL) {
    const defaultWatermark = 'https://example.com/default-watermark.jpg'; // Replace with your default image
    const validImageURL = bookImageURL.includes('placeholder') ? defaultWatermark : bookImageURL;

    const detailsWindow = window.open('', '_blank', 'width=400,height=400');
    detailsWindow.document.write(`
        <html>
            <head>
                <title>${bookTitle} Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 20px;
                        background-color: #000;
                        color: white;
                        position: relative;
                        overflow: hidden;
                        height: 100%;
                    }
                    h1 {
                        color: white;
                    }
                    button {
                        padding: 10px 20px;
                        background-color: #28a745;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #218838;
                    }
                    .watermark {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0.1;
                        pointer-events: none;
                        background: url('${validImageURL}') no-repeat center center;
                        background-size: cover;
                    }
                </style>
            </head>
            <body>
                <div class="watermark"></div>
                <h1>${bookTitle}</h1>
                <p>Price: <strong>${bookPrice}</strong></p>
                <button id="addToCartButton">Add to Cart</button>
                <script>
                    document.getElementById('addToCartButton').addEventListener('click', function() {
                        const customAlert = document.createElement('div');
                        customAlert.textContent = 'Added to cart!';
                        customAlert.style.position = 'fixed';
                        customAlert.style.top = '50%';
                        customAlert.style.left = '50%';
                        customAlert.style.transform = 'translate(-50%, -50%)';
                        customAlert.style.backgroundColor = '#28a745';
                        customAlert.style.color = 'white';
                        customAlert.style.padding = '15px 30px';
                        customAlert.style.borderRadius = '10px';
                        customAlert.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
                        customAlert.style.fontSize = '16px';
                        customAlert.style.zIndex = '1000';

                        document.body.appendChild(customAlert);

                        setTimeout(() => {
                            document.body.removeChild(customAlert);
                        }, 2000);
                    });
                </script>
            </body>
        </html>
    `);
}

function createContentDiv(skuName, skuCount, imageUrl, sku, quantityLimit) {
    const contentDiv = document.createElement('div');
    contentDiv.style.display = 'flex';
    contentDiv.style.flexDirection = 'column';

    const imageContainer = document.createElement('div');
    const img = createImage(imageUrl);
    imageContainer.appendChild(img);
    contentDiv.appendChild(imageContainer);

    contentDiv.appendChild(createParagraph(skuName, 'title'));

    const availableCountDiv = document.createElement('div');
    availableCountDiv.classList.add('available-count');

    // Display quantity based on QuantityLimit
    if (quantityLimit) {
        availableCountDiv.innerHTML = `${skuCount} ${sku} ${skuVar} Available`; // Display SKU and SKUVAR for limited items
    } else if (skuCount > 1) {
        availableCountDiv.innerHTML = `${skuCount} Available`; // Show available count for non-limited items
    }

    contentDiv.appendChild(availableCountDiv);

    const skuDiv = document.createElement('div');
    skuDiv.classList.add('sku');
    skuDiv.innerHTML = sku; 
    contentDiv.appendChild(skuDiv);

    return contentDiv;
}

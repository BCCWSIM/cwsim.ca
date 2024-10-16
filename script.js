function displayGallery() {
    const selectedCategory = document.getElementById('categorySelect').value;
    const selectedSubcategory = document.getElementById('subcategorySelect').value;
    const gallery = document.getElementById('csvGallery');
    gallery.innerHTML = '';
    let itemCount = 0;

    const skuGroups = new Map();
    const defaultImageUrl = 'https://lh3.googleusercontent.com/d/12bSAqqLcuxVSt_HGtaGZuS0VuLtoB6X5';

    items.slice(1).forEach(item => {
        const sku = item[indices['SKU']];
        const skuVar = item[indices['SKUVAR']];
        const quantityLimit = item[indices['QuantityLimit']].trim() === 'True';
        const quantity = parseInt(item[indices['Quantity']]) || 0;
        const categoryMatch = selectedCategory === 'All' || item[indices['Category']] === selectedCategory;
        const subcategoryMatch = selectedSubcategory === 'All' || item[indices['SubCategory']] === selectedSubcategory;

        if (categoryMatch && subcategoryMatch) {
            const key = `${sku}-${skuVar}`;
            if (!skuGroups.has(key)) {
                const imageUrl = item[0] && item[0].trim() !== '' ? item[0] : defaultImageUrl; // Check for thumbnail URL
                skuGroups.set(key, {
                    count: 1,
                    skuName: item[indices['SKUName']],
                    imageUrl,
                    quantityLimit,
                    quantity,
                    sku
                });
            } else {
                skuGroups.get(key).count++;
            }
        }
    });

    skuGroups.forEach(({ count, skuName, imageUrl, sku, quantityLimit, quantity }) => {
        const div = createCard(skuName, count, imageUrl, sku, quantityLimit, quantity);
        gallery.appendChild(div);
        itemCount++;
    });

    document.getElementById('itemCount').textContent = ` ${itemCount} Found`;
}

//This 'private' class is used by Redux Actions that use sort and filter actions
const _sortProducts = (products, arg) => {
    switch(arg){
        case 'R':
            products.sort((a, b) => {
                let x = a.id;
                let y = b.id;
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case 'T':
                products.sort((a, b) => {
                    let x = a.rating;
                    let y = b.rating;
                    if (x < y) {return 1;}
                    if (x > y) {return -1;}        
                    return 0;
                });
                break;
        case 'Low-High':
            products.sort((a, b) => {
                let x = (a.discount_price)?a.discount_price : a.price;
                let y = (b.discount_price)?b.discount_price : b.price;
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case 'High-Low':
            products.sort((a, b) => {
                let x = (a.discount_price)?a.discount_price : a.price;
                let y = (b.discount_price)?b.discount_price : b.price;
                if (x < y) {return 1;}
                if (x > y) {return -1;}        
                return 0;
            });
            break;
        case 'A-Z':
            products.sort((a, b) => {
                let x = a.name.toLocaleLowerCase();
                let y = b.name.toLocaleLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case 'Z-A':
                products.sort((a, b) => {
                    let x = a.name.toLocaleLowerCase();
                    let y = b.name.toLocaleLowerCase();
                    if (x < y) {return 1;}
                    if (x > y) {return -1;}        
                    return 0;
                });
                break;
        default:
            break;
    }

    return products;
}

const _filterProducts = (products, filterSets) => {
    //First, reset all products
    for (let x = 0; x < products.length; x++){
        products[x].hidden_by_filter = false;
    }

    //Second, loop and filter
    for (let x = 0; x < filterSets.length; x++){
        const filterSet = filterSets[x];
        //If a filter has no args, ignore it
        if (filterSet.args.length === 0)
            continue;
        
        for (let y = 0; y < products.length; y++){
            const product = products[y];
            if (product.hidden_by_filter) //If it's already hidden by another filter, skip it
                continue;
            
            if (filterSet.name === 'rating'){
                product.hidden_by_filter = _hideProductByRating(filterSet.args, product[filterSet.name]);
            }
            else if (filterSet.name === 'price'){
                const _prop = (product.discount_price)?product.discount_price:product.price;
                product.hidden_by_filter = _hideProductByPrice(filterSet.args, _prop);
            }
            else {
                //Some basic prop-types may not be global - ensure a product has property first
                const _propType = product[filterSet.name];
                if (_propType){
                    product.hidden_by_filter = _hideProduct(filterSet.args, product[filterSet.name]);
                }
                else {
                    product.hidden_by_filter = true;
                }
            }
        }
    }

    return products;
}

//Filters
const _hideProduct = (args, productProp) => {
    for (let x = 0; x < args.length; x++){
        if (productProp.toString() === args[x]){
            return false;
        }
    }
    return true;
}

const _hideProductByRating = (args, productProp) => {
    for (let x = 0; x < args.length; x++){
        const val = args[x];

        if (val === '1'){
            if (productProp < 1){
                return false;
            }
        }
        else if (val === '1-2'){
            if (productProp >= 1 && productProp < 2){
                return false;
            }
        }
        else if (val === '2-3'){
            if (productProp >= 2 && productProp < 3){
                return false;
            }
        }
        else if (val === '3-4'){
            if (productProp >= 3 && productProp < 4){
                return false;
            }
        }
        else if (val === '4-5'){
            if (productProp >= 4 && productProp < 5){
                return false;
            }
        }
        else {
            if (productProp === 5){
                return false;
            }
        }
    }
    return true;
}

const _hideProductByPrice = (args, productProp) => {
    for (let x = 0; x < args.length; x++){
        const val = args[x];

        if (val === 'Less than $50'){
            if (productProp < 50){
                return false;
            }
        }
        else if (val === '$50 - $100'){
            if (productProp >= 50 && productProp < 100){
                return false;
            }
        }
        else if (val === '$100 - $250'){
            if (productProp >= 100 && productProp < 250){
                return false;
            }
        }
        else if (val === '$250 - $500'){
            if (productProp >= 250 && productProp < 500){
                return false;
            }
        }
        else if (val === '$500 - $1000'){
            if (productProp >= 500 && productProp < 1000){
                return false;
            }
        }
        else { //$1000 plus
            if (productProp >= 1000 ){
                return false;
            }
        }
    }
    return true;
}

//Exprt
export { _sortProducts, _filterProducts }
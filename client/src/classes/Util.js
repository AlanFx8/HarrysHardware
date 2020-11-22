export default class Util {
    //Get Total Cost
    GetTotalCost = (price, quantity) => {
        let values = price.toString().split(".");
        let pounds = parseInt(values[0]) * 100;
        let pennies = (values.length > 1)?parseInt(values[1]):0;

        //Caluate the total cost and round it to two places
        let total = pounds + pennies;
        total *= quantity;
        total *= .01;
        total = Number((total).toFixed(2)).toString();

        //Final check - add an extra 0 if needed
        if (total.includes(".")){
            if (total.split(".")[1].length === 1){
                total += "0";
            }
        }

        //Return it
        return total;
    }

    //Get Total Items
    GetTotalItems = obj => {
        var totalItems = 0;
        for (let x = 0 ; x < obj.length; x++){
            totalItems += parseInt(obj[x].qty);
        }
        return totalItems;
    }

    //Get Full Order
    GetFullOrder = obj => {
        var totalCosts = 0; //The cost in pennies for each order x quantity

        for (let x = 0; x < obj.length; x++){
            let price = obj[x].discount_price || obj[x].price;
            let values = price.toString().split(".");
            let pounds = parseInt(values[0]) * 100;
            let pennies = (values.length > 1)?parseInt(values[1]):0;
    
            //Caluate the total cost and round it to two places
            let total = pounds + pennies;
            total *= obj[x].qty;

            totalCosts += total;
        }

        totalCosts *= .01;
        totalCosts = Number((totalCosts).toFixed(2)).toString();

        //Final check - add an extra 0 if needed
        if (totalCosts.includes(".")){
            if (totalCosts.split(".")[1].length === 1){
                totalCosts += "0";
            }
        }

        //Return it
        return totalCosts;
    }
}
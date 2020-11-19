export default class Util {
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
}
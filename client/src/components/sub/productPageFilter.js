import React from 'react';

//The ProductsFilter class
export default class ProductPageFilter extends React.Component {
    //Constructor
    constructor(props){
        super(props);

        //Because we may be sent a sorted set of products - we need to reset them
        const products = [...this.props.products]; //Use spread operator to hard-copy array
        products.sort((a, b) => {
            let x = a.id;
            let y = b.id;
            if (x < y) {return -1;}
            if (x > y) {return 1;}        
            return 0;
        });

        //We need to use a third-party to track whether a panel is open or nor
        const filterPanelsData = [
            { propName: "brand", isOpen: true },
            { propName: "rating", isOpen: true },
            { propName: "price", isOpen: true }
        ];

        //An array of all avaliable filters and args
        //This is passed directly to the parent class (Product, ProductType, etc.)
        const filterArgs = [
            { name: 'brand', args: [] },
            { name: 'rating', args: [] },
            { name: 'price', args: [] }
        ];

        //Set the initial state
        this.state = { products, filterPanelsData, filterArgs }

        //Finally, add any extra / non-strandard properties
        for (let x = 0; x < products.length; x++){
            this.addExtraProp(products[x], 'sub_type');
            this.addExtraProp(products[x], 'battery_type');
            this.addExtraProp(products[x], 'powered_by');
        }
    }

    //Methods
    addExtraProp = (product, propName) => {
        const { filterPanelsData, filterArgs } = this.state;
        const target = product[propName];
        if (target){
            const duplicateFound = filterPanelsData.filter(op => op.propName === propName);
            if (duplicateFound.length === 0){
                filterPanelsData.push({ propName: propName, isOpen: true });
                filterArgs.push({ name: propName, args: [] });
                this.setState({filterPanelsData, filterArgs});
            }
        }
    }

    toggleFilterPanel = index => {
        const {filterPanelsData} = this.state;
        filterPanelsData[index].isOpen = !filterPanelsData[index].isOpen;
        this.setState({filterPanelsData})
    }

    onFilterChange = (propName, args) => {
        let { filterArgs } = this.state;
        for (let x = 0; x < filterArgs.length; x++){
            if (filterArgs[x].name === propName){
                filterArgs[x].args = args;
                break;
            }
        }
        this.setState({filterArgs});
        this.props.onFilterRequest(this.state.filterArgs);
    }

    //Render
    render(){
        const data = this.state.filterPanelsData.map((item, index) => {
            return <PanelBuilder
                products = { this.state.products }
                item= { item }
                index= { index }
                key= { index }
                toggleFilterPanel={ this.toggleFilterPanel }
                onFilterChange = {this.onFilterChange}
            />
        });

        return(
            <div className="products-filter">
                {data}
            </div>
        );
    }
}

///PANEL-BUILDER///
class PanelBuilder extends React.Component {
    render(){
        const {products, item, index} = this.props;
        const { propName } = item;
        let name = propName.replace("_", " ");
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const panelClass = (item.isOpen)?'filter-panel-header active':'filter-panel-header';
        return (
            <div className="filter-panel">
                <div className={panelClass} onClick={ () => this.props.toggleFilterPanel(index) } >
                    <h1>{name}</h1>
                </div>
                <div className="filter-panel-content">
                    { (propName === 'rating')?
                    <RatingCheckboxBuilder
                        products={products}
                        propName={item.propName}
                        onFilterChange={this.props.onFilterChange}
                    />
                    : (propName === 'price')?
                    <PricesCheckboxBuilder
                        products={products}
                        propName={item.propName}
                        onFilterChange={this.props.onFilterChange}
                    />
                    : <BasicCheckboxBuilder
                        products={products}
                        propName={item.propName}
                        onFilterChange={this.props.onFilterChange}
                    /> }
                </div>
            </div>
        );
    }
}

///CHECKBOX BUILDERS///
class CheckboxBase extends React.Component {
    onChange = e => {
        const propName = e.target.name;
        const checkboxes = document.querySelectorAll(`input[name="${e.target.name}"]:checked`);
        const args = [];
        for (let x = 0; x < checkboxes.length; x++){
            args.push(checkboxes[x].value);
        }
        this.props.onFilterChange(propName, args);
    }

    getOptions = (sortOptions, propName) => {
        const options = sortOptions.map(
            (option, index) => {
                return <div className="panel-option">
                    <input
                        type="checkbox"
                        name={ propName }
                        value={ option.name }
                        id={propName+index}
                        onChange={this.onChange}
                    />
                    <label htmlFor={propName+index}>
                        {option.name} ({option.quantity})
                    </label>
                </div>
            }
        );

        return options;
    }
}

class BasicCheckboxBuilder extends CheckboxBase {
    render(){
        const { products, propName } = this.props;
        const sortOptions = [];

        //First loop - build the sort options for the checkbox
        for (let x = 0; x < products.length; x++){
            const target = products[x][propName]; //Get the brand name / price / rating, etc.

            //Ensure it is a existing prop
            if (!target)
                continue;

            const duplicateFound = sortOptions.filter(op => op.name === target);
            if (duplicateFound.length > 0){
                const duplicate = sortOptions.find(op => op.name === target);
                duplicate.quantity += 1;
            }
            else {
                sortOptions.push({
                    name: target,
                    quantity: 1
                });
            }
        }

        //Second loop
        const options = this.getOptions(sortOptions, propName);

        //Return checkboxes
        return(
            <div className="filter-panel-options">
                {options}
            </div>
        );
    }
}

class RatingCheckboxBuilder extends CheckboxBase {
    render(){
        const { products, propName } = this.props;
        const sortOptions = [
            { name: '1', quantity: 0 },
            { name: '1-2', quantity: 0 },
            { name: '2-3', quantity: 0 },
            { name: '3-4', quantity: 0 },
            { name: '4-5', quantity: 0 },
            { name: '5', quantity: 0 }
        ];
        const sortOptionsFixed = [];

        //First loop
        for (let x = 0; x < products.length; x++){
            const productRating = products[x].rating;
            if (productRating < 1){
                const target = sortOptions.filter(op => op.name === '1');
                target[0].quantity++;
            }
            else if (productRating >= 1 && productRating < 2){
                const target = sortOptions.filter(op => op.name === '1-2');
                target[0].quantity++;
            }
            else if (productRating >= 2 && productRating < 3){
                const target = sortOptions.filter(op => op.name === '2-3');
                target[0].quantity++;
            }
            else if (productRating >= 3 && productRating < 4){
                const target = sortOptions.filter(op => op.name === '3-4');
                target[0].quantity++;
            }
            else if (productRating >= 4 && productRating < 5){
                const target = sortOptions.filter(op => op.name === '4-5');
                target[0].quantity++;
            }
            else {
                const target = sortOptions.filter(op => op.name === '5');
                target[0].quantity++; 
            }
        }

        //Second loop - for prices we only want to add prices that have at least one match
        for (let x = 0; x < sortOptions.length; x++){
            if (sortOptions[x].quantity > 0){
                sortOptionsFixed.push(sortOptions[x]);
            }
        }

        //Third loop - use sortOptionsFixed to build the renderers
        const options = this.getOptions(sortOptionsFixed, propName);

        //Return checkboxes
        return(
            <div className="filter-panel-options">
                {options}
            </div>
        );
    }
}

class PricesCheckboxBuilder extends CheckboxBase {
    render(){
        const { products, propName } = this.props;
        const sortOptions = [
            { name: 'Less than $50', quantity: 0 },
            { name: '$50 - $100', quantity: 0 },
            { name: '$100 - $250', quantity: 0 },
            { name: '$250 - $500', quantity: 0 },
            { name: '$500 - $1000', quantity: 0 },
            { name: '$1000 plus', quantity: 0 }
        ];
        const sortOptionsFixed = [];

        //First loop - Add quantity for each matching product
        for (let x = 0; x < products.length; x++){
            const productPrice = (products[x].discount_price)?
            products[x].discount_price:products[x].price;
            
            if (productPrice < 50){ //Less than $50
                const target = sortOptions.filter(op => op.name === 'Less than $50');
                target[0].quantity++;
            }
            else if (productPrice >= 50 && productPrice < 100){ //$50 - $100
                const target = sortOptions.filter(op => op.name === '$50 - $100');
                target[0].quantity++;
            }
            else if (productPrice >= 100 && productPrice < 250){ //$100 - $250
                const target = sortOptions.filter(op => op.name === '$100 - $250');
                target[0].quantity++;
            }
            else if (productPrice >= 250 && productPrice < 500){ //$250 - $500
                const target = sortOptions.filter(op => op.name === '$250 - $500');
                target[0].quantity++;
            }
            else if (productPrice >= 500 && productPrice < 1000){ //$500 - $1000
                const target = sortOptions.filter(op => op.name === '$500 - $1000');
                target[0].quantity++;
            }
            else { //$1000 plus
                const target = sortOptions.filter(op => op.name === '$1000 plus');
                target[0].quantity++; 
            }
        }

        //Second loop - for prices we only want to add prices that have at least one match
        for (let x = 0; x < sortOptions.length; x++){
            if (sortOptions[x].quantity > 0){
                sortOptionsFixed.push(sortOptions[x]);
            }
        }

        //Third loop - use sortOptionsFixed to build the renderers
        const options = this.getOptions(sortOptionsFixed, propName);

        //Return checkboxes
        return(
            <div className="filter-panel-options">
                {options}
            </div>
        );
    }
}
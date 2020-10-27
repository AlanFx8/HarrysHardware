import React from 'react';

//The ProductsFilter class
//It is used by the Products and ProductPageFilter page to list the filter options side-bar
export default class ProductPageFilter extends React.Component {
    //Constructor
    constructor(props){
        super(props);
        const items = [
            { propName: "brand", isOpen: true },
            { propName: "rating", isOpen: true },
            { propName: "price", isOpen: true }
        ];
        this.state = {items}
    }

    //Methods
    togglePanel = index => {
        const {items} = this.state;
        items[index].isOpen = !items[index].isOpen;
        this.setState({items})
    }

    //Render
    render(){
        const data = this.state.items.map((item, index) => {
            return <PanelBuilder
            products = { this.props.products }
            item= { item }
            index= { index }
            key= { index }
            togglePanel={ this.togglePanel }
            onFilterRequest = {this.props.onFilterRequest} />
        });

        return(
            <div className="products-filter">
                {data}
            </div>
        );
    }
}

///SUB-COMPONENTS///
class PanelBuilder extends React.Component {
    render(){
        const {products, item, index} = this.props;
        const { propName } = item;
        const name = propName.charAt(0).toUpperCase() + propName.slice(1);
        const panelClass = (item.isOpen)?'filter-panel-header active':'filter-panel-header';
        return (
            <div className="filter-panel">
                <div className={panelClass} onClick={ () => this.props.togglePanel(index) } >
                    <h1>{name}</h1>
                </div>
                <div className="filter-panel-content">
                    <BasicCheckboxBuilder
                        products={products}
                        propName={item.propName}
                        onFilterRequest={this.props.onFilterRequest}
                    />
                </div>
            </div>
        );
    }
}

//Note: Basic refers to brands, cordless, battery-type, etc.
//Ratings and prices have specialized checkboxes
class BasicCheckboxBuilder extends React.Component {
    onChange = e => {
        const propName = e.target.name;
        const checkboxes = document.querySelectorAll(`input[name="${e.target.name}"]:checked`);
        const args = [];
        for (let x = 0; x < checkboxes.length; x++){
            args.push(checkboxes[x].value);
        }
        this.props.onFilterRequest(propName, args);
    }

    render(){
        const { products, propName } = this.props;
        const sortOptions = [];

        //First loop - build the sort options for the checkbox
        for (let x = 0; x < products.length; x++){
            const target = products[x][propName]; //Get the brand name / price / rating, etc.
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
        const options = sortOptions.map(
            (option) => {
                return <div className="panel-option-wrapper">
                    {option.name} ({option.quantity})
                    <input type="checkbox" name={ propName } value={ option.name }
                    onChange={this.onChange} />
                </div>
            }
        );

        //Return checkboxes
        return(
            <div className="filter-panel-options">
                {options}
            </div>
        );
    }
}
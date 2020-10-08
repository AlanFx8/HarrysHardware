import React from 'react';

export default class ProductInfo extends React.Component {
    render(){
        const _id = this.props.match.params.id;
        return (
            <div>I list the details of product {_id }.</div>
        );
    }
}
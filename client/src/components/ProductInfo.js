import React from 'react';

export default class ProductInfo extends React.Component {
    render(){
        const _id = this.props.match.params.id;
        const _type = this.props.match.params.type;
        return (
            <div>I list the details of product {_id } from the {_type} department.</div>
        );
    }
}
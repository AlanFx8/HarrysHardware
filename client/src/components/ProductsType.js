import React from 'react';

export default class ProductsType extends React.Component {
    render(){
        const _type = this.props.match.params.type;
        return (
            <div>I list products of type: {_type }.</div>
        );
    }
}
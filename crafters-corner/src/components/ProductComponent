import React from 'react';
import PropTypes from 'prop-types';

function ProductComponent({ product }) {
  return (
    <div>
      <img src={product.imgSrc} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
    </div>
  );
}

ProductComponent.propTypes = {
  product: PropTypes.shape({
    sold: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductComponent;
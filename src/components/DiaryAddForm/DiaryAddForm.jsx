import React, { useEffect } from 'react'
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";

import styles from './DiaryAddForm.module.css'
import Button from '../commonComponents/Button';
import clsx from 'clsx';
import { usePublic } from '../../hooks/usePublic';
import { fetchProducts } from '../../redux/public/operationsPublic';

const breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width:768px)",
    desktop: "(min-width:1024px)",
};

function DiaryAddForm({
    searchTerm,
    setSearchTerm,
    filteredProducts,
    quantity,
    setQuantity,
    handleAddProduct,
    handleProductsForSelectedDate,
    date }) {
    const isMobile = useMediaQuery({ query: breakpoints.mobile })
    const { dispatch } = usePublic()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <div className={styles.inputsContainer}>
            <input
                className={clsx(styles.input, styles.name)}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                list="productList"
                placeholder="Search product name *"
            />
            <datalist id="productList">
                {filteredProducts.map((product) => (
                    <option key={product._id} value={product.title}> {/* Use the title */}
                        {product.title}
                    </option>
                ))}
            </datalist>

            <input
                className={clsx(styles.input, styles.quantity)}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Grams *"
                step={50}
            />

            {!isMobile && <Button
                variant="plusButton"
                handleClick={() => {
                    handleAddProduct();
                    handleProductsForSelectedDate(date);
                }}
                disabled={!date || !searchTerm || !quantity}
            >
                +
            </Button>}
        </div>)
}

DiaryAddForm.propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    filteredProducts: PropTypes.array,
    quantity: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    setQuantity: PropTypes.func,
    handleAddProduct: PropTypes.func,
    handleProductsForSelectedDate: PropTypes.func,
    date: PropTypes.string,
};

export default DiaryAddForm
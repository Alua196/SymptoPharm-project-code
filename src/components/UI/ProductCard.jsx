import React from 'react';
import { motion } from 'framer-motion';
import "../../styles/product-card.css";
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { favActions } from '../../redux/slices/favSlice';

const ProductCard = ({ item }) => {


    const dispatch = useDispatch()

    const addToFav = () => {
        dispatch(
            favActions.addItem({
                id: item.id,
                productName: item.productName,
                price: item.price,
                imgURL: item.imgURL,
            })
        );

        toast.success("Product added successfully!");
    };

    return (
        <Col lg='3' md='4' className="mb-2">
            <div className="product__item">
                <div className="product__img">
                    <motion.img whileHover={{ scale: 0.9 }} src={item.imgURL} alt="" />
                </div>
                <div className="p-2 product__info">
                    <h3 className="product__name">
                        <Link to={`/products/${item.id}`}>{item.productName}</Link>
                    </h3>
                    <span>{item.group}</span>
                </div>
                <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">{item.price}₸</span>
                    <motion.span whileTap={{ scale: 1.2 }} onClick={addToFav}>
                        <i class="ri-heart-add-line"></i>
                    </motion.span>
                </div>
            </div>
        </Col>
    );
};

export default ProductCard;
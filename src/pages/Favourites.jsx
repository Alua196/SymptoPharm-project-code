
import React from 'react';

import '../styles/favourites.css';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import { motion } from "framer-motion";
import { favActions } from '../redux/slices/favSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Favourites = () => {

    const favItems = useSelector(state => state.favourites.favItems);
    const totalAmount = useSelector(state => state.favourites.totalAmount);


    return <Helmet title={"Favourites"}>
        <CommonSection title="Favourite Products" />

        <section>
            <Container>
                <Row>
                    <Col lg='9'>
                        {
                            favItems.length === 0 ? (
                                <h2 className='fs-4 text-center'>No item added to Favourites</h2>
                            ) : (
                                <table className='table boarded'>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            favItems.map((item, index) => (
                                                <Tr item={item} key={index} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                        }


                    </Col>

                    <Col lg='3'>
                        <div>
                            <h6 className='d-flex align-items-center justify-content-between'>
                                Subtotal
                                <span className='fs-4 fw-bold'>{totalAmount}₸</span>
                            </h6>
                            
                        </div>
                        <div>
                            <button className='buy__btn w-100'>
                                <Link to='/products'>Continue Exploring</Link>
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </Helmet>

};


const Tr = ({ item }) => {

    const dispatch = useDispatch();

    const deleteProduct = ()=>{
        dispatch(favActions.deleteItem(item.id))
    }


    return (
        <tr>
            <td><img src={item.imgUrl} alt="" /></td>
            <td>{item.productName}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td><motion.i 
            whileTap={{ scale: 1.2 }} 
            onClick={deleteProduct}
            class="ri-delete-bin-line"
            ></motion.i></td>
        </tr>
    );
};

export default Favourites;
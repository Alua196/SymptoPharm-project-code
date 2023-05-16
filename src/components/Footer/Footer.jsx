import React from "react";
import './footer.css';

// import logo from '../../assets/images/eco-logo.png'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";



const Footer = () => {

    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg='4' className="mb-4" md='6'>
                        <div className="logo">
                            <div>
                                <h1 className="text-white">SymptoPharm</h1>
                            </div>
                        </div>

                        <p className="footer__text mt-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque error, asperiores ipsam temporibus a vero deserunt quisquam?
                        </p>
                    </Col>

                    <Col lg='3' md='3' className="mb-4">
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Top Categories</h4>
                            <ListGroup className="mb-3">
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Vitamins</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Antibiotics</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Digestive</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Skin</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Cough and Flu</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Fever</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Antiseptics</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg='2' md='3' className="mb-4">
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Useful Links</h4>
                            <ListGroup className="mb-3">
                            <ListGroupItem className="ps-0 border-0">
                                    <Link to='/products'>Products</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/favourites'>Favourites</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/login'>Login</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Privacy Policy</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg='3' md='4'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Contact</h4>
                            <ListGroup className="footer__contact">
                            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i class="ri-map-pin-line"></i></span>
                                    <p>Mangilik El avenue, 55/11<br />
                                        Business center EXPO, block C1<br />
                                        Astana, Kazakhstan, 010000</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i class="ri-phone-line"></i></span>
                                    <p>+7 (7172) 645-716</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                <span><i class="ri-mail-send-line"></i></span>
                                    <p>info@astanait.edu.kz</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg='12'>
                        <p className="footer_copyright">Copyright {year} developed by NA Group.  All rights reserved. </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
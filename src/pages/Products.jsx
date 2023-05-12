
import React,{useState} from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';

import '../styles/products.css';

import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';

const Products = () => {

    const [productsData, setProductsData] = useState(products);


    const handleFilter = (e )=>{

        const filterValue = e.target.value 
        if(filterValue==='Antibiotics') {
            const filteredProducts = products.filter(item=> item.category==='Antibiotics');

            setProductsData(filteredProducts);
        }

        if(filterValue==='Vitamins') {
            const filteredProducts = products.filter(item=> item.category==='Digestive');

            setProductsData(filteredProducts);
        }

        if(filterValue==='Vitamins') {
            const filteredProducts = products.filter(item=> item.category==='Vitamins');

            setProductsData(filteredProducts);
        }

        if(filterValue==='Skin') {
            const filteredProducts = products.filter(item=> item.category==='Skin');

            setProductsData(filteredProducts);
        }

        if(filterValue==='Cough and Flu') {
            const filteredProducts = products.filter(item=> item.category==='Cough and Flu');

            setProductsData(filteredProducts);
        }

        if(filterValue==='Fever') {
            const filteredProducts = products.filter(item=> item.category==='Fever');

            setProductsData(filteredProducts);
        }

        if(filterValue==='Antiseptics') {
            const filteredProducts = products.filter(item=> item.category==='Antiseptics');

            setProductsData(filteredProducts);
        }

    }


    const handleSearch = e=>{
        const searchTerm = e.target.value 

        const searchedProducts = products.filter(
            item=> item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const searchedSymptom = products.filter(
            item=> item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProductsData(searchedProducts);
        setProductsData(searchedSymptom);
    }


    return <Helmet title={"Products"}>
        <CommonSection title="Products" />


        <section>
            <Container>
                <Row>
                    <Col lg='3' md='6'>
                        <div className="filter__widget">
                            <select onChange={handleFilter}>
                                <option>Filter by Category</option>
                                <option value="Antibiotics">Antibiotics</option>
                                <option value="Vitamins">Vitamins</option>
                                <option value="Digestive">Digestive</option>
                                <option value="Skin">Skin</option>
                                <option value="Cough and Flu">Cough and Flu</option>
                                <option value="Fever">Fever</option>
                                <option value="Antiseptics">Antiseptics</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg='3' md='6' className='text-end'>
                    <div className="filter__widget">
                            <select>
                                <option>Sort by</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg='6' md='12'>
                        <div className="search__box">
                            <input type="text" placeholder='Search...' onChange={handleSearch} />
                            <span><i class="ri-search-2-line"></i></span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section className='pt-0'>
            <Container>
                <Row>
                    {productsData.length === 0 ? (
                        <h1 className='text-center fs-4'>No products are found!</h1>
                    ) : (
                        <ProductsList data={productsData} />
                    )}
                </Row>
            </Container>
        </section>
    </Helmet>
}

export default Products;
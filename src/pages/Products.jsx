
import React, { useEffect, useState } from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';

import '../styles/products.css';

import ProductsList from '../components/UI/ProductsList';

import useGetData from '../custom-hooks/useGetData';

const Products = () => {

    const { data: products } = useGetData('products');
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        if (products) {
            setProductsData(products);
        }
    }, [products]);


    const handleFilter = (e) => {

        const filterValue = e.target.value
        if (filterValue === 'Analgetic') {
            const filteredProducts = products.filter(item => item.group === 'Analgetic');

            setProductsData(filteredProducts);
        }

        if (filterValue === 'Angioprotective') {
            const filteredProducts = products.filter(item => item.group === 'Angioprotective');

            setProductsData(filteredProducts);
        }

        if (filterValue === 'BAD') {
            const filteredProducts = products.filter(item => item.group === 'BAD');

            setProductsData(filteredProducts);
        }

        if (filterValue === 'Respiratory') {
            const filteredProducts = products.filter(item => item.group === 'Respiratory');

            setProductsData(filteredProducts);
        }

        if (filterValue === 'Nervous') {
            const filteredProducts = products.filter(item => item.group === 'Nervous');

            setProductsData(filteredProducts);
        }

        if (filterValue === 'Gastrointestinal') {
            const filteredProducts = products.filter(item => item.group === 'Gastrointestinal');

            setProductsData(filteredProducts);
        }

        if (filterValue === 'Vitamins') {
            const filteredProducts = products.filter(item => item.group === 'Vitamins');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'Pregnant') {
            const filteredProducts = products.filter(item => item.group === 'Pregnant');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'Gynecology') {
            const filteredProducts = products.filter(item => item.group === 'Gynecology');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'Antifungal') {
            const filteredProducts = products.filter(item => item.group === 'Antifungal');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'Ear') {
            const filteredProducts = products.filter(item => item.group === 'Ear');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'VitamOphthalmicins') {
            const filteredProducts = products.filter(item => item.group === 'Ophthalmic');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'Nasal') {
            const filteredProducts = products.filter(item => item.group === 'Nasal');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'Antiplatelet') {
            const filteredProducts = products.filter(item => item.group === 'Antiplatelet');

            setProductsData(filteredProducts);
        }
        if (filterValue === 'Dermatotropic') {
            const filteredProducts = products.filter(item => item.group === 'Dermatotropic');

            setProductsData(filteredProducts);
        }

    }


    const handleSearch = e => {
        const searchTerm = e.target.value

        const searchedProducts = products.filter(
            item => item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const searchedSymptom = products.filter(
            item => item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProductsData(searchedProducts);
        setProductsData(searchedSymptom);
    }


    return <Helmet title={"Products"}>
        <CommonSection title="Products" />


        <section>
            <Container>
                <Row>
                    <Col lg='12' md='6'>
                        <div className="filter__widget">
                            <select onChange={handleFilter}>
                                <option>Filter by Group</option>
                                <option value="Analgetic">Анальгетические и нестероидные противовоспалительные препараты</option>
                                <option value="Angioprotective">Ангиопротекторное средство</option>
                                <option value="BAD">БАД</option>
                                <option value="Respiratory">Препараты для лечения гриппа и ОРВИ</option>
                                <option value="Nervous">Препараты для лечения заболеваний нервной системы</option>
                                <option value="Gastrointestinal">Препараты для лечения и профилактики заболеваний желудочно-кишечного тракта</option>
                                <option value="Vitamins">Препараты, содержащие витамины, минералы, растительные антиоксиданты</option>
                                <option value="Pregnant">Препараты для беременных</option>
                                <option value="Gynecology">Препараты, применяемые в акушерстве и гинекологии</option>
                                <option value="Antifungal">Антифунгальные (противогрибковые) средства</option>
                                <option value="Ear">Ушные капли</option>
                                <option value="Ophthalmic">Офтальмологические средства</option>
                                <option value="Nasal">Ежедневная гигиена, профилактика и комплексное лечение воспалительных заболеваний полости носа, околоносовых пазух и носоглотки</option>
                                <option value="Antiplatelet">Антиагрегатное средство</option>
                                <option value="Dermatotropic">Дерматотропные препараты</option>
                            </select>
                        </div>
                    </Col>
                    {/* <Col lg='3' md='6' className='text-end'>
                        <div className="filter__widget">
                            <select>
                                <option>Sort by</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </Col> */}
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
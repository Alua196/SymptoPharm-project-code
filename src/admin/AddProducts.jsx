
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';

import { storage } from '../firebase.config';
import { db } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {

    const [enterTitle, setEnterTitle] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterDesc, setEnterDesc] = useState('');
    const [enterGroup, setEnterGroup] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProdImg, setEnterProdImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const product = {
        //     title: enterTitle,
        //     shortDesc: enterShortDesc,
        //     description: enterDesc,
        //     group: enterGroup,
        //     price: enterPrice,
        //     imgURL: enterProdImg
        // };

        //add product to the firebase database

        try {
            const productsRef = collection(db, 'products');
            const storageRef = ref(storage, `productImages/${Date.now() + enterProdImg.name}`);

            const uploadTask = uploadBytesResumable(storageRef, enterProdImg);

            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed', null, (error) => {
                    toast.error('Images not uploaded!')
                    reject(error);
                }, async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        const productData = {
                            title: enterTitle,
                            shortDesc: enterShortDesc,
                            description: enterDesc,
                            group: enterGroup,
                            price: enterPrice,
                            imgURL: downloadURL
                        };
                        await addDoc(productsRef, productData);
                        toast.success('Product successfully added!');
                        resolve();
                    } catch (error) {
                        toast.error('Error adding product');
                        reject(error);
                    }
                });
            });

            setLoading(false);
            navigate("/dashboard/all-products");

        } catch (err) {
            setLoading(false);
            toast.error("Product not added!");
        }

        // console.log(product);
    };


    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        {
                            loading ? (
                                <h4 className='py-5'>Loading........</h4>
                            ) : (
                                <>

                                    <h4 className='mb-5'>Add Product</h4>
                                    <Form onSubmit={addProduct}>
                                        <FormGroup className="form__group">
                                            <span>Product Title</span>
                                            <input
                                                type="text"
                                                placeholder='Paracetamol'
                                                value={enterTitle}
                                                onChange={e => setEnterTitle(e.target.value)}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Short Description</span>
                                            <input
                                                type="text"
                                                placeholder='Lorem ipsum.....'
                                                value={enterShortDesc}
                                                onChange={e => setEnterShortDesc(e.target.value)}
                                                required
                                            />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <span>Description</span>
                                            <input
                                                type="text"
                                                placeholder='Description.....'
                                                value={enterDesc}
                                                onChange={e => setEnterDesc(e.target.value)}
                                                required
                                            />
                                        </FormGroup>

                                        <div className='d-flex align-items-center justify-content-between gap-5'>
                                            <FormGroup className="form__group w-50">
                                                <span>Price</span>
                                                <input type="number"
                                                    placeholder='1000₸'
                                                    value={enterPrice}
                                                    onChange={e => setEnterPrice(e.target.value)}
                                                    required
                                                />
                                            </FormGroup>

                                            <FormGroup className="form__group w-50">
                                                <span>Group</span>
                                                <select
                                                    className='w-100 p-2'
                                                    value={enterGroup}
                                                    onChange={e => setEnterGroup(e.target.value)}
                                                    required
                                                >
                                                    <option>Filter by Category</option>
                                                    <option value="Antibiotics">Antibiotics</option>
                                                    <option value="Vitamins">Vitamins</option>
                                                    <option value="Digestive">Digestive</option>
                                                    <option value="Skin">Skin</option>
                                                    <option value="Cough and Flu">Cough and Flu</option>
                                                    <option value="Fever">Fever</option>
                                                    <option value="Antiseptics">Antiseptics</option>
                                                </select>
                                            </FormGroup>
                                        </div>

                                        <div>
                                            <FormGroup className="form__group">
                                                <span>Product Image</span>
                                                <input
                                                    type="file"
                                                    onChange={e => setEnterProdImg(e.target.files[0])}
                                                    required
                                                />
                                            </FormGroup>
                                        </div>

                                        <button className="buy__btn" type='submit'>Add Product</button>
                                    </Form>
                                </>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddProducts;
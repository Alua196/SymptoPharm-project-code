
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
                            productName: enterTitle,
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
                                                    <option>Select Group</option>
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

import React, { useState } from 'react';

import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

import { auth } from '../firebase.config';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';

import { toast } from 'react-toastify';


import '../styles/signup.css';



const Signup = () => {

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            const storageRef = ref(storage, `images/${Date.now() + fullname}`)
            const uploadTask = uploadBytesResumable(storageRef, file)


            try {
                const snapshot = await uploadTask;
                const downloadURL = await getDownloadURL(snapshot.ref);

                await updateProfile(user, {
                    displayName: fullname,
                    photoURL: downloadURL
                });

                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName: fullname,
                    email,
                    photoURL: downloadURL
                });
            } catch (error) {
                console.log(error.message);
            }


            console.log(user)
            setLoading(false);

            toast.success('Account created')
            navigate('/Login')
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong");
        }
    }




    return (
        <Helmet title={"Signup"}>
            <section>
                <Container>
                    <Row>
                        {
                            loading ? <Col lg='12' className="text-center"><h5 className="fw-bold">Loading.....</h5></Col> :
                                <Col lg='6' className='m-auto text-center'>
                                    <h3 className="fw-bold fs-4 mb-4">Signup</h3>

                                    <Form className='auth__form' onSubmit={signUp}>
                                        <FormGroup className='form__group'>
                                            <input type="text" placeholder='fullname'
                                                value={fullname} onChange={e => setFullname(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className='form__group'>
                                            <input type="email" placeholder='Enter your email'
                                                value={email} onChange={e => setEmail(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className='form__group'>
                                            <input type="password" placeholder='Enter your password'
                                                value={password} onChange={e => setPassword(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className='form__group'>
                                            <input type="phone" placeholder='Enter your phone number'
                                                value={phone} onChange={e => setPhone(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className='form__group'>
                                            <input type="address" placeholder='Enter your address'
                                                value={address} onChange={e => setAddress(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className='form__group'>
                                            <input type="file"
                                                onChange={e => setFile(e.target.files[0])} />
                                        </FormGroup>

                                        <button type='submit' className="buy__btn auth__btn">Create an account</button>
                                        <p>
                                            Already have an account?{" "}
                                            <Link to="/login">Login</Link>
                                        </p>
                                    </Form>
                                </Col>
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Signup;
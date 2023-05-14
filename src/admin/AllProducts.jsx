
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { toast } from 'react-toastify';

const AllProducts = () => {

    const { data: productsData, loading } = useGetData('products');

    const deleteProd = async(id)=>{
        await deleteDoc(doc(db,'products', id));
        toast.success("Product deleted!");
    }

    return <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Group</th>
                                <th>Price</th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? (
                                    <h4 className='py-5 text-center fw-bold'>Loading......</h4>
                                ) : (
                                    productsData.map(item => (
                                        <tr key={item.id}>
                                            <td><img src={item.imgURL} alt="" /></td>
                                            <td>{item.title}</td>
                                            <td>{item.group}</td>
                                            <td>{item.price}₸</td>
                                            <td>
                                                <button onClick={()=>{deleteProd(item.id)}} className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    </section>
}

export default AllProducts;
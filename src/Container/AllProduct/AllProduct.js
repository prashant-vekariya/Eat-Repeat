import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getproductactiondata } from '../../Redux/Action/addProduct.action';

function AllProduct(props) {

    const [visibility, setVisibility] = useState(8)

    const product = useSelector(state => state.product);
    const productdata = product.product
    console.log(productdata);

    
    const history = useHistory();
    
    const handleReadmore = (data) => {
        console.log(data)
        history.push('/productReadmore',data)
    }

    const handleShowmore = () => {
        setVisibility((previousvalue) => previousvalue + 4)
    }

    const handleShowless = () => {
        setVisibility(8)
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getproductactiondata());
    }, [])
    return (
        <>
            <section className='relative'>
                <div className='otherslider flex items-end '>
                    <div className='container flex justify-center'>
                        <h1 className='text-white text-4xl font-bold'>Our Product</h1>
                    </div>
                </div>
            </section>
            <section>
                <div className='container'>
                    <div>
                        <h2 className='text-4xl font-medium text-red-600 my-12'>Our All Product</h2>
                    </div>
                    <div>
                        <div className='grid grid-cols-4'>
                            {
                                productdata.slice(0,visibility).map((p) => (
                                    <div className='flex justify-between mx-4 my-6'>
                                        <div>
                                            <div className='flex items-center h-52'>
                                                <img src={p.file} width={200} alt />
                                            </div>
                                            <div className='flex justify-between'>
                                                <h4 className='font-bold text-xl'>{p.Name}</h4>
                                                <p className='text-lg font-medium text-red-600'>${p.Price}</p>
                                            </div>
                                            <p className='text-base'>This is best pizza in your whole life Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate.</p>
                                            <button className='header-button text-white mt-3' onClick={() => { handleReadmore(p) }}>Read More....</button>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                        <div className='py-5 text-center'>
                            {
                                productdata.length <= visibility?
                                <button className='slider-button text-white' onClick={handleShowless}>Back to Top</button>:
                                <button className='slider-button text-white' onClick={handleShowmore}>Show More</button>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AllProduct;
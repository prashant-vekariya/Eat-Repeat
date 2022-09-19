import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getproductactiondata } from '../../Redux/Action/addProduct.action';

function Product(props) {
    const productdatainreducer = useSelector(state => state.product);
    const productdata = productdatainreducer.product
    console.log(productdata);

    
    const history = useHistory();


    const dispatch = useDispatch()

    const handleReadmore = (data) => {
        console.log(data)
        history.push('/productReadmore',data)
    }

    useEffect(() => {
        dispatch(getproductactiondata());
    }, [])
    return (
        productdata.slice(0,4).map((p) => (
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
                    <button className='header-button text-white mt-3' onClick={()=>{handleReadmore(p)}}>Read More....</button>
                </div>
            </div>
        ))
    );
}

export default Product;
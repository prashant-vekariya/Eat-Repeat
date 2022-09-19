import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getcategoryactiondata } from '../../Redux/Action/addcategory.action';
import { alldatafilterforcategory, getproductactiondata } from '../../Redux/Action/addProduct.action';

function AllCategories(props) {
    const [cattype, setCattype] = useState('All');

    console.log(cattype)

    const category = useSelector(state => state.categories);
    const categorydata = category.category
    console.log(categorydata);


    const product = useSelector(state => state.product);
    const productdata = product.product
    console.log(productdata);

    const handlecategory = (data) => {
        console.log(data)
        setCattype(data)
        // dispatch(alldatafilterforcategory(data))
    }
    
    const filterDetail = productdata.filter((p)=>p.category === cattype)  

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getproductactiondata());
        dispatch(getcategoryactiondata());
    }, [])
    

    const history = useHistory();
    
    const handleReadmore = (data) => {
        console.log(data)
        history.push('/productReadmore',data)
    }

    return (
        <>
            <section className='relative'>
                <div className='otherslider flex items-end '>
                    <div className='container flex justify-center'>
                        <h1 className='text-white text-4xl font-bold'>Categories</h1>
                    </div>
                </div>
            </section>
            <section className='py-9'>
                <div className='container'>
                    <h2 className='text-4xl font-medium text-red-600 my-12'>Categories</h2>
                    <div className='flex'>
                        <div className='w-1/5 flex flex-col'>
                            {
                                categorydata.map((c) => (
                                    <button type='submit' className='text-left py-2 flex items-center' onClick={() => { handlecategory(c.category) }}>
                                        <img src={c.file} width={40} />
                                        <span className='ml-2 font-bold'>{c.category}</span></button>
                                        
                                ))
                            }
                        </div>
                        <div className='w-4/5'>
                            <div className='grid grid-cols-3'>
                                {
                                    cattype === 'All'? 
                                    productdata.map((p) => (
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
                                    :
                                    filterDetail.map((p) => (
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
                                }
                            {
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AllCategories;
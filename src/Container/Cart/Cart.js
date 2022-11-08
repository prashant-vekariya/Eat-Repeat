import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproductactiondata } from '../../Redux/Action/addProduct.action';
import { cartgetdataaction, decrementcounter, deletedataaction, incrementcounter } from '../../Redux/Action/cart.action';
import ClearIcon from '@mui/icons-material/Clear';
import { useHistory } from 'react-router-dom';

function Cart(props) {


    const cartdata = useSelector(state => state.cartRe)
    const cart = cartdata.cart
    // console.log(cart)

    const productdata = useSelector(state => state.product)
    const product = productdata.product
    // console.log(product)


    const productfilter = []

    cart.map(c => (product.map((p) => {
        if (p.id === c.id) {
            const data = {
                ...p,
                quantity: c.quantity
            }
            productfilter.push(data)
        }
    })))

    // SubTotal..................................

    const subtotal = []

    productfilter.map((c) => (
        subtotal.push(c.Price * c.quantity)
    ))
    // console.log(subtotal)

    let subtotalsum = subtotal.reduce(function (a, b) {
        return a + b;
    }, 0);


    // UseEffect..................................

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getproductactiondata())
        dispatch(cartgetdataaction())
    }, [])



    // Counter..................................


    function handleincrement(id) {
        // console.log(id);
        dispatch(incrementcounter(id));
    }

    const handledecrement = (id) => {
        // console.log(id)
        dispatch(decrementcounter(id))
    }

    const handledelete = (id) => {
        dispatch(deletedataaction(id))
    }

    const history = useHistory()

    const handleCheckout = () => {

        const finalcart = {
            productfilter,
            subtotalsum
        }
        history.push('/checkout',finalcart)
    }

    return (
        <>
            <section className='relative'>
                <div className='otherslider flex items-end '>
                    <div className='container flex justify-center'>
                        <h1 className='text-white text-4xl font-bold'>Your Cart</h1>
                    </div>
                </div>
            </section>
            <section className='py-14'>
                <div className='container'>
                    <div>
                        <h2 className='text-4xl font-medium text-red-600 my-6'>Your Cart</h2>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr className='text-red-600'>
                                    <th>Images</th>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            {
                                productfilter.map((C) => (

                                    <tbody>
                                        <tr>
                                            <td>
                                                <a href="">
                                                    <img src={C.file} alt='' width={70} />
                                                </a>
                                            </td>
                                            <td className="">
                                                <a href="">{C.Name}</a>
                                            </td>
                                            <td className="">
                                                <span className="">${C.Price}</span>
                                            </td>
                                            <td className="">
                                                <div className="text-center">
                                                    <div className='flex justify-center'>
                                                        <button onClick={() => handleincrement(C.id)} className='border-2 px-4'>+</button>
                                                        <p className='border-2 px-4'>{C.quantity}</p>
                                                        <button disabled={C.quantity === 1 && true} onClick={() => handledecrement(C.id)} className='border-2 px-4'>-</button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="">
                                                <span className="">${C.Price * C.quantity}</span>
                                            </td>
                                            <td className="">
                                                <button onClick={() => handledelete(C.id)}><ClearIcon /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </table>
                    </div>
                    <div className='mt-9'>
                        <div className="flex justify-end">
                            <div className="w-5/12 py-4 px-9 border-2">
                                <h2 className='text-2xl font-medium text-red-600'>Cart Totals</h2>
                                <div className="mt-4 flex justify-between">
                                    <div className='text-xl font-semibold'>Subtotal</div>
                                    <div>${subtotalsum}</div>
                                </div>
                                <div className='border-t-2 my-2'></div>
                                <div className="flex justify-between">
                                    <div className='text-xl font-semibold'>Total<span className='text-xs'>(+20% Delivery charge)</span></div>
                                    <div>${subtotalsum + subtotalsum * 20 / 100}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button className="header-button mt-3 text-white font-semibold" onClick={()=>{handleCheckout()}}>Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cart;   
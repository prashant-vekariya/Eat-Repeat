import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproductactiondata } from '../../Redux/Action/addProduct.action';
import { cartgetdataaction } from '../../Redux/Action/cart.action';

function Cart(props) {


    const cartdata = useSelector(state => state.cart)
    const cart = cartdata.cart
    console.log(cart)

    const productdata = useSelector(state => state.product)
    const product = productdata.product
    console.log(product)
    

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getproductactiondata())
        dispatch(cartgetdataaction())
    }, [])


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
                    <form>
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
                                    cart.map((C) => (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <a href="">
                                                        <img src="assets/img/shop/product/product-2.jpg" alt='' />
                                                    </a>
                                                </td>
                                                <td className="">
                                                    <a href=""></a>
                                                </td>
                                                <td className="">
                                                    <span className="">$130.00</span>
                                                </td>
                                                <td className="">
                                                    <div className="text-center">
                                                        <input type="text" className='w-14 text-center border-2 p-3' defaultValue={1} />
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <span className="">$130.00</span>
                                                </td>
                                                <td className="">
                                                    <a href="">*</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-5 ml-auto">
                                <div className="cart-page-total">
                                    <h2>Cart totals</h2>
                                    <ul className="mb-20">
                                        <li>Subtotal <span>$250.00</span></li>
                                        <li>Total <span>$250.00</span></li>
                                    </ul>
                                    <a className="os-btn" href="checkout.html">Proceed to checkout</a>
                                </div>
                            </div>
                        </div> */}
                    </form>
                </div>
            </section>
        </>
    );
}

export default Cart;   
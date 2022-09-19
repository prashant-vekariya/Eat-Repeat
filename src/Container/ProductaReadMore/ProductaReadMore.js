import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cartadddataaction } from '../../Redux/Action/cart.action';

function ProductaReadMore(props) {
    const [quantity , setQuantity] = useState(1);
    const ReadeMoreValue = [props.location.state]
    // console.log(ReadeMoreValue)
    // console.log(quantity);

    const history = useHistory();
    const dispatch = useDispatch()

    const handleaddCartdata = (id) => {
        const cartdata = {
            id,
            quantity
        }
        console.log(cartdata)
        dispatch(cartadddataaction(cartdata))
        history.push('/cart');
    }


    const handlehome = () => {
        history.push('/')
    }


    return (
        <>
            <section className='relative'>
                <div className='otherslider flex items-end '>
                    <div className='container flex justify-center'>
                        <h1 className='text-white text-4xl font-bold'>Product Details</h1>
                    </div>
                </div>
            </section>
            <section className="container py-9">
                {
                    ReadeMoreValue.map((r)=>(
                        <div className="flex items-center">
                            <div className="w-2/5">
                                <img src={r.file} width={300} />
                            </div>
                            <div className="w-3/5">
                                <div>
                                    <h4 className='text-4xl font-bold text-red-600 mb-4'>{r.Name}</h4>
                                    <span className='text-2xl font-semibold mb-3'>${r.Price}</span>
                                    <p className='text-base w-2/4 my-2'>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram.</p>
                                    <button className="slider-button font-semibold" onClick={()=>{handleaddCartdata(r.id)}}>+ Add to Cart</button>
                                </div>
                                <button onClick={() => { handlehome() }} className='text-xs font-semibold text-slate-500'>Back to Home Page?</button>
                            </div>
                        </div>
                    ))
                }
            </section>
        </>
    );
}

export default ProductaReadMore;
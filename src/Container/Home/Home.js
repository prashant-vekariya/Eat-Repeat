import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Product from '../Product/Product';

function Home(props) {

    const history = useHistory()

    const MoreProduct = () => {
        history.push('/allproductpageination');
    }
    
    return (
        <>
            <section className='relative homeslider flex items-center'>
                <div className='container'>
                    <div className='flex justify-center text-white'>
                        <div className='text-center'>
                            <h3 className='text-4xl Inspiration yellow-main'>We Make Pizza Like a Pro</h3>
                            <h1 className='text-7xl mb-9'>Real Italian Pizza in San Diego!</h1>
                            <Link to='/cart' className='slider-button'>ORDER ONLINE NOW</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-12'>
                <div className='container'>
                    <h2 className='text-4xl font-medium text-red-600 my-12'>Our Menu</h2>
                    <div className='grid grid-cols-4'>
                        <Product/>
                    </div>
                    <div className='text-center py-4'>
                        <button onClick={()=>{MoreProduct()}} className='text-xs font-semibold text-slate-500'>Show More Product?</button>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Home;
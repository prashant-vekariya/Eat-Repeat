import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import Notistackalert from '../NotistackAlert/Notistackalert';
import { useSelector, useDispatch } from 'react-redux';
import { logoutaction } from '../../Redux/Action/auth.action';

function Header(props) {

    const user = useSelector(state => state.auth)
    // console.log(user)   
    const dispatch = useDispatch();

    const handlelogout = () => {
        // console.log("jijisjdi")
        dispatch(logoutaction())
    }


    return (
        <header className='absolute z-10 w-full'>
            <nav className='container'>
                <div className='flex items-center'>
                    <div className='w-2/5'>
                        <ul className='flex justify-around text-white'>
                            <li>
                                <NavLink exact to={"/"} className='nav-menu'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink exact to={"/cart"} className='nav-menu'>Cart</NavLink>
                            </li>
                            <li>
                                <NavLink exact to={"/allcategories"} className='nav-menu'>Categories</NavLink>
                            </li>
                            <li>
                                <NavLink exact to={"/allproductpageination"} className='nav-menu'>Our Product</NavLink>
                            </li>
                            <li>
                                <NavLink exact to={"/cart"} className='nav-menu'>Contacts</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='w-1/5 flex justify-around'>
                        <div>
                            {/* <NavLink exact to={'/'}> */}
                            <img src='Image/logo.png' alt='' style={{ height: 200 }} />
                            {/* </NavLink> */}
                        </div>
                    </div>
                    <div className='w-2/5'>
                        <ul className='flex text-white justify-around'>
                            <li className='mr-3'>
                                <NavLink exact to={"/"} className=''>
                                    <p><PhoneIcon className='yellow-main' />123-456-7890</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to={"/cart"} className=''>
                                    <ShoppingCartIcon className='yellow-main' /><span>0 Items</span> - <span>$0.00</span>
                                </NavLink>
                            </li>
                            <li>
                                {
                                    user.user === null ?
                                        <NavLink exact to={"/login"} className='header-button'>Login/SignUp</NavLink> :
                                        <NavLink exact to={"/login"} className='header-button' onClick={handlelogout}>Logout</NavLink>
                                }
                            </li>
                        </ul>
                    </div>
                    <Notistackalert/>
                </div>
            </nav>
        </header>
    );
}

export default Header;
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {
     const [user] = useAuthState(auth);
     const [admin] = useAdmin(user)

     const logOut = () => {
          signOut(auth);
          localStorage.removeItem('accessToken');
     }

     const menuItems = <>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>Portfolio</NavLink></li>
          <li><NavLink to='/blog'>Blog</NavLink></li>
          {/* <li><NavLink to='/dashboard'>Dashboard</NavLink></li> */}

          {
               user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
          }
          <li>{user ? <button onClick={logOut} className="btn btn-ghost font-bold">Sign Out</button> : <NavLink to='/login'>Login</NavLink>}</li>

     </>
     return (

          <div className="navbar bg-base-100">
               <div className="navbar-start">
                    <div className="dropdown">
                         <label tabIndex="0" className="btn btn-ghost lg:hidden">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                         </label>
                         <ul tabIndex="0" className="menu menu-compact font-bold dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                              {menuItems}
                         </ul>
                    </div>
                    <Link to='/' className="btn font-bold text-yellow-500 btn-ghost normal-case text-xl font-bold">HAND TOOLS</Link>
               </div>

               <div className="navbar-end">
                    <label tabIndex="1" htmlFor="dashboard-side" className="btn btn-ghost lg:hidden">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
               </div>
               <div className="navbar-end lg:mr-6 hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 font-bold">
                         {menuItems}
                    </ul>
               </div>
          </div>

     );
};

export default Navbar;
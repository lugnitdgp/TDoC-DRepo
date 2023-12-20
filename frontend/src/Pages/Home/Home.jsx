import React from 'react'
import Navbar from '../../Components/NavBar/Navbar';
import "./Home.scss";

const Home = () => {

  
  return (
  <div>
    <Navbar />
    <div className="home-content">
      <div className="left-content">
        <h1 className='maintext'>Your code is in <span className="subtext">Blockchain</span></h1>
        <p className="description">Start your journey towards the <br />Decentralized World</p>
        <div className="btn-container">
          <input type="text" placeholder="Profile Name is mandatory!!" className="input-field"/>
        </div>
        <button className="btn">Register</button>
        <div className="signin-text">Already Have an Account,  
         <a href='#' className='sign-in'>Sign In</a>
        </div>
      </div>
      <div className="right-content">
        <img className='img' src="hero.jpg" alt="hero" />
      </div>
    </div>
  </div>
  );
};


export default Home;
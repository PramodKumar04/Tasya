import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return ( 
        <div className='container-fluid' style={{ fontSize: "1.3rem" , fontWeight: "500", padding: "0 20px" }}>
            <nav 
                className="navbar fixed-top bg-white navbar-expand-lg shadow-sm"
                style={{ borderBottom: "1px solid #ddd", zIndex: 1030 }}
            >
                <div className="container p-2">
                    <Link className="navbar-brand" to="/">
                        <img src='media/tasya.png' alt='logo' style={{ width: '13%' }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/home'>Home</Link>
                            </li>
                             <li className="nav-item">
                                <Link to="/create" className="nav-link active">
          + Create Post
        </Link>
                             </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/team'>Team</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/plus'>Plus</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/support">Support</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/signup'>Login/Signup</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Add margin space below navbar for layout separation */}
            <div style={{ marginBottom: "20px" , }}></div>
        </div>
    );
}

export default NavBar;

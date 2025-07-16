import React from 'react';

export default function Filter() {
  return (
    <div
      className="filter-container"
      style={{
        margin: 0,
        padding: 0,
        position: 'absolute',
    
        left: 0,
      }}
    >
      <p style={{ margin: '0.5rem' }}>Filter</p>
      <form>
        <div className="dropdown" style={{ marginLeft: '0.5rem' }}>
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Category
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><a className="dropdown-item active" href="#">Blogs</a></li>
            <li><a className="dropdown-item" href="#">Vlogs</a></li>
            <li><a className="dropdown-item" href="#">Reviews</a></li>
            <li><a className="dropdown-item" href="#">Newsletter</a></li>
          </ul>
        </div>
      </form>
    </div>
  );
}

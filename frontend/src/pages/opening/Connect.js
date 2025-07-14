import React from "react";

function Connect() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 mt-5 p-5 mb-5">
            <img src="media/connect.png" alt="Connect" className="img-fluid" style={{borderRadius:"20px"}}/>
        </div>
        <div className="col-6 mt-5 p-5 mb-5">
          <h1>Create. Connect. Grow.</h1>
          <hr style={{height: '3px',backgroundColor: '#6f42c1',border: 'none',borderRadius: '2px',margin: '2rem 0'}}/>
          <p className="mt-2"  style={{fontSize:"18px"}}>
            At Creative Hub, you’re not just sharing content — you’re making
            connections. Meet people from around the world who share your
            passions, start meaningful conversations, and turn followers into
            friends. Whether it’s through a vlog, a newsletter, or a creative
            idea, every post is a chance to connect, inspire, and build lasting
            relationships across borders.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Connect;

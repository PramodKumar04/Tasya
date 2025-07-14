import React from 'react';

function Team() {
    return ( 
        <div className="container p-4 mb-5">
            <div className='row  mb-5'>
                <h1 className='mb-4' style={{textAlign:'center',color:'#424242'}}>People</h1>
                <div className='col-6 mt-5' style={{textAlign:'center'}}>
                    <img src="media/pramodprofile.jpg" alt="Profile" className='img-fluid' style={{borderRadius:'50%',width:'250px',height:'250px'}}/>
                    <br/>
                    <h3 className='mt-3' style={{color:'#424242'}}>Pramod Kumar Potturu</h3>
                    <p style={{fontSize:"20px"}}>Tech Developer</p>
                    <p style={{textAlign:"center"}}><a href="https://www.linkedin.com/in/pramod-kumar-potturu-963b19241/" target="_blank" rel="noopener noreferrer" style={{color: "black", fontSize: "22px",padding:"10px " }}><i class="fa-brands fa-linkedin-in"></i></a>   <a href="https://x.com/thepramod04" target="_blank" rel="noopener noreferrer" style={{color: "black", fontSize: "22px" }}><i class="fa-brands fa-x-twitter"></i></a></p>
                </div>
                <div className='col-6 mt-5' style={{textAlign:'center'}}>
                    <img src="media/keerthanaprofile.png" alt="Profile" className='img-fluid' style={{borderRadius:'50%',width:'250px',height:'250px'}}/>
                    <br/>
                    <h3 className='mt-3' style={{color:'#424242'}}>Srikeerthana Bhukya</h3>
                    <p style={{fontSize:"20px"}}>Tech Developer</p>
                    <p style={{textAlign:"center"}}><a href="https://www.linkedin.com/in/srikeerthana-bhukya-ba7b87332/" target="_blank" rel="noopener noreferrer" style={{color: "black", fontSize: "22px",padding:"10px " }}><i class="fa-brands fa-linkedin-in"></i></a>   <a href="https://www.instagram.com/_keerthana_907" target="_blank" rel="noopener noreferrer" style={{color: "black", fontSize: "22px" }}><i class="fa-brands fa-instagram"></i></a></p>
                </div>
            </div>
        </div>
     );
}

export default Team;
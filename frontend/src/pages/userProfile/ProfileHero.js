
import Posting from '../home/Posting.js';
import AddButton from '../home/AddButton.js';
import ProfilePage from './ProfilePage.js';

export default function HomePage() {
    return (
        <div>
           
            
            <div className="container mt-4">
                
                <div className="row">
                    <div className=" col col-lg-12 col-md-10 col-sm-8 mt-4">
                        <ProfilePage/>

                    </div>


                    <div className="col-lg-11 col-md-8 col-sm-7 offset-lg-1.5 offset-md-1 offset-sm-0">
                        <Posting />
                    </div>
                    <div className="col-lg-1 col-md-3 col-sm-3">
                        <AddButton/>
                    </div>
                
                </div>
                <br/><br/>
            </div>
        </div>
    );
}


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


                    <div className="col-12 px-md-5">
                        <Posting />
                    </div>
                </div>
                <AddButton/>
                <br/><br/>
            </div>
        </div>
    );
}

import SearchBar from './SearchBar.js';
import NavBar from '../NavBar.js';
import Hero from './HomeHero.js';
import Posting from './Posting.js';
import AddButton from './AddButton.js';

export default function HomePage() {
    return (
        <div>
            <NavBar />
            <Hero />
            
            <div className="container mt-4">
                <div className="row mb-3">
                    <div className="col-12">
                        <SearchBar />
                    </div>
                </div>

                <div className="row">


                    <div className="col-lg-11 col-md-9 col-sm-7 offset-lg-2 offset-md-1 offset-sm-0">
                        <Posting />
                    </div>
                    <div className="col-lg-1 col-md-2 col-sm-3">
                        <AddButton/>
                    </div>
                
                </div>
                <br/><br/>
            </div>
        </div>
    );
}

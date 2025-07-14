import SearchBar from './SearchBar.js';
import NavBar from '../NavBar.js';
import Hero from './HomeHero.js';
import Posting from './Posting.js';

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
                    <div className="col-12 offset-1">
                        <Posting />
                    </div>
                
                </div>
                <br/><br/>
            </div>
        </div>
    );
}

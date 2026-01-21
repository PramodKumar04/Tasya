import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "./SearchBar.js";
import NavBar from "../NavBar.js";
import Hero from "./HomeHero.js";
import Posting from "./Posting.js";
import AddButton from "./AddButton.js";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
  try {
    setLoading(true);

    if (!query) {
      // EMPTY QUERY → SHOW ALL POSTS
      await fetchAllPosts();
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/posts/search?q=${query}`
    );
    setPosts(res.data);
  } catch (error) {
    console.error("Search failed:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <NavBar />
      <Hero />

      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-12">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {loading && <p className="text-center">Searching...</p>}

        <div className="row">
          <div className="col-lg-11 col-md-8 col-sm-7 offset-lg-3 offset-md-1 offset-sm-0">
            <Posting posts={posts} />
          </div>
          <div className="col-lg-1 col-md-3 col-sm-3">
            <AddButton />
          </div>
        </div>

        <br /><br />
      </div>
    </div>
  );
}

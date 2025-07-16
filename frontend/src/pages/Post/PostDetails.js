import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/post/${id}`) 
      .then((res) => {
        console.log("Fetched post:", res.data);
        setPost(res.data);
      })
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const { title, content, image, author } = post;

  return (
    <div className="" style={{ padding: "2rem" ,marginTop: "8rem",marginBottom: "8rem"}}>
      <h1 style={{marginRight:"9rem",marginBottom:"4rem"}}><b>{title}</b></h1>
      <img src={image.url} alt={title} style={{ width: "40rem", height: "20rem" ,display:"flex", justifyContent: "center", margin: "0 auto" }}  />
      <p style={{ marginTop: "1rem", fontSize: "1.2rem",textAlign:'center' }}>{content}</p>
    
    </div>
  );
}

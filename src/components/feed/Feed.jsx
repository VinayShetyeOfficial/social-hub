import { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
// import { Posts } from "../../data/mockData";
import axios from "axios";
import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("/posts/timeline/6781a977d915bc001cfba98e");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;

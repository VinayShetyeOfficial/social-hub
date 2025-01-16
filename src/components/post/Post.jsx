import { useState, useEffect } from "react";
import {
  personImages,
  postImages,
  miscAssets,
} from "../../assets/assetExports.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import "./post.css";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    setLike((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        {/* Post Header */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={user.profilePicture || personImages.noAvatar}
                alt="Profile"
                className="postProfileImg"
              />
            </Link>
            <div>
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        {/* Post Content */}
        <div className="postCenter">
          {post.desc && <span className="postText">{post.desc}</span>}
          {post.img && postImages[post.img] && (
            <img
              src={postImages[post.img]}
              alt="Post Content"
              className="postImg"
            />
          )}
        </div>

        {/* Post Footer */}
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className={`likeIcon ${isLiked ? "liked" : ""}`}
              src={miscAssets.like}
              onClick={likeHandler}
              alt="Like"
              title={isLiked ? "Unlike" : "Like"}
            />
            <img
              className={`likeIcon ${isLiked ? "liked" : ""}`}
              src={miscAssets.heart}
              onClick={likeHandler}
              alt="Heart"
              title={isLiked ? "Unlike" : "Like"}
            />
            <span className="postLikeCounter">{`${like} people like it`}</span>
          </div>
          <div className="postBottomRight">
            <CommentIcon className="commentIcon" />
            <span className="postCommentText">
              {`${post.comment || 0} ${
                post.comment === 1 ? "comment" : "comments"
              }`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

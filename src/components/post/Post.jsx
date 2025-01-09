import { miscAssets } from "../../assets/assetExports.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { Users } from "../../data/mockData.js";
import { useState } from "react";
import "./post.css";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    if (isLiked) {
      setLike((prev) => prev - 1);
    } else {
      setLike((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        {/* Post Header */}
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={
                Users.find((user) => user.id === post?.userId)
                  ?.profilePicture || "https://via.placeholder.com/45"
              }
              alt="Profile"
              className="postProfileImg"
            />
            <div>
              <span className="postUsername">
                {Users.find((user) => user.id === post.id)?.username || "User"}
              </span>
              <span className="postDate">{post.date}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        {/* Post Content */}
        <div className="postCenter">
          {post.desc && <span className="postText">{post.desc}</span>}
          {post.photo && (
            <img src={post.photo} alt="Post Content" className="postImg" />
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
              {`${post.comment} ${post.comment === 1 ? "comment" : "comments"}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

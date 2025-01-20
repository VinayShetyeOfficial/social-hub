import { personImages } from "../../assets/assetExports";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import CancelIcon from "@mui/icons-material/Cancel";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import "./share.css";

export default function Share({ onNewPost }) {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const MAX_FILE_SIZE_MB = 10;

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const data = new FormData();
        data.append("file", compressedFile);

        const uploadRes = await axios.post("/upload", data);
        newPost.img = uploadRes.data.fileName;
      } catch (err) {
        console.error("Error uploading file:", err);
        return;
      }
    }

    try {
      const response = await axios.post("/posts", newPost);

      if (onNewPost) {
        onNewPost(response.data);
      }

      desc.current.value = "";
      setFile(null);
      setError("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(
          `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller file.`
        );
        setFile(null);
      } else {
        setError("");
        setFile(selectedFile);
      }
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? personImages[user.profilePicture]
                : personImages.noAvatar
            }
            alt="User"
          />
          <input
            placeholder={`What's on your mind, ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img
              className="shareImg"
              src={URL.createObjectURL(file)}
              alt="Selected"
            />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        {error && <p className="errorMessage">{error}</p>}{" "}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleFileChange}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button
            className={`shareButton ${error ? "disabled" : ""}`}
            type="submit"
            disabled={!!error}
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

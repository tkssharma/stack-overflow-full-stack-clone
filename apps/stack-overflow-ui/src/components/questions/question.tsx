import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  RepeatOneOutlined,
  ShareOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user.slice";
import { useNavigate } from "react-router-dom";
import { updateAnswersVotes } from "../../features/answer.slice";

function LastSeen({ date }: any) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}
function Post({ post }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const Close = <CloseIcon />;
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const handleQuill = (value: any) => {
    setAnswer(value);
  };
  
  const handleUpVote  = (questionId: string , answerId: string) => {
    dispatch(updateAnswersVotes({questionId, answerId, vote: true}))
  }
  const handleDownVote = (questionId: string , answerId: string) => {
    dispatch(updateAnswersVotes({questionId, answerId, vote: false}))
  }

  const handleSubmit = async () => {

  };
  return (
    <div className="post">
      <div className="post__info">
        <Avatar src={post?.user_metadata?.picture} />
        <h4>{post?.user_metadata?.email}</h4>
        <h6>{post?.user_metadata?.name}</h6>
        <small>
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{post?.questions_text}</p>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="post__btnAnswer"
          >
            Answer
          </button>
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__question">
              <h1>{post?.question_text}</h1>
              <p>
                asked by <span className="name">{post?.user_metadata?.email}</span> on{" "}
                <span className="name">
                  {new Date(post?.created_at).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        {post.image !== "" && <img
          onClick={() => {
            navigate(`/questions/${post.id}`);
          }}
          src={post.image} alt="url" />}
      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        {post?.answers?.length} Answer(s)
      </p>

      <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
        {post?.answers?.map((_a: any) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >
                <Avatar src={_a?.user_metadata?.picture} />
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info"
                >
                  <p>{_a?.user_metadata?.name}</p>
                  <span>
                    {_a?.created_at}
                  </span>
                </div>
              </div>
              <div className="post-answer">{ReactHtmlParser(_a?.answer_text)}</div>
              <div className="post__footer">
                <div className="post__footerAction">
                  {_a?.upvote}
                  <ArrowUpwardOutlined onClick={() => handleUpVote(post.id, _a.id)} />
                  {_a?.downvote}
                  <ArrowDownwardOutlined onClick={() => handleDownVote(post.id, _a.id)} />
                </div>
                <RepeatOneOutlined />
                <ChatBubbleOutlined />
                <div className="post__footerLeft">
                  <ShareOutlined />
                  <MoreHorizOutlined />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Post;

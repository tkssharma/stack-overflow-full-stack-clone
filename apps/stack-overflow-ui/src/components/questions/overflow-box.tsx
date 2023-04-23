import { Avatar, Input } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/OverflowBox.css";
import { selectUser } from "../../features/user.slice";
import { PeopleAltOutlined, ExpandMore } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "react-responsive-modal";
import { createQuestion } from "../../features/question.slice";

function QuoraBox() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const Close = <CloseIcon />;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setQuestion(e.target.value);
  }

  const handleSubmit = () => {
    alert(question);
    dispatch(createQuestion({
      "questions_text": question,
      "tags": "lambda, aws, java, nestjs, auth0",
      "url": "https://stackoverflow.com/questions/50493011/react-ui-router-test-state-change",
      "image": "https://cdn-media-1.freecodecamp.org/images/1*TKvlTeNqtkp1s-eVB5Hrvg@2x.png",
      "technology": "javascript"
    }));
  };

  return (
    <div className="overflowBox">
      <div onClick={() => setIsModalOpen(true)} className="overflowBox__info">
        <Avatar src={user?.photo} />
      </div>
      <div className="overflowBox__overflow">
        <h5 onClick={() => setIsModalOpen(true)}>What is your question or link?</h5>
      </div>
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
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar src={user?.photo} className="avatar" />
              <div className="modal__scope">
                <PeopleAltOutlined />
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
              <input
                style={{
                  margin: "5px 0",
                  border: "1px solid lightgray",
                  padding: "10px",
                  outline: "2px solid #000",
                }}
                value={question}
                onChange={handleChange}
                type=" text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: inclue a link that gives context"
                />
                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Question
              </button>
            </div>
          </Modal>
    </div>
  );
}

export default QuoraBox;

import { Add } from "@material-ui/icons";
import React from "react";
import "./css/SidebarOptions.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, questionsSelector } from "../../features/question.slice";

function SidebarOptions() {
  const questions = useSelector(questionsSelector);
  const dispatch = useDispatch();
  // ["nodejs, react", "nodejs, web"]
  const appTags: string[] = [];
  const tags = questions.map((i: any) => i.tags)
    .forEach((i: string) => {
      const questionTags = i.split(',');
      for (const tag of questionTags) {
        if (!appTags.includes(tag)) {
          appTags.push(tag);
        }
      }
    })
  const handleClick = (tags: string) => {
    dispatch(fetchQuestions(tags))
  }

  return (
    <div className="sidebarOptions">
      {appTags && appTags.length > 0 &&
        (
          appTags.map(i => {
            return (
              <div onClick={() => handleClick(i)} className="sidebarOption">
                <img
                  src="https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg"
                  alt=""
                />
                <p>{i}</p>
              </div>
            )
          })
        )}
      <div className="sidebarOption">
        <Add />
        <p className="text">Discover Spaces</p>
      </div>
    </div>
  );
}

export default SidebarOptions;

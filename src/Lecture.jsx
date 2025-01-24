import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import loadingSvg from "./assets/loading.svg";

const LecturePage = () => {
  const { lectureId } = useParams();
  const [loading, setLoading] = useState(true);
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://server-cogni.glitch.me/lectureFetch?lectureId=${
          lectureId.split("=")[1]
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setLecture(data);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (lecture == null) return;
    const lectureLoaded = lecture;
    document.querySelector(
      ".estimatedReadingTime"
    ).innerHTML = `${lectureLoaded.estimatedReadingTime} minuta čitanja`;
    document.querySelector(
      ".lectureTitleMain"
    ).innerHTML = `${lectureLoaded.title}`;

    let textModify = lectureLoaded.text;
    let updatedStr = textModify
      .replace(/#h1(.*?)h1#/g, "<h1>$1</h1>")
      .replace(/#h3(.*?)h3#/g, '<span class="mark1">$1</span>')
      .replace(/#h4(.*?)h4#/g, '<span class="mark2">$1</span>')
      .replace(/#p(.*?)p#/g, "<p>$1</p>")
      .replace(/#br#/g, "<br/><br/>");
    console.log(textModify);
    document.querySelector(".textWrapperLecture").innerHTML = `${updatedStr}`;

    setTimeout(() => {
      document.querySelector(".lectureWholeTab").style.display = "block";
      setTimeout(() => {
        document.querySelector(".lectureWholeTab").style.opacity = "1";
      }, 10);
    }, 10);
  }, [lecture]);

  return (
    <div className="wrapper">
      {loading && <img className="loading" src={loadingSvg} />}
      {!loading && (
        <div className="lectureWholeTab">
          <div className="topWrapper">
            <p className="estimatedReadingTime"></p>
          </div>
          <h1 className="lectureTitleMain"></h1>
          <div className="textWrapperLecture"></div>
          <div className="fader"></div>
        </div>
      )}
    </div>
  );
};

export default LecturePage;

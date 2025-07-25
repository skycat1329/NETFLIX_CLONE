import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
const [apiData, setApiData] =useState([]);

  const cardsRef = useRef(); // ✅ Declared useRef
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmQ0Yjk1ZGUzYmZhODY5MDdmZmFkOGUxZmE5OGM4OCIsIm5iZiI6MTcyMDAxNTIxNi4xMjgsInN1YiI6IjY2ODU1OTcwYzA4MzJkMDQ2MTMzMjlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vzy4Cevcwb0qRMBDzIsJd4G3wDjnCUUoc4fBrLxZTtw",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const ref = cardsRef.current;
    ref.addEventListener("wheel", handleWheel);

    // Cleanup to avoid memory leaks
    return () => ref.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => ( 
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
  
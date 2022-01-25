import React, { useState } from "react";

const News = () => {
  const [news, setNews] = useState([]); //News va a ser sacado de la API en un futuro

  const newsList = () => {
    return news.length ? (
      news.map((element) => (
        <li className="card-info" key={element.id}>
          <h3>{element.name}</h3>
          <p>{element.description}</p>
        </li>
      ))
    ) : (
      <p>No hay novedades</p>
    );
  };

  return (
    <>
      <h1>Novedades</h1>
      <ul className="list-container">{newsList()}</ul>
    </>
  );
};

export default News;

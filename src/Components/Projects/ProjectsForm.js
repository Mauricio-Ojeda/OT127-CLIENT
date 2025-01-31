import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://ongapi.alkemy.org/api/projects";
const config = {
  headers: {
    Group: 127,
  },
};

const ProjectsForm = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const { title, description, image, due_date } = project;

  useEffect(() => {
    getProjectByID(id);
  }, []); //eslint-disable-line

  function getProjectByID(id) {
    if (id) {
      axios.get(`${API_URL}/${id}`, config).then((res) => {
        setProject(res.data.data);
      });
    }
  }

  const handleChange = (e, property) => {
    if (e.target.name === "image") {
      const img = URL.createObjectURL(e.target.files[0]);
      setProject({ ...project, [property]: img });
    } else {
      setProject({ ...project, [property]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newDate = new Date(due_date).toISOString();
    if (id) {
      axios.put(
        `${API_URL}/${id}`,
        {
          title,
          description,
          image,
          due_date: newDate,
        },
        config
      ); //TODO: Controlar errores (Catch)
    } else {
      axios.post(
        API_URL,
        {
          title,
          description,
          image,
          due_date: newDate,
        },
        config
      ); //TODO: Controlar errores (Catch)
    }
  };

  return (
    <div className="form__container">
      <form className="form" onSubmit={handleSubmit}>
        {id ? <p className="form__title">Editar proyecto</p> : <p className="form__title">Crear nuevo proyecto</p>}
        <p className="form__subtitle">complete todos los campos</p>
        <input
          className="form__input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => handleChange(e, "title")}
          placeholder="Titulo"
          required
        ></input>
        <input
          className="form__input"
          type="text"
          name="description"
          value={description}
          onChange={(e) => handleChange(e, "description")}
          placeholder="Escribe una descripción"
          required
        ></input>
        <input
          className="form__input"
          type="date"
          name="due_date"
          value={due_date && due_date.split("T")[0]}
          onChange={(e) => handleChange(e, "due_date")}
        ></input>
        <input
          type="file"
          name="image"
          accept=".png, .jpg"
          onChange={(e) => handleChange(e, "image")}
        ></input>
        <img src={image} alt="" />
        <button className="form__button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ProjectsForm;

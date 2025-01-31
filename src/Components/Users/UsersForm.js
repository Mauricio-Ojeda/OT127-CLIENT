import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { postUser, getUserbyID, putUser } from "../../Services/userService";

const UserForm = () => {
  const { id } = useParams();
  const [initialValues, setinitialValues] = useState({
    name: "",
    email: "",
    role: "",
    profilePhoto: "",
    password: "",
  });
  const [roles, setRoles] = useState([]);

  const urlRoles = "http://ongapi.alkemy.org/api/roles";

  const getUser = async () => {
    try {
      let userData = await getUserbyID(id).then((response) => {
        let resData = response.data.data;
        return {
          name: resData.name,
          email: resData.email,
          role: resData.role_id,
          profilePhoto: resData.profile_image,
          password: resData.password,
        };
      });
      setinitialValues(userData);
    } catch (error) {
      alert(error);
    }
  };

  const getRoles = async () => {
    try {
      let rolesData = await axios
        .get(urlRoles, {
          headers: {
            Group: 127,
          },
        })
        .then((response) => {
          let resData = response.data.data;
          let arrData = [];
          resData.forEach((element) => {
            arrData.push({ id: element.id, name: element.name });
          });
          return arrData;
        });
      setRoles(rolesData);
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = (values) => {
    id ? putUser(id, values) : postUser(values);
  };

  const handleChange = (e, setFieldValue) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setFieldValue("profilePhoto", reader.result);
    };
  };

  //Effect para hacer el GET del user y roles
  useEffect(() => {
    getRoles();
    if (id) {
      getUser();
    }
  }, []); //eslint-disable-line

  return (
    <div className="form__container">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(4, "El nombre debe tener 4 letras como mínimo")
            .required("Campo obligatorio"),
          email: Yup.string()
            .email("Formato de email inválido")
            .required("Campo obligatorio"),
          role: Yup.number().required("Campo obligatorio"),
          password: Yup.string()
            .min(6, "La contraseña debe tener 6 caracteres como mínimo.")
            .matches(
              /^(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/,
              "Formato de contraseña inválida. Debe contener al menos: una letra minúscula, un número y un símbolo."
            )
            .required("Ingresá una contraseña"),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="form">
            {id ? <p className="form__title">Editar usuario</p> : <p className="form__title">Crear nuevo usuario</p>}
            <p className="form__subtitle">complete todos los campos</p>
            <div className="form__subcontainer">
              <label htmlFor="name" className="form__label">
                Nombre
              </label>
              <Field
                className="form__input"
                name="name"
                type="text"
                placeholder="Juan Perez"
              />
              <ErrorMessage
                name="name"
                render={(msg) => <div className="form__error">{msg}</div>}
              />
            </div>
            <div className="form__subcontainer">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <Field
                className="form__input"
                name="email"
                type="email"
                placeholder="juanperez@gmail.com"
              />
              <ErrorMessage
                name="email"
                render={(msg) => <div className="form__error">{msg}</div>}
              />
            </div>
            <div className="form__subcontainer">
              <label htmlFor="name" className="form__label">
                Rol
              </label>
              <Field className="form__input" name="role" as="select">
                {roles.map((item) => {
                  return (
                    <option
                      className="form__option"
                      value={item.id}
                      key={item.id}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage
                name="role"
                render={(msg) => <div className="form__error">{msg}</div>}
              />
            </div>
            <div className="form__subcontainer">
              <label htmlFor="password" className="form__label">
                Contraseña
              </label>
              <Field
                className="form__input"
                name="password"
                type="password"
                placeholder="*********"
              ></Field>
              <ErrorMessage
                name="password"
                render={(msg) => <div className="form__error">{msg}</div>}
              />
            </div>
            <div className="form__subcontainer">
              <input
                type="file"
                name="profilePhoto"
                accept=".png, .jpg"
                onChange={(e) => {
                  handleChange(e, setFieldValue);
                }}
              />
              <ErrorMessage
                name="profilePhoto"
                render={(msg) => <div className="form__error">{msg}</div>}
              />
            </div>
            <button className="form__button" type="submit">
              {id ? "Guardar" : "Crear"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "../FormStyles.css";

const UserForm = () => {
  const { id } = useParams();
  const [profilePhoto, setprofilePhoto] = useState("");
  const [initialValues, setinitialValues] = useState({
    name: "",
    email: "",
    role: "",
    profilePhoto: "",
    password: "",
  });
  const [roles, setRoles] = useState([]);

  const getUser = async () => {
    try {
      let userData = await axios
        .get("http://ongapi.alkemy.org/api/users/" + id)
        .then((response) => {
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
      //TODO
    }
  };

  const handleSubmit = (values) => {
    id
      ? axios
          .post("http://ongapi.alkemy.org/api/users", {
            name: values.name,
            email: values.email,
            role: values.role,
            profilePhoto: profilePhoto,
            password: values.password,
          })
          .catch((error) => {
            //TODO
          })
      : //Si estamos editando, método PUT
        axios
          .put("http://ongapi.alkemy.org/api/users/" + id, {
            name: values.name,
            email: values.email,
            role: values.role,
            profilePhoto: profilePhoto,
            password: values.password,
          })
          .catch((error) => {
            //TODO
          });
  };

  //Effect para hacer el GET del user
  useEffect(() => {
    if (id) {
      getUser();
    }
  }, []);

  //Effect para hacer el GET de los roles
  useEffect(() => {
    const getRoles = async () => {
      try {
        let rolesData = await axios
          .get("http://ongapi.alkemy.org/api/roles")
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
        //TODO
      }
    };
    getRoles();
  }, []);

  return (
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
      {() => (
        <Form>
          <div>
            <label htmlFor="name">Nombre</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="name">Rol</label>
            <Field name="role" as="select">
              {roles.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage name="role" />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <Field name="password" type="password"></Field>
            <ErrorMessage name="password" />
          </div>
          <div>
            <input
              type="file"
              name="profilePhoto"
              accept=".png, .jpg"
              onChange={(e) => {
                let reader = new FileReader();
                let file = e.target.files[0];
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setprofilePhoto(reader.result);
                };
              }}
            />
            <ErrorMessage name="profilePhoto" />
          </div>
          <button type="submit">Crear</button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;

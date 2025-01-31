import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
const HomeForm = () => {
  const [welcomeText, setWelcomeText] = useState("");
  const [initialValues, setInitialValues] = useState({
    welcome: "",
    slides: [
      {
        name: "",
        description: "",
        image: "",
      },
    ],
  });

  const toDataURL = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const updateSlides = (slide) => {
    // Primero tenemos que pasar la URL de la imagen a un string base64
    axios
      .get(slide.image, { responseType: "blob" })
      .then((response) => toDataURL(response.data))
      .then((encoded) => {
        slide.image = encoded;
        axios.put(`http://ongapi.alkemy.org/api/slides/${slide.id}`, slide, {
          headers: {
            Group: 127,
          },
        });
      });
  };

  const updateWelcomeText = async (values) => {
    try {
      await axios.put(
        "http://ongapi.alkemy.org/api/organization/1",
        { name: welcomeText.name, welcome_text: values.welcome },
        {
          headers: {
            Group: 127,
          },
        }
      );
    } catch (error) {
      // TO DO
    }
  };

  const compareValues = (values) => {
    //eslint-disable-next-line
    values.slides.filter((slide, i) => {
      if (slide !== initialValues.slides[i]) {
        // solo se van a hacer una peticion de update los slides modificados
        updateSlides(slide);
      }
    });

    // Comparo el mensaje que viene del formulario con el original
    if (values.welcome !== welcomeText.welcome_text) {
      // si son diferentes realizamos la peticion "PUT" con todos los datos originales excepto el mensaje modificado
      updateWelcomeText(values);
    }
  };

  const getDataToEdit = async () => {
    try {
      // Traemos la toda la informacion que podria ser editada
      const slidesResponse = await axios.get(
        "http://ongapi.alkemy.org/api/slides",
        {
            headers: {
              Group: 127,
            },
          }
      );
      const welcomeResponse = await axios.get(
        "http://ongapi.alkemy.org/api/organization",
        {
            headers: {
              Group: 127,
            },
          }
      );
      const slides = slidesResponse.data.data;
      const welcomeText = welcomeResponse.data.data;
      // Guardamos la informacion original aparte, para luego hacer una comparacion
      // con la informacion que venga del formulario y ver que se modifico
      setWelcomeText(welcomeText);

      // guardamos los valores iniciales que va a usar formik
      setInitialValues({
        welcome: welcomeText.welcome_text,
        slides: slides,
      });
    } catch (error) {
      return error
    }
  };

  useEffect(() => {
    getDataToEdit();
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        welcome: Yup.string()
          .min(20, "Debe tener por lo menos 20 caracteres.")
          .required("El campo Texto de Bienvenida es obligatorio"),
        slides: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .required("El campo Titulo es obligatorio")
              .nullable(),
            description: Yup.string()
              .required("El campo Descripción es obligatorio")
              .nullable(),
            image: Yup.string()
              .required("El campo URL de la imagen es obligatorio")
              .nullable(),
          })
        ),
      })}
      onSubmit={(values) => {
        compareValues(values);
      }}
    >
      {({ values }) => (
        <div className="form__container">
          <Form className="form">
            <p className="form__title">Editar elementos del inicio</p>
            <p className="form__subtitle">
              Modifique los campos que desee editar
            </p>
            <label htmlFor="welcome" className="form__label">
              Mensaje de Bienvenida
            </label>
            <Field
              title="welcome"
              name="welcome"
              className="form__input"
              placeholder="Bienvenido!"
            />
            <ErrorMessage
              name="welcome"
              className="form__error"
              component="p"
            />
            <p className="form__label">Slides</p>
            <FieldArray name="slides">
              {() =>
                values.slides.map((slide, i) => {
                  return (
                    <div key={i} className="form__subcontainer">
                      <hr className="form__divider" />
                      <p className="form__label">ID: {slide.id}</p>
                      <label className="form__label">Titulo</label>
                      <Field
                        name={`slides.${i}.name`}
                        className="form__input"
                        placeholder="Dia de campo"
                      />
                      <ErrorMessage
                        className="form__error"
                        name={`slides.${i}.name`}
                        component="p"
                      />
                      <label className="form__label">Descripción</label>
                      <Field
                        name={`slides.${i}.description`}
                        className="form__input"
                        placeholder="Una vez al año nos vamos de dia de campo a la plaza"
                      />
                      <ErrorMessage
                        className="form__error"
                        name={`slides.${i}.description`}
                        component="p"
                      />
                      <label className="form__label">URL de la imagen</label>
                      <Field
                        name={`slides.${i}.image`}
                        className="form__input"
                        placeholder="link de una imagen"
                      />
                      <ErrorMessage
                        className="form__error"
                        name={`slides.${i}.image`}
                        component="p"
                      />
                    </div>
                  );
                })
              }
            </FieldArray>

            <button type="submit" className="form__button">
              GUARDAR CAMBIOS
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default HomeForm;

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const sweetAlertConfirm = (title) => {
  return MySwal.fire({
    title,
    text: "Acepta los términos y condiciones?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Acepto",
    cancelButtonText: "No acepto",
  }).then((resultado) => {
    if (resultado.value) {
      return true;
    } else {
      return false;
    }
  });
};

const RegisterForm = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);

  let title = "Términos y condiciones?";

  const onSubmit = (values, e) => {
    acceptTerms
      ? alert("okis")
      : sweetAlertConfirm(title).then((res) => {
          setAcceptTerms(res);
        });
  };

  const onChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  return (
    <div className="form__container">
      <Formik
        initialValues={{
          name: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Ingresá un nombre"),
          lastName: Yup.string().required("Ingresá un apellido"),
          email: Yup.string()
            .email("Formato de email inválido")
            .required("Ingresá un email"),
          password: Yup.string()
            .min(6, "La contraseña debe tener 6 caracteres como mínimo.")
            .matches(
              /^(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/,
              "Formato de contraseña inválida. Debe contener al menos: una letra minúscula, un número y un símbolo."
            )
            .required("Ingresá una contraseña"),
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben ser iguales."
            )
            .required("Confirmá tu contraseña"),
        })}
        onSubmit={onSubmit}
      >
        <Form className="form">
          {/* Cada campo está anidado en un div para poder darle estilos más facilmente */}
          {/*Los componentes ErrorMessage tienen un atributo render, eso va a servir para cuando agreguemos los estilos, solo hay que agregar la clase*/}
          <div className="form__subcontainer">
            <label htmlFor="name" className="form__label">
              Nombre
            </label>
            <Field name="name" type="text" className="form__input" />
            <ErrorMessage
              name="name"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
          </div>
          <div className="form__subcontainer">
            <label htmlFor="lastName" className="form__label">
              Apellido
            </label>
            <Field name="lastName" type="text" className="form__input" />
            <ErrorMessage
              name="lastName"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
          </div>
          <div className="form__subcontainer">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <Field name="email" type="email" className="form__input" />
            <ErrorMessage
              name="email"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
          </div>
          <div className="form__subcontainer">
            <label htmlFor="password" className="form__label">
              Contraseña
            </label>
            <Field name="password" type="password" className="form__input" />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
          </div>
          <div className="form__subcontainer">
            <label htmlFor="confirmPassword" className="form__label">
              Confirmar contraseña
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className="form__input"
            />
            <ErrorMessage
              name="confirmPassword"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
          </div>
          <div className="form__subcontainer">
            <div>
              <Field
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={onChange}
              />
              <label htmlFor="acceptTerms" className="form__label">
                Accept Terms & Conditions
              </label>
            </div>
            <ErrorMessage
              name="acceptTerms"
              render={(msg) => <div className="form__error">{msg}</div>}
            />
          </div>

          <button type="submit" className="form__button">
            Registrar
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;

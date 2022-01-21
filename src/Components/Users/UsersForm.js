import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../FormStyles.css";

const UserForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", role: "", profilePhoto: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(4, "El nombre debe tener 4 letras como mínimo")
          .required("Campo obligatorio"),
        email: Yup.string()
          .email("Formato de email inválido")
          .required("Campo obligatorio"),
        role: Yup.string().required("Campo obligatorio"),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formProps) => (
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
              <option value="administrador">Administrador</option>
              <option value="regular">Regular</option>
            </Field>
            <ErrorMessage name="role" />
          </div>
          <div>
            <input
              name="profilePhoto"
              type="file"
              onChange={(event) => {
                formProps.setFieldValue(
                  "profilePhoto",
                  event.currentTarget.files[0]
                );
              }}
            />
          </div>
          <button type="submit">Crear</button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;

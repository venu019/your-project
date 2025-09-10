import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Row, Col } from "react-bootstrap";

const StudentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  course: Yup.string().required("Course is required"),
  dateOfJoining: Yup.date().required("Date of Joining is required"),
});

export default function AddStudentForm({ initialValues, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={initialValues || {
        name: "",
        email: "",
        course: "",
        dateOfJoining: "",
      }}
      validationSchema={StudentSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <BootstrapForm as={Form}>
          <BootstrapForm.Group as={Row} className="mb-3" controlId="name">
            <BootstrapForm.Label column sm={2}>Name:</BootstrapForm.Label>
            <Col sm={10}>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </Col>
          </BootstrapForm.Group>

          <BootstrapForm.Group as={Row} className="mb-3" controlId="email">
            <BootstrapForm.Label column sm={2}>Email:</BootstrapForm.Label>
            <Col sm={10}>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </Col>
          </BootstrapForm.Group>

          <BootstrapForm.Group as={Row} className="mb-3" controlId="course">
            <BootstrapForm.Label column sm={2}>Course:</BootstrapForm.Label>
            <Col sm={10}>
              <Field name="course" type="text" className="form-control" />
              <ErrorMessage name="course" component="div" className="text-danger" />
            </Col>
          </BootstrapForm.Group>

          <BootstrapForm.Group as={Row} className="mb-3" controlId="dateOfJoining">
            <BootstrapForm.Label column sm={2}>Date of Joining:</BootstrapForm.Label>
            <Col sm={10}>
              <Field name="dateOfJoining" type="date" className="form-control" />
              <ErrorMessage name="dateOfJoining" component="div" className="text-danger" />
            </Col>
          </BootstrapForm.Group>

          <Button type="submit" disabled={isSubmitting} className="me-2">Submit</Button>
          {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
        </BootstrapForm>
      )}
    </Formik>
  );
}

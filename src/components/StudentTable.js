import React, { useEffect, useState, useRef } from "react";
import api from "./axios";
import AddStudentForm from "./StudentForm";
import { Table, Button, Container, Card, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function StudentTable({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const printRef = useRef();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    api.get("/students")
      .then((res) => setStudents(res.data))
      .catch(console.error);
  };

  const handleDelete = (id) => {
    api.delete(`/students/${id}`)
      .then(() => {
        fetchStudents();
        setShowDeleteModal(false);
        setStudentToDelete(null);
      })
      .catch(console.error);
  };

  const handleAdd = (student) => {
    api.post("/students", student)
      .then(fetchStudents)
      .catch(console.error);
  };

  const handleUpdate = (student) => {
    api.put(`/students/${student.id}`, student)
      .then(() => {
        setEditingStudent(null);
        fetchStudents();
      })
      .catch(console.error);
  };

  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };


  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Student List", 14, 16);

    const tableColumn = ["#", "Name", "Email", "Course", "Date Of Joining"];
    const tableRows = [];

    students.forEach((stu, index) => {
      const studentData = [
        index + 1,
        stu.name,
        stu.email,
        stu.course,
        new Date(stu.dateOfJoining).toLocaleDateString(),
      ];
      tableRows.push(studentData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("student_list.pdf");
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student Management</h2>
        <Button variant="outline-secondary" onClick={onLogout}>
          Logout
        </Button>
      </div>

      <Card className="mb-4 shadow-sm p-4">
        {!editingStudent ? (
          <>
            <Card.Title>Add Student</Card.Title>
            <AddStudentForm onSubmit={handleAdd} />
          </>
        ) : (
          <>
            <Card.Title>Edit Student</Card.Title>
            <AddStudentForm
              initialValues={editingStudent}
              onSubmit={handleUpdate}
              onCancel={() => setEditingStudent(null)}
            />
          </>
        )}
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <Card.Title>List of Students</Card.Title>
            <div>
              <Button variant="success" onClick={exportPDF}>
                Export PDF
              </Button>
            </div>
          </div>

          {/* Printable content hidden but accessible for react-to-print */}
          <div ref={printRef} style={{ display: "none" }}>
            <h3>Student List</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Date Of Joining</th>
                </tr>
              </thead>
              <tbody>
                {students.map((stu, index) => (
                  <tr key={stu.id}>
                    <td>{index + 1}</td>
                    <td>{stu.name}</td>
                    <td>{stu.email}</td>
                    <td>{stu.course}</td>
                    <td>{new Date(stu.dateOfJoining).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Date Of Joining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((stu, index) => (
                  <tr key={stu.id}>
                    <td>{index + 1}</td>
                    <td>{stu.name}</td>
                    <td>{stu.email}</td>
                    <td>{stu.course}</td>
                    <td>{new Date(stu.dateOfJoining).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => setEditingStudent(stu)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(stu)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Confirmation Modal for Delete */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{studentToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (studentToDelete) handleDelete(studentToDelete.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

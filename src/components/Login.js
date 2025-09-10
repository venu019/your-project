import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      onLogin(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Card className="shadow p-4">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Login</Card.Title>
          <Form onSubmit={submitLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;

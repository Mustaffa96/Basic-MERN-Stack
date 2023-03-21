import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAppDispatch } from "../hooks/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { useAppSelector } from "../hooks/hooks";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { redirect } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userRegister = useAppSelector((state: any) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect || "/");
    }
  }, [userInfo, navigate]);

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    } else {
      dispatch(register(name, email, contact, dob, image, password) as any);
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="contact" className="mt-2">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="contact"
            placeholder="Enter contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dob" className="mt-2">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="dob"
            placeholder="Enter dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="image" className="mt-2">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Import Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Form.Control
            id="image-file"
            type="file"
            onChange={uploadFileHandler}
          ></Form.Control>
          {uploading && <Loader />}
        </Form.Group>
        <Form.Group controlId="password" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mt-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

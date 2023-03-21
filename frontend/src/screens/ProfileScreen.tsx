import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useAppDispatch } from "../hooks/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useAppSelector } from "../hooks/hooks";
import { LinkContainer } from "react-router-bootstrap";
import { Image, ListGroup, Card } from "react-bootstrap";
import axios from "axios";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userDetails = useAppSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useAppSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useAppSelector(
    (state: any) => state.userUpdateProfile
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name || !user || success) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET,
          payload: undefined,
        });
        dispatch(getUserDetails("profile") as any);
      } else {
        setName(user.name);
        setEmail(user.email);
        setContact(user.contact);
        setDob(user.dob);
        setImage(user.image);
      }
    }
  }, [dispatch, userInfo, navigate, user, success]);

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
      dispatch(
        updateUserProfile({
          name,
          email,
          password,
          contact,
          image,
          dob,
          _id: user._id,
          token: "",
        }) as any
      );
    }
  };

  return (
    <>
      <Row>
        <h2>{user.name}</h2>
        <Col md={3}>
          <h2>User Photo</h2>
          {loading && <Loader />}
          <Image src={user.image} alt={user.name} fluid roundedCircle />
        </Col>
        <Col md={9}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile updated</Message>}
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

            <Form.Group className="mt-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                id="image-file"
                type="file"
                onChange={uploadFileHandler}
                className="mt-2"
              />
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
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;

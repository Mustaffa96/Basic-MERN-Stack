import { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstant';


const UserEditScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { id: userId } = useParams();

  const dispatch = useAppDispatch();

  const userDetails = useAppSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useAppSelector((state: any) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
          type: USER_UPDATE_RESET,
          payload: undefined
      });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId!) as any);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId!, name, email, contact, dob, image, isAdmin }) as any);
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email' className='mt-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
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

            <Form.Group controlId='isAdmin' className='mt-2'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='mt-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
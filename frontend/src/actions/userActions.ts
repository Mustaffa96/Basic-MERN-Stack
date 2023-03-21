import axios from "axios"
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants/userConstant"
import { AppDispatch, } from '../store'
import { User } from '../types/types'

export const login = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST,
                payload: undefined
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                '/api/users/login',
                { email, password },
                config
            );

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error: any) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT,
            payload: undefined
        })
        dispatch({
            type: USER_LIST_RESET,
            payload: undefined
        });

    };
};

export const register =
    (name: string, email: string, contact: string, dob: string, password: string, image: string) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch({
                    type: USER_REGISTER_REQUEST,
                    payload: undefined
                });

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const { data } = await axios.post(
                    '/api/users',
                    { name, email, contact, dob, password, image },
                    config
                );

                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    payload: data,
                });

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: data,
                });

                localStorage.setItem('userInfo', JSON.stringify(data));
            } catch (error: any) {
                dispatch({
                    type: USER_REGISTER_FAIL,
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                });
            }
        };


export const getUserDetails = (id: string) => {
    return async (dispatch: AppDispatch, getState: Function) => {
        try {
            dispatch({
                type: USER_DETAILS_REQUEST,
                payload: undefined
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`/api/users/${id}`, config);

            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};



export const updateUserProfile = (user: User) => {
    return async (dispatch: AppDispatch, getState: Function) => {
        try {
            dispatch({
                type: USER_UPDATE_PROFILE_REQUEST,
                payload: undefined
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(`/api/users/profile`, user, config);

            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
               payload: data,
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error: any) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const listUsers =
    (pageNumber='') => async (dispatch: AppDispatch, getState: Function) => {
        try {
            dispatch({
                type: USER_LIST_REQUEST,
                payload: undefined
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get('/api/users', config);

            dispatch({
                type: USER_LIST_SUCCESS,
                payload: data,
            });
        } catch (error: any) {
            dispatch({
                type: USER_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };


export const deleteUser = (id: string) => {
    return async (dispatch: AppDispatch, getState: Function) => {
        try {
            dispatch({
                type: USER_DELETE_REQUEST,
                payload: undefined
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.delete(`/api/users/${id}`, config);

            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: undefined
            });
        } catch (error: any) {
            dispatch({
                type: USER_DELETE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};


export const updateUser = (user: User) => {
    return async (dispatch: AppDispatch, getState: Function) => {
      try {
        dispatch({
            type: USER_UPDATE_REQUEST,
            payload: undefined
        });
  
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        const { data } = await axios.put(`/api/users/${user._id}`, user, config);
  
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: undefined
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
      } catch (error: any) {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  };
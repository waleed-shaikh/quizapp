import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary p-2 ">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1 className="text-xl">WALEED QUIZ - LOGIN <i className="ri-login-circle-line"></i></h1>
            
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email" label="Email">
              <input type="text" placeholder="demo@gmail.com" required/>
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" placeholder="demo@123" required/>
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login
              </button>
              <Link to="/register" className="underline text-center">
                Not a member? Register
              </Link>
              <div>
                <h1 className="text-sm">For admin login</h1>
                <div className="divider"></div>
                <h1 className="text-xs m-2">admin@gmail.com</h1>
                <h1 className="text-xs m-2">1234</h1>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

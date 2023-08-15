import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sign() {
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleUser(e) {
    const userCopy = { ...users };
    userCopy[e.target.id] = e.target.value;
    setUsers(userCopy);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://url-shortner-xohw.onrender.com/createuser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ ...users }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "User Already existing") {
          Swal.fire({
            icon: "error",
            text: result,
          });
        } else {
          Swal.fire({
            icon: "success",
            text: result,
          });
          navigate("/login");
        }
      });
  };

  return (
    <div>
      <div className="row bg-dark">
        <h5 className="text-center" style={{ color: "white" }}>
          Welcome to Registration!!
        </h5>
      </div>
      <div className="container mt">
        <div className="container-fluid">
          <div className="row card border-dark justify-content-center">
            <div className="card-header bg-success">
              <p className="text-center">
                <strong>Registration Form</strong>
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Name</label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your Name"
                    onChange={handleUser}
                    value={users["username"]}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Mail"
                    onChange={handleUser}
                    value={users["email"]}
                  />
                </div>
                <div>
                  <label htmlFor="Password">Password</label>
                  <br />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleUser}
                    value={users["password"]}
                  />
                </div>
                <div className="row">
                  <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-primary mt-3">
                      SignUp
                    </button>
                  </div>
                  <div className="col-6">
                    <p className="text-end">
                      Already registered{" "}
                      <Link to="/login" style={{ color: "red" }}>
                        sign in?
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Login() {
    const [users, setUsers] = useState({
        email: "",
        password: "",
      });
      const navigate = useNavigate()
    
      function handleUser(e) {
        const userCopy = { ...users };
        userCopy[e.target.id] = e.target.value;
        setUsers(userCopy);
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://url-shortner-xohw.onrender.com/login", {
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
            if (result.message === "Success") {
                window.localStorage.setItem("token",result.data)
              Swal.fire({
                icon: "success",
                text: "Login Successfully!!"
              });
              navigate('/welcome')
            } else {
              Swal.fire({
                icon: "error",
                text: result,
              });
            }
          });
      };
    
      return (
        <div>
          <div className="container mt">
            <div className="container-fluid">
              <div className="row card border-dark justify-content-center">
                <div className="card-header bg-primary">
                  <p className="text-center">
                    <strong>Login</strong>
                  </p>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
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
                          Login
                        </button>
                      </div>
                      <div className="col-6">
                        <Link to='/email' style={{color: "red"}}>
                        <p className="text-end">
                          Forgot Password
                        </p>
                        </Link>  
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

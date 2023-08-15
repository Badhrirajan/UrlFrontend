import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Reset() {
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const {id,token} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://url-shortner-xohw.onrender.com/reset-password/${id}/${token}`, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({password}),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.message === 'Error') {
              Swal.fire({
                icon: "error",
                text: "Password not updated!!"
              });
            } else {
              Swal.fire({
                icon: "success",
                text: "Password Updated Successfully!!",
              });
              navigate('/login')
            }
          });
      };
    
      return (
        <div>
          <div className="container mt">
            <div className="container-fluid">
              <div className="row card border-dark justify-content-center">
                <div className="card-header bg-light">
                  <p className="text-center">
                    <strong>Update Password</strong>
                  </p>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="Password">Password</label>
                      <br />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-success mt-3">
                            Update password
                        </button>
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

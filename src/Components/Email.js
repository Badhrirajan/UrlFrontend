import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Email() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    
      const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://url-shortner-xohw.onrender.com/forgot-password", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({email}),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result === "Email sent successfully!!") {
              Swal.fire({
                icon: "success",
                text: result,
              });
              navigate('/')
            } else{
                Swal.fire({
                    icon: "error",
                    text: result.message,
                })
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
                    <strong>Forgot Password</strong>
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-success mt-3">
                          Send Link
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

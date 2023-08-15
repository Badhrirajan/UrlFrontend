import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Page() {
  const [name, setName] = useState();
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://url-shortner-xohw.onrender.com/userdata", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setName(result.data.username);
      });
  }, []);

  function handleLogout() {
    window.localStorage.clear();
    navigate("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://url-shortner-xohw.onrender.com/shortUrls", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        url: link,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShort(data.data);
        Swal.fire({
          icon: "success",
          text: data.status,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav class="navbar sticky-top bg-body-tertiary">
        <div class="container-fluid">
          <h6>Welcome user: {name}</h6>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="container">
        <div className="container-fluid">
          <div className="row card mt-5">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="longurl">URL Shortner</label>
                  <br />
                  <input
                    type="url"
                    id="longurl"
                    name="longurl"
                    placeholder="Enter Your long URL Here"
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <button class="btn btn-dark btn-lg mt-2" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <table className="table table-dark table-hover table-bordered border-primary mt-3">
              <thead>
                <tr>
                  <th scope="col">ShortUrl</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href={link} target="_blank" rel="noreferrer">
                      {short}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

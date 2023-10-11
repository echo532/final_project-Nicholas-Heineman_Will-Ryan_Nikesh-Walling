import "./css/theming.css";
import rbeLogo from "./Resources/RhoBetaEpsilon_Logo_noBackground.png";
import "./css/sidebar.css";
import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Table,
} from "react-bootstrap";

import TableData from "./tableData";

class hourEntry {
  constructor(date, num, reasoning) {
    this.date = date;
    this.numHours = num;
    this.reason = reasoning;
  }
  setDate(date) {
    this.date = date;
  }
  setNumHours(num) {
    this.numHours = num;
  }

  setReason(reason) {
    this.reason = reason;
  }

  setID(id) {
    this.id = id;
  }
}

function UserPage() {
  const [user, setUser] = useState([]);
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState("Edit");
  //gets data from the server on load
  useEffect(() => {
    fetch("/getProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        setUser(data);
      });
  }, []);

  // const submitData = async function (event) {
  //   event.preventDefault();
  //   let newSubmission = new hourEntry(date, hours, reason);
  //   const body = JSON.stringify(newSubmission);
  //   console.log("New submission: ", body);
  //   const response = await fetch("/add", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: body,
  //   });

  //   const text = await response.text();
  //   const data = JSON.parse(text);
  //   setSubmissions(data);
  //   console.log("gonna print data:", data);
  // };

  // const deleteEntry = async (event) => {
  //   const elemID =
  //     event.currentTarget.parentElement.parentElement.dataset.internal_id;
  //   console.log("target to delete id: ", elemID);
  //   const response = await fetch("/delete", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ submissionID: elemID }),
  //   });
  //   const text = await response.text();
  //   const newData = JSON.parse(text);
  //   setSubmissions(newData);
  // };

  const controlEdit = async () => {
    console.log(editable);
    if (editable) {
      const response = await fetch("/getProfile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setUser(newData);

      setContent("Submit Edits");
    } else {
      console.log("Gonna update");

      let test = JSON.stringify(user);
      const response = await fetch("/updateProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const text = await response.text();
      const newData = JSON.parse(text);
      setUser(newData);

      setContent("Edit");
    }
    setEditable(!editable);
    console.log(editable);
  };

  const onChangeInput = (e, entryID) => {
    e.preventDefault();
    let evt = e.currentTarget;
    const name = evt.name;
    const value = evt.value;
    const rowID = evt.parentElement.parentElement.dataset.internal_id;
    const edited = user.map((item) =>
      item.user_id === entryID && name ? { ...item, [name]: value } : item
    );
    setUser(edited);
  };

  let totalHours = 0;
  return (
    <Container fluid>
      <Row>
        <Col
          sm={3}
          className=" text-white min-vh-100 p-3 primary-color"
          style={{ width: "340px" }}
        >
          <Navbar.Brand
            href="/userpage"
            className="d-flex align-items-center mb-3 mb-md-0 text-decoration-none"
          >
            <img src={rbeLogo} alt="Rho Beta Epsilon Logo" width="100px" />
            <span className="fs-4">Rho Beta Epsilon</span>
          </Navbar.Brand>
          <hr />
          <Nav
            defaultActiveKey="/userpage"
            className="flex-column mb-auto"
            variant="pills"
          >
            <Nav.Link href="/homepage" className="primary">
              Home
            </Nav.Link>
            <Nav.Link href="/userpage" className="primary">
              Profile
            </Nav.Link>
            <Nav.Link href="/eventspage" className="tertiary">
              Events
            </Nav.Link>
            {/* Add more Nav.Link items as needed */}
          </Nav>
          <hr />
          <NavDropdown
            title="Options"
            id="options-dropdown"
            className="btn-dark"
            fixed="bottom"
          >
            {/* Add NavDropdown.Item items as needed */}
            <NavDropdown.Divider />
            <NavDropdown.Item href="/signout" disabled>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Col>

        <Col
          style={{ marginLeft: "20px", marginTop: "50px", maxWidth: "500px" }}
        >

          
          
          <div>
            <Table striped hover bordered id="Name">
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Name</th>
                </tr>
              </thead>
              <tbody id="dataName">
                {user.map((entry) => {
                  return (
                    <tr key={entry.user_id} data-internal_id={entry.user_id}>
                      <td key="name">
                        <input
                          name="name"
                          required
                          value={entry.name}
                          type="text"
                          plaintext="true"
                          readOnly={editable}
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry.user_id)}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Table striped hover bordered id="pronouns">
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Pronouns</th>
                </tr>
              </thead>
              <tbody id="dataRepresentation">
                {user.map((entry) => {
                  return (
                    <tr key={entry.user_id} data-internal_id={entry.user_id}>
                      <td key="pronouns">
                        <input
                          name="pronouns"
                          required
                          value={entry.pronouns}
                          type="text"
                          plaintext="true"
                          readOnly={editable}
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry.user_id)}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Table striped hover bordered id="email">
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Email</th>
                </tr>
              </thead>
              <tbody id="dataRepresentation">
                {user.map((entry) => {
                  return (
                    <tr key={entry.user_id} data-internal_id={entry.user_id}>
                      <td key="email">
                        <input
                          name="email"
                          required
                          value={entry.email}
                          type="text"
                          plaintext="true"
                          readOnly={editable}
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry.user_id)}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Table striped hover bordered id="bio">
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Bio</th>
                </tr>
              </thead>
              <tbody id="dataRepresentation">
                {user.map((entry) => {
                  return (
                    <tr key={entry.user_id} data-internal_id={entry.user_id}>
                      <td key="bio">
                        <input
                          name="bio"
                          required
                          value={entry.bio}
                          type="text"
                          plaintext="true"
                          readOnly={editable}
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry.user_id)}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Table striped hover bordered id="iqp_term">
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>IQP Term</th>
                </tr>
              </thead>
              <tbody id="dataRepresentation">
                {user.map((entry) => {
                  return (
                    <tr key={entry.user_id} data-internal_id={entry.user_id}>
                      <td key="iqp_term">
                        <input
                          name="iqp_term"
                          required
                          value={entry.iqp_term}
                          type="text"
                          plaintext="true"
                          readOnly={editable}
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry.user_id)}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Button className="btn-primary" onClick={controlEdit}>
              {content}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
import React, {useState} from "react";
import styled from "styled-components";
import Page from "./Page";
import Button from "./Button";
import CardPageStyle from "./CardPageStyle";

export default function Register({ setStep }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("test@test.tt");
  const [userEmpty, setUserEmpty] = useState(false);
  const [tooShort, setTooShort] = useState(false);
  const [special, setSpecial] = useState(1);
  const [fieldPasswordEmpty, setFieldPasswordEmpty] = useState("");
  const emailPattern = /^[a-zA-Z0-9._%+-]+\@[a-zA-Z.-_0-9]+\.[a-z]{2,}$/;

  function formValidation(e) {
    e.preventDefault();
    setSpecial(0);
    email === "test@test.tt" ? setEmail("") : null;
    const specialChar = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "[",
      "{",
      "]",
      "}",
      ":",
      ";",
      "<",
      ">",
    ];
    if (username != "") {
      setUserEmpty(false);
    } else {
      setUserEmpty(true);
    }
    password == "" ? setFieldPasswordEmpty(true) : setFieldPasswordEmpty(false);
    password.length < 8 ? setTooShort(true) : setTooShort(false);

    let checkSpecial = 0;
    for (let i = 0; i < specialChar.length; i++) {
      console.log(password);
      password.includes(specialChar[i]) ? checkSpecial++ : null;
    }
    checkSpecial < 1 ? setSpecial(0) : setSpecial(1);

    if (!userEmpty && !tooShort && special && !fieldPasswordEmpty && emailPattern.test(email)) {
      const user = {
        username: username,
        password: password,
        email: email
      }
      console.log(user)
      fetch("http://localhost:7777/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
      setStep(0)

    }
  }


return (
  <>
    <Page>
      <UserBlock>
        <h1
          style={{
            marginBottom: "25px",
            fontSize: "35px",
            fontWeight: 600,
            color: "#2f86c5",
          }}
        >
          Register
        </h1>
        <CardPageStyle style={{ height: "60vh" }}>
          <form onSubmit={formValidation}>
            <h2 style={{ fontWeight: 300, color: "#2c7172" }}>Username</h2>
            <input
              style={{
                fontSize: "25px",
                border: "none",
                padding: "5px",
                marginTop: "5px",
                color: "#144c74",
              }}
              type="text"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                setUsername(value);
                console.log(`username input :${username}`);
              }}
            />
            {userEmpty ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Field can't be blank
              </p>
            ) : null}
            <h2 style={{ fontWeight: 300, color: "#2c7172" }}>Password</h2>
            <input
              style={{
                fontSize: "25px",
                border: "none",
                padding: "5px",
                marginTop: "5px",
                color: "#144c74",
              }}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {fieldPasswordEmpty && !tooShort ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Field can't be blank
              </p>
            ) : null}
            {tooShort ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Password must be minimum 8 characters
              </p>
            ) : null}
            {!tooShort && special < 1 ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Password must have at least 1 special character
              </p>
            ) : null}
            <h2 style={{ fontWeight: 300, color: "#2c7172" }}>E-mail</h2>
            <input
              style={{
                fontSize: "25px",
                border: "none",
                padding: "5px",
                marginTop: "5px",
                color: "#144c74",
                marginBottom: "20px",
              }}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!emailPattern.test(email) ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Invalid email address
              </p>
            ) : null}
            <Button type="submit" title={"Confirm"} />
          </form>
        </CardPageStyle>
      </UserBlock>
    </Page>
  </>
);
}


const UserBlock = styled.div`
display: flex;
flex-direction: column; 
align-items: center;
width: 100vw;
heith: 70vh;
background-color: #f0f8fa;
`


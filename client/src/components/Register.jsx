import React, { useState } from "react";
import Page from "./Page";
import Button from "./Button";
import CardPageStyle from "./CardPageStyle";

export default function Register({ setStep, setUser }) {
  const [logIn, setLogIn] = useState(false)
  const [noUser, setNoUser] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("test@test.tt");
  const [userEmpty, setUserEmpty] = useState(false);
  const [tooShort, setTooShort] = useState(false);
  const [special, setSpecial] = useState(1);
  const [fieldPasswordEmpty, setFieldPasswordEmpty] = useState("");
  const emailPattern = /^[a-zA-Z0-9._%+-]+\@[a-zA-Z.-_0-9]+\.[a-z]{2,}$/;

  async function getUser() {
    const res=await fetch("http://localhost:7777/api/users")
    const data=await res.json()
    const attemptedUser=data.find(user=>user.username==username && user.password==password)
    attemptedUser ? (
      setUser(attemptedUser),
      setStep(-2)
    ) : (
      setNoUser(true)
    )
  }

  function formValidation() {
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
      password.includes(specialChar[i]) ? checkSpecial++ : null;
    }
    checkSpecial < 1 ? setSpecial(0) : setSpecial(1);

    if (
      !userEmpty &&
      !tooShort &&
      special &&
      !fieldPasswordEmpty &&
      emailPattern.test(email) &&
      email != "test@test.tt"
    ) {
      const user = {
        username: username,
        password: password,
        email: email,
      };
      fetch("http://localhost:7777/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
        .then(data=>setUser({...user,_id:data._id}))
      setStep(-2);
    }
  }

  return (
    <>
      <Page>
        <br/>
        <h1
          style={{
            fontSize: "35px",
            fontWeight: 600,
            color: "#2f86c5",
          }}
        >
          {logIn?"Log in":"Register"}
        </h1>
        <Button title={logIn?"I'm new":"Log in"} action={()=>setLogIn(!logIn)}/>
        <CardPageStyle>
          <form action="#" onSubmit={logIn?getUser:formValidation}>
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
                setNoUser(false)
                const value = e.target.value;
                setUsername(value);
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
                setNoUser(false)
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
            {logIn?null:<>
            <h2 style={{ fontWeight: 300, color: "#2c7172" }}>E-mail</h2>
              <input
                style={{
                  fontSize: "25px",
                  border: "none",
                  padding: "5px",
                  marginTop: "5px",
                  color: "#144c74",
                }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {!emailPattern.test(email) ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Invalid email address
                </p>
              ) : null}
            </>}
            {noUser?<p style={{ color: "red", fontSize: "14px" }}>No user with those details</p>:null}
            <div style={{marginTop: "25px", alignSelf: "center", display: "flex", justifyContent: "center"}}>
              <Button type="submit" title={"Confirm"} />
            </div>
          </form>
        </CardPageStyle>
        <Button title="back" color="#144c74" action={()=>setStep(0)}/>
      </Page>
    </>
  );
}

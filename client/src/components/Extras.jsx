import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ExtraLi = styled.li`
  list-style-type: none;
  padding: 10px;
  background-color: #f0f8fa;
  margin: 10px;
  border: 2px solid;
  border-color: #64b2d4;
  border-radius: 6px;
  max-width: 50%;
`;

const ExtraButton = styled.button`
  padding: 10px;
  background-color: #f0f8fa;
  margin: 10px;
  border: 2px solid;
  border-color: #64b2d4;
  border-radius: 6px;
  max-width: 50%;
`;

export default function Extras({ booking, setBooking }) {
  const [extras, setExtras] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7777/api/extras/")
      .then((res) => res.json())
      .then((data) => setExtras(data));
  }, []);

  return (
    <>
      <form>
        <ul>
          {extras.map((extra, i) => (
            <ExtraLi key={i}>
              <label htmlFor={extra.name}>{extra.name}</label>
              <input
                type="number"
                name={extra.name}
                id={extra.name}
                defaultValue={booking[extra.name] ? booking[extra.name] : "0"}
                required
                min="0"
                max="100"
                onChange={(e) => {
                  if (e.target.value > 100) {
                    e.target.value = 100;
                  }
                  if (e.target.value < 0) {
                    e.target.value = 0;
                  }
                  setBooking({ ...booking, [extra.name]: e.target.value });
                  console.log(e.target.value);
                }}
              />
            </ExtraLi>
          ))}
          <li>
            <ExtraButton onClick={(e) => extraButton(e)}>
              <h2>Confirm Extras</h2>
            </ExtraButton>
          </li>
        </ul>
      </form>
    </>
  );
}
const extraButton = (e) => {
  e.preventDefault();
};

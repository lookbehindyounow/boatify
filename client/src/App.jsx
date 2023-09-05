import { useEffect, useState } from "react";
import Cards from "./components/Cards";

function App() {
  useEffect(() => {
    fetching();
  }, []);

  const [destinations, setDestinations] = useState([])

  const fetching = async () => {
    const collection = "locations";
    const res = await fetch(`http://localhost:7777/api/${collection}`);
    const data = await res.json();
    setDestinations(data)

    console.log(data);
  };
  
  return (
    <>
  <h1>Boatify</h1>
    <Cards destinations={destinations}/>
  </>
  )
}

export default App;

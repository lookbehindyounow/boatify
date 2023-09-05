import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    const collection = "locations";
    const res = await fetch(`http://localhost:7777/api/${collection}`);
    const data = await res.json();
    console.log(data);
  };

  return <></>;
}

export default App;

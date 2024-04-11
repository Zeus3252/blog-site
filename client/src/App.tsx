import { useState, useEffect } from "react";
function App() {
  const [homepage, setHomePage] = useState("");

  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => setHomePage(JSON.stringify(data)))
      .catch((error) => setHomePage(`Error: ${error.toString()}`));
  }, []);
  console.log(homepage);
  return <div>{homepage}</div>;
}

export default App;

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupcakeDetails() {
  const { id } = useParams();
  const [cupcakeDetails, setCupcakeDetails] = useState();
  const apiURL = "http://localhost:4000";

  useEffect(() => {
    const url = `${apiURL}/cupcakes/${id}`;
    axios.get(url).then((response) => {
      setCupcakeDetails(response.data);
    });
  }, [id]);

  return (
    <div id="cupcakeDetailsFlex">
      {cupcakeDetails && (
        <>
          <h1>{cupcakeDetails.name}</h1>
          <Cupcake cupcake={cupcakeDetails} />
        </>
      )}
    </div>
  );
}
export default CupcakeDetails;

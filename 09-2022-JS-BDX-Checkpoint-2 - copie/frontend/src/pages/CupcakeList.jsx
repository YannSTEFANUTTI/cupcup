import React, { useState, useEffect } from "react";
import axios from "axios";
import Cupcake from "@components/Cupcake";
import { Link } from "react-router-dom";

export default function CupcakeList() {
  const apiURL = "http://localhost:4000";

  // Step 1: get all cupcakes
  const [cupcakes, setCupcakes] = useState([]);

  useEffect(() => {
    const url = `${apiURL}/cupcakes`;
    axios.get(url).then((response) => {
      setCupcakes(response.data);
    });
  }, []);

  // Step 3: get all accessories
  const [cupcakeAccessories, setCupcakeAccessories] = useState([]);
  const [selectedAcc, setSelectedAcc] = useState("");

  useEffect(() => {
    const url = `${apiURL}/accessories`;
    axios.get(url).then((response) => {
      setCupcakeAccessories(response.data);
    });
  }, []);

  const accSelection = (e) => {
    setSelectedAcc(e.target.value);
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select id="cupcake-select" onChange={accSelection}>
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {cupcakeAccessories &&
              cupcakeAccessories.map((cupcakeAccessory) => (
                <option key={cupcakeAccessory.id} value={cupcakeAccessory.id}>
                  {cupcakeAccessory.name}
                </option>
              ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes &&
          cupcakes
            .filter((cup) => !selectedAcc || cup.accessory_id === selectedAcc)
            .map((cup) => (
              <Link
                to={`/cupcakes/${cup.id}`}
                className="cupcake-item"
                key={cup.id}
              >
                <Cupcake cupcake={cup} />
              </Link>
            ))}
      </ul>
    </>
  );
}

import React from "react";
import styled from "styled-components";
import { BASE_URL } from "../../App";

function SearchResults({ data }) {
  return (
    <FoodContainer>
      {data.map((item, index) => (
        <FoodCard key={index}>
          <div className="cardLeft">
            <div className="imageContainer">
              <img src={BASE_URL + item.image} alt="photo" />
              <div className="price">${item.price.toFixed(1)}</div>
            </div>
          </div>
          <div className="cardRight">
            <h1>{item.name}</h1>
            <p>{item.text}</p>
            <div className="buttons">
              <button>Add to Cart</button>
              <button>Buy Now</button>
            </div>
          </div>
        </FoodCard>
      ))}
    </FoodContainer>
  );
}

const FoodContainer = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
  padding: 0 70px;
`;

const FoodCard = styled.div`
  height: 220px;
  width: auto;
  border-radius: 5px;
  color: white;
  background: rgba(
    255,
    255,
    255,
    0.2
  ); /* Adjust the alpha value for transparency */
  backdrop-filter: blur(10px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  .imageContainer img {
    width: 200px;
    height: 200px;
    margin-top: 15px;
  }

  .imageContainer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .price {
    position: absolute;
    top: 13%;
    left: 70%;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    color: #ff5f1f;
    background: white;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cardRight .buttons {
    display: flex;
    gap: 10px;
  }
  .cardRight button {
    height: 40px;
    width: 100px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #ff5f1f;
    cursor: pointer;
  }

  .cardRight button:hover {
    background-color: #ec5800;
  }
`;

export default SearchResults;

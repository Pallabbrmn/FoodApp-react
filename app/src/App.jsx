import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import SearchResults from "./components/SearchResults/SearchResults";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredFood, setFilteredFood] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        setData(result);
        setFilteredFood(result);
        setIsLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };

    fetchFoodData();
    // console.log(data);
  }, []);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading...</div>;

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilteredFood(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFood(filter);
  };

  const searchFilter = (type) => {
    if (type === "all") {
      setFilteredFood(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredFood(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  return (
    <>
      <MainContainer>
        <TopContainer>
          <div className="logo">
            <img src="/brandLogo.png" alt="logo" />
          </div>
          <div className="search-box">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food.."
            />
          </div>
        </TopContainer>
        <FilterSection>
          {filterBtns.map((value) => (
            <Button
              className="filterbox"
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => searchFilter(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterSection>
        <SearchResults data={filteredFood} />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("/background.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;

  padding-bottom: 100px;
`;

const TopContainer = styled.div`
  height: 130px;
  /* background-color: grey; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
  background: rgba(
    255,
    255,
    255,
    0.2
  ); /* Adjust the alpha value for transparency */
  backdrop-filter: blur(10px);

  .logo {
    height: 100px;
    width: 220px;
    margin-left: 50px;
  }
  .logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .search-box {
    width: 350px;
    height: 45px;
    border: 1px solid white;
    border-radius: 5px;
    padding: 0 10px;
    background-color: transparent;
    margin-right: 70px;
  }
  .search-box input {
    background: transparent;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    color: white;
  }

  .search-box input::placeholder {
    color: white; /* Set the color to white */
  }
`;

const FilterSection = styled.div`
  height: 70px;
  /* background-color: grey; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 70px;
  border-bottom: 1px solid white;
`;

const Button = styled.button`
  width: 290px;
  height: 50px;
  background-color: white;
  color: #ff5f1f;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #ec5800;
    color: white;
  }
`;

export default App;

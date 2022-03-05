import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
export const API_KEY = '26496d83';
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
// Styling Component for Header
const Header = styled.div `
  display: flex;
  flex-direction: row;
  background-color: black;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0px 3px 6px #555;
`;

// Header Logo Component
const HeaderLogo = styled.img `
  width: 48px;
  height: 48px;
  margin: 15px;
`;

// Search Box and Search Image Component
const SearchBox = styled.div `
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 1rem;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;
const SearchLogo = styled.img`
  width: 32px;
  height: 32px;
`; 
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

// Movie List Container
const MovieListContainer = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 24px;
`;

// Movie Logo PlaceHolder
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutID, updateTimeoutID] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();
  
  const fetchData = async (searchString) =>{
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  }
  const onTextChange = (event) => {
    clearTimeout(timeoutID);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutID(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <HeaderLogo src = "/movie.svg" />
          MovieBase
        </AppName>
        <SearchBox>
          <SearchLogo src = "/search.svg" />
          <SearchInput 
            placeholder='Search Movie'
            value={searchQuery}  
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? 
          (
              movieList.map((movie, index) => (
                <MovieComponent
                  key={index}
                  movie={movie}
                  onMovieSelect={onMovieSelect}
                />
              ))
          ) : (
                <Placeholder src="/movie.svg" />
              )
        }
      </MovieListContainer>
    </Container>
  );
}

export default App;

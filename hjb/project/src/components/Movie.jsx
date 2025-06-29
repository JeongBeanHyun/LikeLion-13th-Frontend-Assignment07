import { searchMovies } from "../apis/api";
import { FadeLoader } from "react-spinners";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Left = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 30%;
  height: 98%;
  margin: 10px;
  box-shadow: 5px 5px 5px gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: fixed;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 30px;
  margin: 10px;
`;

const Input = styled.input`
  text-align: center;
  margin: 10px;
  width: 80%;
  height: 40px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  text-decoration: none;
  background-color: #6c6ab1;
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
  width: 80%;

  &:hover {
    background-color: #fddef9;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
  align-items: center;
`;

const Result = styled.div`
  margin-left: 30%;
  width: 70%;
  padding: 20px;
  overflow-y: auto;
`;

const MovieBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const MovieItem = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 1);
`;

const MovieInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    margin-top: 10px;
    font-size: 20px;
  }

  p {
    margin: 0;
    font-size: 18px;
    color: #444;
  }
`;

export default function Movie() {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    isError,
    isSuccess,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div>
      <Left>
        <Title>🍿 영화 검색 🎬</Title>
        <Input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="영화 제목을 입력하세요"
        />
        {(isLoading || isFetching) && <FadeLoader />}
        {isError && <p>영화 검색을 실패했습니다.</p>}

        <Nav>
          <NavLink to="/">📊 박스오피스</NavLink>
          <NavLink to="/search">🔍 영화 검색</NavLink>
        </Nav>
      </Left>

      <Result>
        {isSuccess && (
          <MovieBox>
            {movies.map((movie) => (
              <MovieItem key={movie.id}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                />
                <MovieInfo>
                  <h4>{movie.title}</h4>
                  <p>{movie.overview}</p>
                </MovieInfo>
              </MovieItem>
            ))}
          </MovieBox>
        )}
      </Result>
    </div>
  );
}

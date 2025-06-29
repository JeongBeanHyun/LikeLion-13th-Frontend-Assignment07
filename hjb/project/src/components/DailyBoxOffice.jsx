import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDailyBoxOffice } from "../apis/api";
import { FadeLoader } from "react-spinners";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Title = styled.h3`
  color: blueviolet;
  text-align: center;
  font-size: 25px;
  margin: 10px;
`;

const Label = styled.label`
  color: #adabab;
  margin: 5px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  Label {
    margin-top: 10px;
    font-size: 20px;
    text-align: center;
  }

  input {
    margin: 0;
    font-size: 18px;
    color: #444;
  }
`;

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

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Rank = styled.ul`
  margin-left: 35%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  list-style: none;
`;

const RankCard = styled.li`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  display: block;
  padding: 10px;
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

export default function DailyBoxOffice() {
  const [date, setDate] = useState("");

  const {
    data: movie,
    isError,
    error,
    isSuccess,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["daily", date],
    queryFn: () => fetchDailyBoxOffice(date),
    enabled: !!date,
  });

  const handleDateChange = (e) => {
    const value = e.target.value;
    const formatted = value.replace(/\-/g, "");

    if (value === "") {
      setDate("");
    } else {
      setDate(formatted);
    }
  };

  return (
    <div>
      <Left>
        <InnerWrapper>
          <Title>✨일별 영화 박스오피스✨</Title>
          <Content>
            <Label>날짜를 선택해주세요</Label>
            <input type="date" onChange={handleDateChange} />
          </Content>
          {(isFetching || isLoading) && <FadeLoader />}
          {isError && <p>에러가 발생했습니다: {error.message}</p>}
          <Nav>
            <NavLink to="/">📊 박스오피스</NavLink>
            <NavLink to="/search">🔍 영화 검색</NavLink>
          </Nav>
        </InnerWrapper>
      </Left>

      {isSuccess && movie && (
        <Rank>
          {movie.map((item) => (
            <RankCard key={item.movieCd}>
              <Text>
                <strong>순위:</strong>
                {item.rank}
                {item.rank === "1" && " 🥇"}
                {item.rank === "2" && " 🥈"}
                {item.rank === "3" && " 🥉"}
              </Text>
              <Text>
                <strong>제목:</strong>
                {item.movieNm}
              </Text>
              <Text>
                <strong>개봉일:</strong>
                {item.openDt}
              </Text>
              <Text>
                <strong>오늘 관객수:</strong>
                {item.audiCnt}
              </Text>
              <Text>
                <strong>누적 관객수:</strong>
                {item.audiAcc}
              </Text>
            </RankCard>
          ))}
        </Rank>
      )}
    </div>
  );
}

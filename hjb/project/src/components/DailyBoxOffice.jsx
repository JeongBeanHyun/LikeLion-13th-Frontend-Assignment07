import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDailyBoxOffice } from "../apis/api";
import { FadeLoader } from "react-spinners";

const DailyBoxOffice = () => {
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
      <h3>일별 영화 박스오피스</h3>
      <div>
        <label>날짜를 선택해주세요</label>
        <input type="date" onChange={handleDateChange} />
      </div>
      {(isFetching || isLoading) && <FadeLoader />}
      {isError && <p>에러가 발생했습니다: {error.message}</p>}
      {isSuccess && movie && (
        <ul>
          {movie.map((item) => (
            <li key={item.movieCd}>
              <p>
                <strong>순위:</strong>
                {item.rank}
              </p>
              <p>
                <strong>제목:</strong>
                {item.movieNm}
              </p>
              <p>
                <strong>개봉일:</strong>
                {item.openDt}
              </p>
              <p>
                <strong>오늘 관객수:</strong>
                {item.audiCnt}
              </p>
              <p>
                <strong>누적관객수:</strong>
                {item.audiAcc}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyBoxOffice;

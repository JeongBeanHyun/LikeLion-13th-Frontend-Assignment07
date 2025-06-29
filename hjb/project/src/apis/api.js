import axios from "axios";

const BASE_URL = "http://kobis.or.kr/kobisopenapi/webservice/rest";
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

export const fetchDailyBoxOffice = async (targetDt) => {
  const response = await axios.get(
    `${BASE_URL}/boxoffice/searchDailyBoxOfficeList.json`,
    { params: { key: API_KEY, targetDt: targetDt } }
  );

  return response.data.boxOfficeResult.dailyBoxOfficeList;
};

const BASE_URL_TMDB = "https://api.themoviedb.org/3/search/movie";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const searchMovies = async (query) => {
  const re = await axios.get(`${BASE_URL_TMDB}`, {
    params: {
      api_key: TMDB_API_KEY,
      query,
      language: "ko-KR",
    },
  });
  return re.data.results;
};

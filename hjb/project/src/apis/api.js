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

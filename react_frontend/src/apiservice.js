//const config = {};
const axios = require("axios");

// const API_URL = "https://stphnrssll-phrasefinder.zeet.app";
// dev
const API_URL = "http://localhost:8000"

function getVideoSearch(vid_query, caption_query) {
  return axios.get(`${API_URL}/newResults?vid_query=${vid_query}&caption_query=${caption_query}`);
}
export { getVideoSearch };

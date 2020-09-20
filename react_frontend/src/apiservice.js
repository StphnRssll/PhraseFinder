const axios = require("axios");

const API_URL = "https://stphnrssll-phrasefinder.zeet.app/";
//const config = {};

function getVideoSearch(vid_query,caption_query){
  return axios.get(`${API_URL}/newResults?vid_query=${vid_query}&caption_query=${caption_query}`);
}
export { getVideoSearch };

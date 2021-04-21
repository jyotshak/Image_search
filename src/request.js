const axios = require("axios");  
const APIURL = "https://pixabay.com/api";

export const getImages = (page = 1) =>  
  axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=43f6292e193a976c8fe4d228dd831ee2&format=json&nojsoncallback=1");

export const searchImages = (keyword, page = 1) =>  
  axios.get(  
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=43f6292e193a976c8fe4d228dd831ee2&tags="+keyword+"&format=json&nojsoncallback=1"
  );
import React, {useState} from "react";    
import InfiniteScroll from "react-infinite-scroller";  
import Masonry from "react-masonry-component";  
import { masonryOptions } from "./exports";  
import { searchImages } from "./request";
import TopBar from "./TopBar";
import ReactModal from "react-modal";
import { Hint } from 'react-autocomplete-hint';
import store from './store';


function ImageSearchPage() {  
  const [images, setImages] = React.useState([]);  
  const [keyword, setKeyword] = React.useState([]);  
  const [page, setPage] = React.useState(1);  
  const [total, setTotal] = React.useState(0);  
  const [open, toggle] = React.useState(false);
  const[url, setURL] = React.useState('');
  const[options,setOptions] = React.useState([]);

  const searchAllImages = async (keyword, pg = 1) => { 
    searchImages(keyword,1).then((result)=>{ console.log(result); if(result.data.photos.total==0){alert("No results for given search!");};});
    const response = await searchImages(keyword, page);  
    console.log(response.data.photos.total);
    console.log(response);
    setImages([]);
    let imgs = response.data.photos.photo;  
    setImages(imgs);  
    setTotal(response.data.photos.total); 
    setPage(pg);
  }; 

  const getMoreImages = async () => {  
      console.log("reached???")
    let pg = page;  
    pg++;  
    const response = await searchImages(keyword, pg);  
    console.log(response.data.photos.total);
    console.log(response);
    let imgs = images.concat(response.data.photos.photo);  
    setImages(imgs);  
    setTotal(response.data.photos.total);  
    pg++;  
    setPage(pg);  
  }; 

  React.useEffect(() => {
  }); 

  const HandleSubmit = async (event) => {
      event.preventDefault();
      setImages([]);
      setPage(1);
      setTotal(0);
      if(keyword==''){
        alert("Field can't be empty");
        return;
      }
      store.dispatch({type : "AddSearch", payload : keyword});
      let list = Array.from(new Set(store.getState().search_history));
      console.log(list);
      let serial = 1;
      let serialized = [];
      for(var i = 0; i < list.length; i++){
        serialized = [...serialized, {id: i+1, label: list[i]}];
        // console.log(list[i]);
        // console.log(serialized);
      }
      console.log(serialized);
      setOptions(serialized);
      console.log(options);
      let tags = keyword.replace(/\s\s+/g, ' ');
      tags = tags.replace(/\s/g, '+');
      console.log(tags);
      await searchAllImages(tags);
      
  }
  const handleChange = value => {
      setKeyword(value.target.value)
  }

  const popUp = () => {
    toggle(!open);
    console.log(options);
  }

  


  return (  
    <div className="page" style = {{height: "100%"}}>  
    <TopBar />  
      <br />  
      <form onSubmit={HandleSubmit} style = {{textAlign: "center"}}>
        <label>
          <Hint options={options} allowTabFill={true}>
          <input type="text" value={keyword} onChange={handleChange} />
          </Hint>
        </label>
        <input type="submit" value="Submit" />
      </form> 
      <br/>
      <ReactModal
        className="Modal"
        isOpen={open}
        onClick={popUp}
        onRequestClose={popUp}
        ariaHideApp={false}
        overlayClassName="Overlay"
      >
        <img
          className="image"
          src={url}
          onClick={popUp}
          style={{height: '500px', width: '500px'}}
        />
        </ReactModal>
        <div id="scrollableDiv" style={{ height: "900px", overflow: "auto" }}>
        <InfiniteScroll  
          pageStart={1}  
          loadMore={getMoreImages}  
          hasMore={total > images.length} 
          style={{ marginLeft: 100, marginRight: 50 }}
          loader={<h4>Loading...</h4>}
        >  
          <Masonry  
            className={"grid"}  
            elementType={"div"}  
            options={masonryOptions}  
            disableImagesLoaded={false}  
            updateOnEachImageLoad={false}  
          >  
            {images.map((photo, i) => {  
              return (  
                <div className="grid-item">  
                  <img src={"http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_q.jpg'"} 
                  onClick={(event)=>{ setURL(event.target.currentSrc); console.log(event.target.currentSrc); popUp(); }} style={{ width: 300 }} />  
                
                </div>  
              );  
            })}  
          </Masonry>  
        </InfiniteScroll>  
        </div>
    </div>  
  );  
}  
export default ImageSearchPage;
import React from "react";  
import { getImages } from "./request";  
import InfiniteScroll from "react-infinite-scroller";  
import Masonry from "react-masonry-component";
import { masonryOptions } from "./exports";
import TopBar from "./TopBar";
import ReactModal from "react-modal";

function HomePage() {  
  const [images, setImages] = React.useState([]);  
  const [page, setPage] = React.useState(1);  
  const [total, setTotal] = React.useState(0);  
  const [initialized, setInitialized] = React.useState(false);   
  const [open, toggle] = React.useState(false);
  const[url, setURL] = React.useState('');
  const getAllImages = async (pg = 1) => { 
    const response = await getImages(page);  
    console.log(response.data.photos.total);
    console.log(response);
    let imgs = images.concat(response.data.photos.photo);  
    setImages(imgs);  
    setTotal(response.data.photos.total);  
    pg++;  
    setPage(pg);  
  }; 

  React.useEffect(() => {  
    if (!initialized) {  
      getAllImages();  
      setInitialized(true);  
    }  
  }); 
  const popUp = () => {
    toggle(!open);
  }
  return (  
    <div className="page">  
    <TopBar />
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
        loadMore={getAllImages}  
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
              <div className="grid-item" key={i}>  
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
export default HomePage;
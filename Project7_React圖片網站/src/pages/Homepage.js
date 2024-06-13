import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Picture from "../components/Picture";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null); //null跟""有差嗎?
  let [page, setPage] = useState(1); //設定page變數for加載更多圖片
  let [currentSearch, setCurrentSearch] = useState(""); //只有在按下search的按鈕後，儲存輸入欄的資料
  const auth = "IKh5eg7CC0OiXa07ALYK0ytavI2TZ7LifHTYU6i5XhcBydxToo8AlN2i";

  const initialURL = "https://api.pexels.com/v1/curated?pages=1&per_page=15";
  //Pexels網站生成圖片的API，pages表要求呈現的頁面數量；per_page表每頁呈現的圖片數量4

  let seachURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&pages=1`;
  //Pexels網站搜尋圖片的API，input表搜尋的內容

  const search = async (url) => {
    //透過設定參數url可以更彈性的決定帶入的是初始的圖片或是搜尋過的圖片
    //透過axios串接API
    let result = await axios.get(url, {
      headers: { Authorization: auth }, //headers:表傳遞API，透過設定物件Authorization給定API
    });
    console.log(result);
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  //page會有closure狀況，state改變但不會馬上更新值
  const morePicture = async () => {
    console.log("page state目前的值是" + page);
    let newURL;
    setPage(page + 1);
    console.log("set page後page state目前的值是" + page);
    //搜尋欄位是空的就用精選圖片
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    console.log(newURL);
    let result = await axios.get(newURL, {
      headers: { Authorization: auth }, //headers:表傳遞API，透過設定物件Authorization給定API
    });
    setData(data.concat(result.data.photos)); //concat串聯原本的圖片及加載的圖片
  };

  useEffect(() => {
    search(initialURL); //設定初始圖片的API，讓他帶入15行的URL
  }, []); //當Homepage被render出來時，就要呈現圖片，故使用useEffect->rander畫面就執行function

  return (
    <div style={{ minHeight: "100vh" }}>
      {/*呼叫第10行的function */}
      <Search
        //search屬性
        search={() => {
          search(seachURL); //傳遞搜尋的圖片網址，並會產生result，圖片就可以透過此result生成
        }}
        setInput={setInput}
      />
      {/*將搜尋欄的資料傳給Search*/}
      {/*search是Search的props，對應的是Search.js第3行跟第7行的{search}*/}
      <div className="pictures">
        {/*因為data在還沒改變State時是null，所以要先用&&判斷data是不是null*/}
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;

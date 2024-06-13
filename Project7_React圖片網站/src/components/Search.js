import React, { useState } from "react";

const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    setInput(e.target.value); //透過onChange記錄搜尋欄的文字，傳回setInput
  };

  return (
    <div className="search">
      <input className="input" type="text" onChange={inputHandler} />
      <button onClick={search}>Search</button>{" "}
      {/*search會對應到第3行的{search}*/}
    </div>
  );
};

export default Search;

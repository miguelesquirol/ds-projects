import React, { useState } from "react";

const Search = (props) => {
  const [name, setName] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  let searchValue;
  let counts = 0;

  let objects = props.data;

  const handleInputChange = (e) => {
    setSearchResult(null);
    setName(e.target.value);
    props.chart.clearHighlighting();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInput();
    }
  };

  const handleInput = () => {
    searchValue = searchFor(name);
    setSearchResult(searchValue.length);

    if (searchValue.length !== 0) {
      props.chart.clearHighlighting();
      props.chart
        .collapseAll()
        .setCentered(searchValue[counts].id)
        .setHighlighted(searchValue[counts].id)
        .render()
        .fit();

      counts = counts + 1;

      if (counts === searchValue.length) {
        counts = 0;
      }
    }
  };

  function trimString(s) {
    let l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] === " ") l++;
    while (r > l && s[r] === " ") r -= 1;
    return s.substring(l, r + 1);
  }

  function compareObjects(o1, o2) {
    let k = "";
    for (k in o1) if (o1[k] !== o2[k]) return false;
    for (k in o2) if (o1[k] !== o2[k]) return false;
    return true;
  }

  function itemExists(haystack, needle) {
    for (let i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  }

  let resultsText;

  
  if (searchResult > 0) {
    resultsText = `Found ${searchResult} values`;
  } else if (searchResult === 0) {
    resultsText = "No results found";
  } else resultsText = "";

  function searchFor(toSearch) {
    let results = [];
    toSearch = trimString(toSearch);

    for (let i = 0; i < objects.length; i++) {
      for (let key in objects[i]) {
        if (
          objects[i][key].toLowerCase().indexOf(toSearch.toLowerCase()) !== -1
        ) {
          if (!itemExists(results, objects[i])) results.push(objects[i]);
        }
      }
    }
    return results;
  }

  return (
    <div className="search">
      <input
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={() => handleInput()}>
        {searchResult > 1 ? "Next Result " : "Search"}
      </button>
      <div>{resultsText}</div>
    </div>
  );
};

export default Search;

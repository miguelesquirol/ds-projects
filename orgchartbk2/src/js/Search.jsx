import React, { useState } from 'react';

function Search(props) {
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const { data, chart } = props;

  let searchValue;
  let counts = 0;

  const objects = data;

  const handleInputChange = (e) => {
    setSearchResult(null);
    setName(e.target.value);
    chart.clearHighlighting();
  };

  function trimString(s) {
    let l = 0;
    let r = s.length - 1;
    while (l < s.length && s[l] === ' ') l++;
    while (r > l && s[r] === ' ') r -= 1;
    return s.substring(l, r + 1);
  }

  function compareObjects(o1, o2) {
    let k = '';
    for (k in o1) if (o1[k] !== o2[k]) return false;
    for (k in o2) if (o1[k] !== o2[k]) return false;
    return true;
  }

  function itemExists(haystack, needle) {
    for (let i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
    return false;
  }

  function searchFor(toSearch) {
    const results = [];
    const toSearchTrimed = trimString(toSearch);

    for (let i = 0; i < objects.length; i++) {
      for (const key in objects[i]) {
        if (
          objects[i][key].toLowerCase().indexOf(toSearchTrimed.toLowerCase()) !== -1
        ) {
          if (!itemExists(results, objects[i])) results.push(objects[i]);
        }
      }
    }
    return results;
  }

  const handleInput = () => {
    searchValue = searchFor(name);
    setSearchResult(searchValue.length);

    if (searchValue.length !== 0) {
      chart.clearHighlighting();
      chart
        .collapseAll()
        .setCentered(searchValue[counts].id)
        .setHighlighted(searchValue[counts].id)
        .render()
        .fit();

      counts += 1;

      if (counts === searchValue.length) {
        counts = 0;
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInput();
    }
  };

  let resultsText;

  if (searchResult > 0) {
    resultsText = `Found ${searchResult} values`;
  } else if (searchResult === 0) {
    resultsText = 'No results found';
  } else resultsText = '';

  return (
    <div className="search">
      <input
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyPress}
      />
      <button type="button" onClick={() => handleInput()}>
        {searchResult > 1 ? 'Next Result ' : 'Search'}
      </button>
      <div>{resultsText}</div>
    </div>
  );
}

export default Search;

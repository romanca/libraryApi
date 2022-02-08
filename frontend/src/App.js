import React from "react";
import "./App.css";

const App = () => {
  const [data, setData] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const url = "http://localhost:4000/book";
  const tagsUrl = "http://localhost:4000/book/tags";
  const itemUrl = "http://localhost:4000/book/:id";

  const fetchData = React.useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  }, []);

  const fetchTags = React.useCallback(async () => {
    const response = await fetch(tagsUrl);
    const dataTags = await response.json();
    setTags(dataTags);
  }, []);

  React.useEffect(() => {
    fetchData();
    fetchTags();
  }, [fetchTags, fetchData]);

  return (
    <div className="App">
      <div className="submit-form">
        <input type="text" />
        <input type="text" />
        <input type="number" />
        <button>SUBMIT</button>
      </div>
      <div className="item-container">
        {data.map((i) => (
          <div key={i.id} className="item">
            <div>{i.title}</div>
            <div>{i.author}</div>
            <div>{i.pages}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="tags">Tags</div>
        <div>
          {tags.map((i, index) => (
            <div key={index} className="item">
              <div>{i.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

import { useState, useEffect } from 'react';
import Loader from './Loader/Loader';
import retrieveImagesData from 'services/PixabayApi';
import Searchbar from './Searchbar/Searchbar';

const IMAGES_PER_PAGE = 12;
let areImages = false;
let totalHits = 0;

function App() {
  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    getImagesData();
  }, [query, page, getImagesData]);

  async function getImagesData() {
    let dataList = [];
    let flag = areImages;
    if (page === 1) flag = true;
    try {
      setIsLoading(true);
      const response = await retrieveImagesData(query, page);
      response.hits.map(item => {
        dataList.push({
          id: item.id,
          webformatURL: item.webformatURL,
          largeImageURL: item.largeImageURL,
        });
        return dataList;
      });
      if (dataList.length === 0) flag = false;
      totalHits = response.totalHits;
      if (totalHits <= IMAGES_PER_PAGE) flag = false;
      areImages = flag;
      console.log(dataList);
      setImagesData([...imagesData, ...dataList]);
    } catch (error) {
      alert(`${error.code}: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    const txt = evt.target[1].value;
    if (txt === '') return;
    areImages = false;
    totalHits = 0;
    setQuery(txt);
    setPage(1);
    setImagesData([]);
    setIsLoading(false);
    document.getElementsByTagName('form')[0].reset();
  };

  return (
    <>
      <Searchbar submitCallback={handleSubmit} />
      <Loader />
    </>
  );
}

export default App;

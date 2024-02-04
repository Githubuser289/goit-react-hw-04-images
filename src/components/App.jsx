import { useState, useEffect } from 'react';
import retrieveImagesData from 'services/PixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const IMAGES_PER_PAGE = 12;
let totalHits = 0;

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function areImages() {
    if (query === '' || imagesData.length === 0 || totalHits <= IMAGES_PER_PAGE)
      return false;
    const nrtotpag = Math.floor(totalHits / IMAGES_PER_PAGE);
    let flag;
    page + 1 === nrtotpag ? (flag = false) : (flag = true);
    return flag;
  }

  useEffect(() => {
    let signal = false;
    if (query === '') return;

    async function getImagesData() {
      if (signal) return;
      let dataList = [];
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
        setImagesData(images => [...images, ...dataList]);
        totalHits = response.totalHits;
      } catch (error) {
        alert(`${error.code}: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    getImagesData();
    return () => (signal = true);
  }, [query, page]);

  const handleClick = () => {
    setPage(pag => pag + 1);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const txt = evt.target[1].value;
    if (txt === '') return;
    totalHits = 0;
    setImagesData([]);
    setIsLoading(false);
    setQuery(txt);
    setPage(1);
    document.getElementsByTagName('form')[0].reset();
  };

  return (
    <>
      <Searchbar submitCallback={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery data={imagesData} />
      {areImages() ? <Button onClickCallback={handleClick} /> : null}
      {!areImages() && page === 1 ? (
        <p>
          <br /> There are no images to display yet.
        </p>
      ) : null}
      {!areImages() && page > 1 ? (
        <p>
          <br /> You have seen all the images.
        </p>
      ) : null}
    </>
  );
}

export default App;

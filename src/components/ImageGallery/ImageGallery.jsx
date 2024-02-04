import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

function ImageGallery({ data }) {
  if (data.length === 0) return;
  return (
    <ul className={style.ImageGallery}>
      {data.map(item => (
        <ImageGalleryItem key={nanoid()} itemData={item} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;

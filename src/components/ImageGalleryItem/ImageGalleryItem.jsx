import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

function ImageGalleryItem({ itemData }) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <li className={style.ImageGalleryItem}>
        <img src={itemData.webformatURL} alt="" onClick={handleClick} />
      </li>
      {showModal && (
        <Modal itemURL={itemData.largeImageURL} callback={handleClose} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
};

export default ImageGalleryItem;

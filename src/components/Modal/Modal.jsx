import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

function Modal({ itemURL, callback }) {
  useEffect(() => {
    const pressEsc = event => {
      if (event.code === 'Escape') {
        callback();
      }
    };
    window.addEventListener('keydown', pressEsc);
    return () => window.removeEventListener('keydown', pressEsc);
  }, [callback]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      callback();
    }
  };

  return (
    <div className={style.Overlay} onClick={handleOverlayClick}>
      <div className={style.Modal}>
        <img src={itemURL} alt="enlarged photography" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  itemURL: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Modal;

import PropTypes from 'prop-types';
import style from './Button.module.css';

function Button({ onClickCallback }) {
  return (
    <div className={style.Div}>
      <button className={style.Button} onClick={onClickCallback}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClickCallback: PropTypes.func.isRequired,
};

export default Button;

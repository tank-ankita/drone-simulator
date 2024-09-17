// ActionButton.jsx
import '../../css/actionButton.css'; // Link to CSS for button styling
import PropTypes from 'prop-types';

const ActionButton = ({ onClick, title }) => {
  return (
    <button className="action-button" onClick={onClick}> { title }</button>
  );
};


ActionButton.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string
};

export default ActionButton;

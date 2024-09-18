// ActionButton.jsx
import '../../css/actionButton.css'; // Link to CSS for button styling 84d100
import PropTypes from 'prop-types';

const ActionButton = ({ onClick, title, green }) => {
  const buttonStyle = {
    backgroundColor: green ? '#28a745' : '#007bff', 
    cursor: 'pointer'
  };

  return (
    <button className="action-button" onClick={onClick} style={buttonStyle}> { title }</button>
  );
};

ActionButton.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    green: PropTypes.bool
};

export default ActionButton;

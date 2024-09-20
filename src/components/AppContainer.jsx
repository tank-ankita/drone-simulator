import '../css/appContainer.css'
import PropTypes from 'prop-types';


export const AppContainer = ({ children }) => {
    const getBannerReference = () => {
        if (window.location.hostname.includes('localhost')) {
          return '/assets/fixtures/nws_banner.png';
        }
      
        return '/drone-simulator/assets/fixtures/nws_banner.png';
      };
    
    return (
        <div className="application-container"> 
            <div className="header-container">
                <div className="nws-logo">
                    <img src={getBannerReference()} alt="Logo" />
                </div>
            </div>
            <div className="application-content">
                { children }
            </div>
        </div>
    )
}

AppContainer.propTypes = {
    children: PropTypes.node,
};

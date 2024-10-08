// import React, { useState } from 'react';
// import './HomePage.css'; // Add custom styles here
// import { useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const launchConfig = () => {
//     // Redirect to another URL for configuration
//     window.open('https://your-configuration-url.com', '_blank');
//   };

//   return (
//     <div className="home-page">
//       {/* Title Bar */}
//       <div className="title-bar">
//         <img src="/path/to/your/image.jpg" alt="Logo" className="logo" />
//         <h1 className="title" onClick={openModal}>Welcome to My Platform</h1>
//       </div>

//       {/* Modal */}
//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
//         <h2>More Information</h2>
//         <p>Details about your platform or feature.</p>
//         <button onClick={launchConfig}>Launch Configuration</button>
//         <button onClick={closeModal}>Close</button>
//       </Modal>

//       {/* Tiles for navigation */}
//       <div className="tiles-container">
//         <div className="tile" onClick={() => navigate('/simulator')}>Course 1</div>
//         <div className="tile" onClick={() => navigate('/game-mode/')}>Course 2</div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const HomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const openModal = (course) => {
    setSelectedCourse(course);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const launchSimulator = (link) => {
    navigate(link)
  };

  const getImagePrefix = (image) => {
    if (window.location.hostname.includes('localhost')) {
      return '/assets/' + image;
    }
  
    return '/drone-simulator/assets/' + image;
  };


  return (
    <div className="home-page">
      {/* Title Bar with logo centered */}
      <div className="title-bar">
        <img src={getImagePrefix("fixtures/nws_banner.png")} alt="Company Logo" className="logo" />
      </div>

      {/* Modal for course details */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>{selectedCourse ? selectedCourse.title : "Course Details"}</h2>
        <p>{selectedCourse ? selectedCourse.details : "More details about the selected course."}</p>
        <button onClick={closeModal}>Close</button>
        {/* <button onClick={launchSimulator(selectedCourse ? selectedCourse.link : "/")}>Launch Simulator</button> */}
      </Modal>

      {/* Grid of course tiles */}
      <div className="tiles-container">
        {[
            { id: 1, title: "Space Simulator", image: getImagePrefix("fixtures/space.jpg"), details: "Learn how to navigate your drone in space using blocky", link: "/space/"},
            { id: 2341, title: "Course 1", image: getImagePrefix("fixtures/space.jpg"), details: "Details about Course 1", link: "/space/"},
          { id: 432431, title: "Course 1", image: getImagePrefix("fixtures/space.jpg"), details: "Details about Course 1", link: "/space/"},
          { id: 2441, title: "Course 1", image: getImagePrefix("fixtures/space.jpg"), details: "Details about Course 1", link: "/space/"},

        ].map((course) => (
          <div key={course.id} className="tile" onClick={() => openModal(course)}>
            <img src={course.image} alt={course.title} className="tile-image" />
            <div className='tile-title'>{course.title}</div>
            <div className='tile-details'>{course.details}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

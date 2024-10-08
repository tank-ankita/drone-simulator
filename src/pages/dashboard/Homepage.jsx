import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ActionButton from '../../components/ActionButton.jsx'
import { getImagePrefix, projects } from './config.js'

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

  const launchSimulator = (course) => {
    if (course) {
      navigate(course.link);
    }
  };

  const PROJECTS = projects();

  return (
    <div className="home-page">
      <div className="title-bar">
        <img src={getImagePrefix("fixtures/nws_banner.png")} alt="Company Logo" className="logo" />
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <ActionButton onClick={closeModal} title="Close" small right/>

        <h2>{selectedCourse ? selectedCourse.title : "Course Details"}</h2>
        <p>{selectedCourse ? selectedCourse.description1 : "More details about the selected course."}</p>
        <p>{selectedCourse ? selectedCourse.description2 : ""}</p>

        <ActionButton onClick={() => launchSimulator(selectedCourse)} title="Launch" /> {/* Wrap in arrow function */}
      </Modal>

      <div className="tiles-container">
        {PROJECTS.map((course) => (
          <div key={course.id} className="tile" onClick={() => openModal(course)}>
            <img src={course.image} alt={course.title} className="tile-image" />
            <div className='tile-title'>{course.title}</div>
            <div className='tile-details'>{course.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

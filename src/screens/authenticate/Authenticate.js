import React from 'react';
import Modal from 'react-modal';

import TabComponent from './TabComponent';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

function Authenticate(props) {
  function afterOpenModal() {}

  return (
    <div>
      <Modal
        isOpen={props.modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <TabComponent />
      </Modal>
    </div>
  );
}

export default Authenticate;

import React from 'react';
import Modal from 'react-responsive-modal';

const InstructionModal = ({ open, setOpen, instructions }) => {
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Trevor's Commands</h4>
        <ul>
          {instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ul>
      </Modal>
      <div className="fixed-action-btn">
        <a
          className="btn-floating btn-medium amber"
          onClick={() => setOpen(true)}
        >
          <i className="large material-icons">help_outline</i>
        </a>
      </div>
    </div>
  );
}

export default InstructionModal

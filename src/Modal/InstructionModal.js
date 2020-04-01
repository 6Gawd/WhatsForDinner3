import React from 'react';
import Modal from 'react-responsive-modal';
import { navInstructions } from '../Speech/Commands'

const InstructionModal = ({ open, setOpen, instructions }) => {
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Your Virtual Assistant Alex</h4>
        <ul>
          {instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ul>
        <hr />
        <h6>Alex can also help you navigate the website</h6>
        <ul>
          {navInstructions.map((navInstruction, i) => (
            <li key={i}>{navInstruction}</li>
          ))}
        </ul>
      </Modal>
      <div className="fixed-action-btn">
        <a
          className="btn-floating btn-medium amber pulse"
          onClick={() => setOpen(true)}
        >
          <i className="large material-icons">help_outline</i>
        </a>
      </div>
    </div>
  );
}

export default InstructionModal

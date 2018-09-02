import React from 'react';
import Modal from 'react-modal';

class RemoveExpenseModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={!!this.props.isOpen}
        onRequestClose={this.props.onModalClose}
        contentLabel="Selected Option"
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
      >
        <h3 className="modal__title">{this.props.messageTitle}</h3>
        {this.props.selectedOption && (
          <p className="modal__body">{this.props.messageBody}</p>
        )}
        <button className="button" onClick={this.props.onModalOk}>
          OK
        </button>
        <button className="button" onClick={this.props.onModalClose}>
          Cancel
        </button>
      </Modal>
    );
  }
}

export default RemoveExpenseModal;

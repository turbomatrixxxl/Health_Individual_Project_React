import React from 'react';
import PropTypes from 'prop-types';
import { HiX } from 'react-icons/hi';

import styles from './Modal.module.css';
import clsx from 'clsx';

function Modal({
  isModalVisible,
  handleModalClose,
  children,
  dialogRef,
  contRef,
  modalContentClassName,
  closeButton,
}) {
  if (!isModalVisible) {
    return;
  }

  return (
    isModalVisible && (
      <section ref={dialogRef} className={styles.modalClassName}>
        <div
          ref={contRef}
          className={clsx(styles.content, modalContentClassName)}
        >
          <button
            className={clsx(styles.closeModal, closeButton)}
            id="closeModal"
            onClick={handleModalClose}
          >
            <HiX size="16px" />
          </button>
          {children}
        </div>
      </section>
    )
  );
}

Modal.propTypes = {
  isModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
  handleChange: PropTypes.func,
  handleSave: PropTypes.func,
  dialogRef: PropTypes.object,
  contRef: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]), modalContentClassName: PropTypes.string,
  closeButton: PropTypes.string,
};

export default Modal;

import classes from './Modal.module.css';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? `${classes.modal} ${classes.displayBlock}`: `${classes.modal} ${classes.displayNone}`;
  
    return (
      <div className={showHideClassName}>
        <section className={`${classes.modalMain}`}>
          {children}
          <button data-test="close-modal-button" type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    );
  };

  export default Modal;
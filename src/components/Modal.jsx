import { forwardRef } from "react";

const Modal = forwardRef(function Modal({ content, modalTitle }, ref) {
  return (
    <>
      <dialog id="my_modal_1" className="modal" ref={ref}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default Modal;

export default function Popup(props) {
 const { onClose, title, children } = props;
 return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="popup__container" {...containerProps}>
        <button
          type="button"
          className="popup__close-button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <img
            src="/images/close-icon.svg"
            alt="Cerrar"
            className="popup__close-icon"
          />
        </button>
        <h3 id="popup-title" className="popup__title">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );

}
"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import CheckCircleIcon from "@/assets/svgs/admin/dashboard/finished-icon.svg?component";
import CloseIcon from "@/assets/svgs/close-icon.svg?component";

interface NotificationProps {
  message: string;
  type: "success" | "error" | null;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const [show, setShow] = useState(false);

  const [latchedMessage, setLatchedMessage] = useState(message);
  const [latchedType, setLatchedType] = useState(type);

  useEffect(() => {
    if (type !== null) {
      setLatchedMessage(message);
      setLatchedType(type);
      setShow(true);

      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [message, type, onClose]);

  const bgColor =
    latchedType === "success" ? "bg-primaryBlue" : "bg-primaryBlue";
  const icon = latchedType === "success" ? <CheckCircleIcon /> : <CloseIcon />;
  const iconFill =
    latchedType === "success" ? "fill-iconsGreen" : "fill-iconsRed";

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition ease-out duration-300 transform"
      enterFrom="translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition ease-in duration-300 transform"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="translate-x-full opacity-0"
    >
      <div
        className={`max-w-[90vw] fixed bottom-4 right-4 z-2010 flex items-center p-4 pr-6 rounded-lg shadow-lg text-primaryWhite ${bgColor}`}
        role="alert"
      >
        <div
          className={`notification-icon-container flex-shrink-0 mr-3 p-[6px] rounded-[10px] flex items-center justify-center bg-primaryWhite ${iconFill}`}
        >
          {icon}
        </div>
        <div className="text-sm font-semibold flex-grow">{latchedMessage}</div>
        <button
          type="button"
          onClick={onClose}
          className="close-notification-button fill-primaryOrange ml-4 p-1 rounded-full text-primaryWhite/80 hover:text-primaryWhite hover:bg-white/10 transition-colors"
          aria-label="Закрити сповіщення"
        >
          <CloseIcon />
        </button>
      </div>
    </Transition>
  );
};

export default Notification;

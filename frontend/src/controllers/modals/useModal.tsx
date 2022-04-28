import { createContext, useContext, FC, useState, useCallback } from 'react';

import { Modals } from './types';

interface ModalContextType {
  openModal: (modal: Modals) => void;
  closeModal: () => void;
  isModalOpen: (modal: Modals) => boolean;
}

const noop = () => {};

export const ModalContext = createContext<ModalContextType>({
  openModal: noop,
  closeModal: noop,
  isModalOpen: () => false,
});

export const ModalProvider: FC = ({ children }) => {
  const [modalsPool, setModalsPool] = useState<Modals[]>([]);

  const openModal = useCallback(
    (modal: Modals) => {
      setModalsPool([modal, ...modalsPool]);
    },
    [modalsPool],
  );

  const closeModal = useCallback(() => {
    console.log({ modalsPool });
    setModalsPool(modalsPool.slice(1));
  }, [modalsPool]);

  const isModalOpen = useCallback(
    (modal: Modals) => {
      return modalsPool.includes(modal);
    },
    [modalsPool],
  );

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

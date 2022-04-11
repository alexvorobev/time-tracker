import { useState, useCallback } from 'react';

export interface ToggleState {
  isOpen: boolean;
  setOpen: () => void;
  setClosed: () => void;
  toggle: () => void;
}

export const useToggleState = (defaultValue = false): ToggleState => {
  const [isOpen, setState] = useState(defaultValue);

  const setOpen = useCallback(() => setState(true), [setState]);
  const toggle = useCallback(() => setState((current) => !current), [setState]);
  const setClosed = useCallback(() => setState(false), [setState]);

  return { isOpen, setOpen, setClosed, toggle };
};

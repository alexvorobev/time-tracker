import { FC, createContext, useContext, useState, useCallback } from 'react';

interface ListContextType {
  selectedItems: number[];
  isSelectedAll: boolean;
  onSelectItem: (data: number) => void;
  onSelectAll: () => void;
}

const noop = () => {};

const ListContext = createContext<ListContextType>({
  selectedItems: [],
  isSelectedAll: false,
  onSelectItem: noop,
  onSelectAll: noop,
});

export const ListProvider: FC = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectedAll, setSelectedAll] = useState<boolean>(false);

  const onSelectItem = useCallback(
    (item: number) => {
      setSelectedAll(false);

      const elementIndex = selectedItems.indexOf(item);

      if (elementIndex > -1) {
        selectedItems.splice(elementIndex, 1);
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    },
    [selectedItems],
  );

  const onSelectAll = useCallback(() => {
    if (!isSelectedAll) {
      setSelectedItems([]);
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [isSelectedAll]);

  return (
    <ListContext.Provider value={{ selectedItems, isSelectedAll, onSelectAll, onSelectItem }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListState = () => useContext(ListContext);

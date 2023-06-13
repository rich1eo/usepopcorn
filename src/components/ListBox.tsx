import { useState } from 'react';
import ButtonToggle from '../UI/ButtonToggle';

interface ListBoxProps {
  children: React.ReactNode;
}

function ListBox({ children }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="box">
      <ButtonToggle onClick={() => setIsOpen(open => !open)}>
        {isOpen ? '–' : '+'}
      </ButtonToggle>
      {isOpen && children}
    </div>
  );
}

export default ListBox;

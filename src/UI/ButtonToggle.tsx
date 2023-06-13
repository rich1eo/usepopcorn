interface ButtonToggleProps {
  children: string;
  onClick(): void;
}

function ButtonToggle({ children, onClick }: ButtonToggleProps) {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonToggle;

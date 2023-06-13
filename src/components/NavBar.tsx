interface NavBarProps {
  children: React.ReactNode;
}

function NavBar({ children }: NavBarProps) {
  return <nav className="nav-bar">{children}</nav>;
}

export default NavBar;

import { Menubar } from 'primereact/menubar';

const Header = ({ items, end }) => {
  return <Menubar model={items} end={end} />;
};

export default Header;

import SideHeader from '../Components/SideHeader/SideHeader';
import './globals-authorized.css';

interface AuthorisedLayoutProps {
  children: React.ReactNode;
}

const AuthorisedLayout: React.FC<AuthorisedLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <SideHeader />
      {children}
    </div>
  );
};

export default AuthorisedLayout;

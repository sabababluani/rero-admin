import './globals-authorized.css';
import SideHeader from '../Components/SideHeader/SideHeader';

interface AuthorisedLayoutProps {
  children: React.ReactNode;
}

const AuthorisedLayout: React.FC<AuthorisedLayoutProps> = ({ children }) => {
  return (
    <div className='layout'>
      <SideHeader />
      {children}
    </div>
  );
};

export default AuthorisedLayout;

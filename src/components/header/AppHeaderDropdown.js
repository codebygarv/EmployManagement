import React, { useEffect, useState } from 'react';
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import {
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authConstant } from '../../adapters/constants/authConstant';
// import './profileImage.css';
// import { profileAction } from '../../adapters/actions/profileAction';
// import { headers } from '../../adapters/helpers/header';
import avatar8 from './../../assets/images/avatars/8.jpg'
import toast from 'react-hot-toast';

const AppHeaderDropdown = () => {
  const profilestate = useSelector((state) => state.profile?.userDetails?.user);
  const authState = useSelector((state) => state.auth);
  const [initials, setInitials] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    if (!authState.auth) {
      navigate('/login');
    }
  }, [authState, navigate]);

  // useEffect(() => {
  //   dispatch(profileAction.profileData(headers.token));
  //   if (profilestate?.firstName) {
  //     const initials = `${profilestate.firstName.charAt(0).toUpperCase()}${profilestate.lastName.charAt(0).toUpperCase()}`;
  //     setInitials(initials);
  //   }
  // }, [profilestate]);

  const handleLogout = () => {
    dispatch({ type: authConstant.SIGNOUT_SUCCESS, payload: null });
    toast.success('Log Out Successfully!')
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>

        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={avatar8} size="md" />
        </CDropdownToggle>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <Link to={'/profile'} style={{ textDecoration: 'none', color: 'black' }}>
          <CDropdownItem className={activeItem === '/profile' ? 'active-tem' : ''} onClick={() => setActiveItem('/profile')}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        </Link>
        <Link to={'/change-password'} style={{ textDecoration: 'none', color: 'black' }}>
          <CDropdownItem className={activeItem === '/change-password' ? 'active-tem' : ''} onClick={() => setActiveItem('/change-password')}>
            <CIcon icon={cilSettings} className="me-2" />
            Change Password
          </CDropdownItem>
        </Link>
        <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;

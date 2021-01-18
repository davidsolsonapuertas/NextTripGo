import React, {
  useState,
  useMemo,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { useHistory } from 'react-router-dom';

import './topbar.css';
import { FETCH_USERS } from '../../services/Users/UsersQuery';
import { AuthContext } from '../../Context/Auth';
import Search from '../../Pages/Search/Search';

interface IProps {
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

function Topbar({ setSidebar }: IProps) {
  const [open, setOpen] = useState(true);
  const [suggestionValue, setSuggestionValue] = useState('');
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  let { data } = useQuery(FETCH_USERS);
  const allUsers = data?.getUsers;

  useMemo(() => {
    if (suggestionValue.length > 1) {
      history.push('/user/' + suggestionValue);
    }
  }, [suggestionValue, history]);

  const showSidebar = () =>
    setSidebar((sidebar: boolean) => {
      setOpen(!open);
      return !sidebar;
    });

  return (
    <div className="trip-topbar d-flex justify-content-between bg-white shadow">
      <div className="margin-topbar d-flex align-items-center">
        <Link className="trip-sidebar-icon" to="#">
          <DehazeIcon onClick={showSidebar} />
        </Link>
      </div>
      <div className="">
        {allUsers?.length > 0 && (
          <Search
            dataToSearch={allUsers}
            setSuggestionValue={setSuggestionValue}
          />
        )}
      </div>
      <button
        className="button float-right btn"
        style={{ float: 'right' }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Topbar;

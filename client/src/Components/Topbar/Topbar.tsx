import React, {
  useState,
  useMemo,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useHistory } from "react-router-dom";

import "./topbar.css";
import { FETCH_USERS, GET_LOGGED_USER } from "../../services/Users/UsersQuery";
import { AuthContext } from "../../Context/Auth";
import Search from "../../Pages/Search/Search";
import FriendRequestDropdown from "./FriendRequestDropdown";
import UserProfile from "./UserProfile";

interface IProps {
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

interface IUser {
  user: {
    id: string;
    username: string;
    profilePic: string;
  } | null;
  login: (userData: LoggedUser) => void;
  logout: () => void;
}

interface LoggedUser {
  username: string;
  password: string;
  token: string;
}

function Topbar({ setSidebar }: IProps) {
  const [open, setOpen] = useState(true);
  const [suggestionValue, setSuggestionValue] = useState<string | null>("");
  const { logout, user } = useContext<IUser>(AuthContext);
  const history = useHistory();

  let { data } = useQuery(FETCH_USERS);
  const allUsers = data?.getUsers;

  const { data: dataLoggedUser } = useQuery(GET_LOGGED_USER, {
    variables: { userId: user?.id },
    pollInterval: 500,
  });

  const loggedUser = dataLoggedUser?.getLoggedUser;

  useMemo(() => {
    if (suggestionValue) {
      history.push("/user/" + suggestionValue);
    }
  }, [suggestionValue, history]);

  const showSidebar = () =>
    setSidebar((sidebar: boolean) => {
      setOpen(!open);
      return !sidebar;
    });

  return (
    <div className="grid-container-topbar bg-white shadow">
      <div className="margin-topbar d-flex align-items-center">
        <Link className="trip-sidebar-icon" to="#">
          <DehazeIcon onClick={showSidebar} />
        </Link>
      </div>
      <div className="Search">
        {allUsers?.length > 0 && (
          <Search
            dataToSearch={allUsers}
            setSuggestionValue={setSuggestionValue}
          />
        )}
      </div>
      <div className="Side d-flex align-items-center text-center justify-content-end">
        <FriendRequestDropdown loggedUser={loggedUser} />
        <UserProfile loggedUser={loggedUser} />
        <button className="button btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

export const routes = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeRoundedIcon />,
  },
  {
    title: 'Trips',
    path: '/trips',
    icon: <FlightTakeoffRoundedIcon />,
    subNav: [
      { title: 'My trips', path: '/trips', icon: '' },
      { title: 'Create trip', path: '/createTrip', icon: '' },
      {
        title: "My friends' trips",
        path: '/friends/trips',
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
  {
    title: 'Me',
    path: '/me',
    icon: <PersonRoundedIcon />,
    subNav: [
      { title: 'Profile', path: '/me', icon: '' },
      { title: 'Friends', path: '/friends', icon: <PeopleAltRoundedIcon /> },
    ],
  },
];

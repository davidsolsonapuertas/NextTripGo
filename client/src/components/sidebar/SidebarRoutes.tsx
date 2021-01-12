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
    title: 'Me',
    path: '/me',
    icon: <PersonRoundedIcon />,
    subNav: [
      { title: 'Profile', path: '/me', icon: '' },
      { title: 'Friends', path: '/friends', icon: <PeopleAltRoundedIcon /> },
    ],
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
];

// {
//   title: 'Overview',
//   path: '/overview',
//   icon: <AiIcons.AiFillHome />,
//   iconClosed: <RiIcons.RiArrowDownSFill />,
//   iconOpened: <RiIcons.RiArrowUpSFill />,

//   subNav: [
//     {
//       title: 'Users',
//       path: '/overview/users',
//       icon: <IoIcons.IoIosPaper />
//     },
//     {
//       title: 'Revenue',
//       path: '/overview/revenue',
//       icon: <IoIcons.IoIosPaper />
//     }
//   ]
// },
// {
//   title: 'Reports',
//   path: '/reports',
//   icon: <IoIcons.IoIosPaper />,
//   iconClosed: <RiIcons.RiArrowDownSFill />,
//   iconOpened: <RiIcons.RiArrowUpSFill />,

//   subNav: [
//     {
//       title: 'Reports',
//       path: '/reports/reports1',
//       icon: <IoIcons.IoIosPaper />,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'Reports 2',
//       path: '/reports/reports2',
//       icon: <IoIcons.IoIosPaper />,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'Reports 3',
//       path: '/reports/reports3',
//       icon: <IoIcons.IoIosPaper />
//     }
//   ]
// },
// {
//   title: 'Products',
//   path: '/products',
//   icon: <FaIcons.FaCartPlus />
// },
// {
//   title: 'Team',
//   path: '/team',
//   icon: <IoIcons.IoMdPeople />
// },
// {
//   title: 'Messages',
//   path: '/messages',
//   icon: <FaIcons.FaEnvelopeOpenText />,

//   iconClosed: <RiIcons.RiArrowDownSFill />,
//   iconOpened: <RiIcons.RiArrowUpSFill />,

//   subNav: [
//     {
//       title: 'Message 1',
//       path: '/messages/message1',
//       icon: <IoIcons.IoIosPaper />
//     },
//     {
//       title: 'Message 2',
//       path: '/messages/message2',
//       icon: <IoIcons.IoIosPaper />
//     }
//   ]
// },
// {
//   title: 'Support',
//   path: '/support',
//   icon: <IoIcons.IoMdHelpCircle />
// }

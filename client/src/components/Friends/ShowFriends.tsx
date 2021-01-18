import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import {
  deepPurple,
  pink,
  deepOrange,
  blue,
  green,
} from '@material-ui/core/colors';

import { User } from '../../Interfaces/User';
import { Link } from 'react-router-dom';

interface IProps {
  friends: User[];
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    0: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    1: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
    },
    2: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    3: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
    },
    4: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
    },
  })
);

function ShowFriends({ friends }: IProps) {
  const classes = styles();

  return (
    <div className="mt-3 d-flex flex-column">
      <h4>Friends</h4>
      <div className="d-flex">
        {friends?.map((friend: User, index: number) => {
          return (
            <div className="m-2">
              <Link to={'/user/' + friend.username}>
                <Avatar className={classes[index]}>
                  {friend.username?.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowFriends;

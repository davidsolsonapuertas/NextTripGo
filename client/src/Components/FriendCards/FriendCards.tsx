import React from "react";

import { User } from "../../Interfaces/User";

interface IProps {
  friends: User[];
  receivedFriendRequests: string[];
}

function FriendCards({ friends }: IProps) {
  return (
    <div className="d-flex flex-">
      {friends?.length > 1 ? (
        friends?.map((friend: User) => {
          return <div>{friend?.username}</div>;
        })
      ) : (
        <div className="d-flex w-100 mt-5 flex-column align-items-center justify-content-center">
          <p>You don't have friends yet!</p>
        </div>
      )}
      {/* <div className="card">
          <a href={data.url} target="_blank">
            <img className="card__avatar" src={data.avatar} />             
          </a>
          <h2 className="card__username">
            <a className="card__link" href={data.url} target="_blank">{data.username}</a></h2>
          <dl>
            <dt>Real name</dt>
            <dd>{data.realName}</dd>

            <dt>Location</dt>
            <dd>{data.location}</dd>

            <dt>Number of public repos</dt>
            <dd>{data.repos}</dd>

            <dt>Number of followers</dt>
            <dd>{data.followers}</dd>
          </dl>
        </div> */}
    </div>
  );
}

export default FriendCards;

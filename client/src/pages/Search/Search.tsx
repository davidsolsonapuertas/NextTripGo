import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Autosuggest from 'react-autosuggest';
import { useHistory } from 'react-router-dom';

import { FETCH_USERS } from '../../services/queryService';

import './Search.css';

interface User {
  id: String;
  firstname: String;
  lastname: String;
  currentCity: String;
  profilePic: String;
  friends: Friends[];
  username: String;
  createdAt: String;
}

interface Friends {
  id: String;
  firstname: String;
  lastname: String;
  currentCity: String;
  username: String;
  createdAt: String;
}

function Search() {
  const [selected, setSelected] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const history = useHistory();

  let { data } = useQuery(FETCH_USERS);
  const allUsers = data?.getUsers;

  const lowerCasedUsernames = allUsers?.map((user: User) =>
    user.username.toLowerCase()
  );

  const getSuggestions = (value: string): string[] => {
    return lowerCasedUsernames.filter((usernames: String) =>
      usernames.startsWith(value.trim().toLowerCase())
    );
  };

  return (
    <div className="row user-input">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          setSelected(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(_, { suggestionValue }) =>
          history.push('/user/' + suggestionValue)
        }
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <span>{suggestion}</span>}
        inputProps={{
          placeholder: '🔍   Search friends by username',
          value: selected,
          onChange: (_, { newValue, method }) => {
            setSelected(newValue);
          },
        }}
        highlightFirstSuggestion={true}
      />
    </div>
  );
}

export default Search;

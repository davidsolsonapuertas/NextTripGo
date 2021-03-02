import React, { useState, Dispatch, SetStateAction } from "react";
import Autosuggest from "react-autosuggest";

import "./Search.css";

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

interface IProps {
  dataToSearch: [];
  setSuggestionValue: Dispatch<SetStateAction<string | null>>;
}

//* Dispatch<SetStateAction<string>>;

function Search({ dataToSearch, setSuggestionValue }: IProps) {
  const [selected, setSelected] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const lowerCasedUsernames = dataToSearch?.map((user: User) =>
    user?.username?.toLowerCase()
  );

  const getSuggestions = (value: string): string[] => {
    return lowerCasedUsernames?.filter((usernames: string) =>
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
        onSuggestionSelected={(_, { suggestionValue }) => {
          setSuggestionValue(suggestionValue);
          setSelected("");
        }}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <span>{suggestion}</span>}
        inputProps={{
          placeholder: "🔍   Search friends by username",
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

module.exports.validateRegisterInput = (
  firstname,
  lastname,
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (firstname.trim() === '') {
    errors.firstname = 'Name field must not be empty';
  }
  if (lastname.trim() === '') {
    errors.lastname = 'Last name field must not be empty';
  }
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateTripInput = (
  destination,
  fromDate,
  toDate,
  expenses
) => {
  const errors = {};
  if (
    destination.formattedAddress.trim() === '' ||
    typeof destination === 'undefined'
  ) {
    errors.destination = 'Please enter a destination';
  }
  if (fromDate.trim() === '') {
    errors.fromDate = 'Please enter a valid date';
  }
  if (toDate.trim() === '') {
    errors.toDate = 'Please enter a valid date';
  }
  if (expenses.length) {
    expenses.map((expense, index) => {
      if (expense.type.trim() === '') {
        errors.expensestype = 'If you add expenses, these must include a type';
      }
      if (!expense.amount || expense.amount === 0) {
        errors.expensesamount =
          'If you add expenses, you must specify the amount';
      }
      if (expense.currency.trim() === '') {
        errors.expensescurrency =
          'If you add expenses, you must specify the currency';
      }
    });
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateFriendRequest = (friendFromId, friendTo) => {
  const errors = {};
  friendToRequests = friendTo.receivedFriendRequests;
  friendToFriends = friendTo.friends;

  for (let key in friendToRequests) {
    if (friendToRequests[key] == friendFromId) {
      errors.friendRequest = 'Friend request already sent';
    }
  }

  for (let key in friendToFriends) {
    if (friendToFriends[key] == friendFromId) {
      errors.friendRequest = 'You are already friends';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

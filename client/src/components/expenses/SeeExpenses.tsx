import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { Expense } from '../../Interfaces/Trip';

interface IProps {
  expenses: Expenses;
}

interface Expenses extends Array<Expense> {}

const SeeExpenses: FunctionComponent<IProps> = ({ expenses }) => {
  return (
    <div>
      {expenses.map((expense) => {
        return (
          <p>
            {expense.type} and {expense.amount}
            {expense.currency}
          </p>
        );
      })}
    </div>
  );
};

export default SeeExpenses;

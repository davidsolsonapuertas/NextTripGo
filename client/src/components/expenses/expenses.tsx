import React, { useState, Dispatch, SetStateAction } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import Expense from './expense';

interface IProps {
  expenses: expenses;
  setExpenses: Dispatch<SetStateAction<expenses>>;
  errors: any;
}

interface expenses {
  [index: number]: { type: string; price: number };
}

function Expenses({ expenses, setExpenses, errors }: IProps) {
  const [numberOfExpenses, setnumberOfExpenses]: any = useState(1);
  console.log(numberOfExpenses);

  let form: any = [];

  const expensesform = () => {
    for (let i = 0; i <= numberOfExpenses; i++) {
      return <Expense form={form} />;
    }
  };

  return (
    <div className="w-100 ">
      <p className="text-center">Expenses</p>
      <AddCircleIcon
        style={{ color: 'green' }}
        onClick={(e) => {
          setnumberOfExpenses(numberOfExpenses + 1);
        }}
        fontSize="large"
      />
      <RemoveCircleIcon
        style={{ color: 'red' }}
        onClick={(e) => {
          setnumberOfExpenses(numberOfExpenses - 1);
        }}
        fontSize="large"
      />
      {expensesform}
    </div>
  );
}

export default Expenses;

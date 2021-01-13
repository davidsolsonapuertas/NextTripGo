import React, { useState, Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import { currencies } from '../../assets/Currencies';
import ValidateAmount from './validateAmount';
import { Expense } from '../../Interfaces/Trip';

interface Expenses extends Array<Expense> {}

interface IProps {
  expenses: Expenses;
  setExpenses: Dispatch<SetStateAction<Expenses>>;
  errors: any;
}

function ExpensesComponent({ expenses, setExpenses, errors }: IProps) {
  const [amount, setAmount]: any = useState(['0']);

  const handleAddFields = () => {
    const values = [...expenses];
    values.push({ type: '', amount: 0, currency: '' });
    amount.push('0');
    setExpenses(values);
  };

  const handleRemoveFields = () => {
    const values = [...expenses];
    values.splice(-1, 1);
    amount.splice(-1, 1);
    setExpenses(values);
  };

  const handleInputChange = (index: number, e?: any) => {
    const values = [...expenses];
    if (e?.target.name === 'type') {
      values[index].type = e.target.value;
    } else if (e?.target.name === 'currency') {
      values[index].currency = e.target.value;
    }
    setExpenses(values);
  };

  console.log(errors);

  return (
    <div className="w-100">
      <p className="text-center mt-3">Expenses</p>
      <div className="d-flex justify-content-center">
        <Button
          className="m-3"
          variant="success"
          onClick={() => {
            handleAddFields();
          }}
        >
          <AddCircleIcon />
          &nbsp;&nbsp; Add expense
        </Button>
        <Button
          variant="danger"
          className="m-3"
          onClick={() => {
            handleRemoveFields();
          }}
        >
          <RemoveCircleIcon />
          &nbsp;&nbsp; Remove expense
        </Button>
      </div>
      {expenses.map((expense: Expense, index: number) => (
        <div
          key={index}
          className="d-flex my-4 justify-content-center input-group form-row "
        >
          <div className="col-md-5">
            <input
              type="text"
              placeholder="Type of expense"
              name="type"
              className={
                errors?.expensestype
                  ? 'form-control form-control-user errorRed'
                  : 'form-control form-control-user'
              }
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <ValidateAmount
            amount={amount}
            setAmount={setAmount}
            index={index}
            expenses={expenses}
            errors={errors}
          />
          <div className="input-group-prepend d-flex align-items-center">
            <select
              className={
                errors?.expensestype
                  ? 'custom-select rounded errorRed'
                  : 'custom-select rounded ml-2'
              }
              onChange={(event) => {
                handleInputChange(index, event);
              }}
              name="currency"
              id="inputGroupSelect01"
            >
              <option selected disabled>
                Currency...
              </option>
              {currencies &&
                Object.keys(currencies).map((currency, index) => {
                  return (
                    <option key={currency} value={currency}>
                      {currency}: {currencies[currency]}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-group-prepend"></div>
        </div>
      ))}
    </div>
  );
}

export default ExpensesComponent;

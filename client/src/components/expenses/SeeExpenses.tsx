import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import './Currency.css';
import { getRate } from '../../APIs/ConvertCurrency/ConvertCurrency';
import { variant, colors } from '../../assets/ColorPalette';
import { Expense } from '../../Interfaces/Trip';
import PieChart from './PieChart';

interface IProps {
  expenses: Expenses;
}

interface Expenses extends Array<Expense> {}

const SeeExpenses: FunctionComponent<IProps> = ({ expenses }) => {
  const [changedExpenses, setChangedExpenses]: any = useState(expenses);

  const currencies: string[] = [];
  for (let key in expenses) {
    if (currencies.indexOf(expenses[key].currency) === -1) {
      currencies.push(expenses[key].currency);
    }
  }

  const changeCurrency = async (currency: string) => {
    const Arr: any = [];
    for (let key in currencies) {
      const res = await getRate([currency, currencies[key]]);
      console.log(res);
      Arr.push(res);
    }
    console.log(Object.values(Arr[0]));
  };

  return (
    <div className="col-xl-4 col-lg-5">
      <div className="card shadow-hover shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Expenses</h6>
        </div>
        <div className="btn-group currency-buttons" role="group">
          <button type="button" className={'btn rounded-0 btn-link'}>
            Mixed
          </button>
          {currencies.length >= 0 &&
            currencies.map((currency, index) => {
              return (
                <button
                  onClick={() => changeCurrency(currency)}
                  type="button"
                  className={'btn rounded-0 ' + 'btn-' + variant[index]}
                >
                  {currency}
                </button>
              );
            })}
        </div>

        <div className="card-body">
          <div className="chart-pie pt-4 pb-2">
            <PieChart expenses={changedExpenses} />
          </div>
          <div className="mt-4 text-center small">
            {expenses.length > 0 &&
              expenses.map((expense, index) => {
                return (
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <span className="d-flex justify-content-between">
                      <FiberManualRecordIcon
                        className="mr-3"
                        style={{ color: `${colors[index]}` }}
                      />
                      {expense.type}
                      {expense.amount + ' '}
                      {expense.currency}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeExpenses;

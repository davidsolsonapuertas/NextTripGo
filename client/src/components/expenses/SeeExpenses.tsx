import React, { FunctionComponent, useState, useMemo } from 'react';
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
  const expensesCopy = expenses.map((el) => ({ ...el }));
  const [changedExpenses, setChangedExpenses]: any = useState(expensesCopy);
  const [totalExpenses, setTotalExpenses]: any = useState(0);

  const currencies: string[] = [];

  for (let key in expensesCopy) {
    if (currencies.indexOf(expensesCopy[key].currency) === -1) {
      currencies.push(expensesCopy[key].currency);
    }
  }

  const changeCurrency = async (currency: string) => {
    setTotalExpenses(0);
    for (let key in currencies) {
      const res = await getRate([currencies[key], currency]);

      setChangedExpenses((oldExpenses: Expense[]) => {
        if (oldExpenses[key].currency !== currency) {
          let exchRate = Object.values(res)[0];

          if (typeof exchRate === 'number')
            oldExpenses[key].amount =
              Math.round(expensesCopy[key].amount * exchRate * 100) / 100;
          oldExpenses[key].currency = currency;
        }
        return [...oldExpenses];
      });
    }

    for (let key in changedExpenses) {
      setTotalExpenses((oldTotalExpenses: number) => {
        return (oldTotalExpenses += changedExpenses[key].amount);
      });
    }
  };

  useMemo(() => {
    currencies && changeCurrency(currencies[0]);
  }, []);

  return (
    <div className="col-xl-4 col-lg-5">
      <div className="card shadow-hover shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Expenses</h6>
        </div>
        <div className="btn-group currency-buttons" role="group">
          {currencies.length >= 0 &&
            currencies.map((currency, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    changeCurrency(currency);
                  }}
                  type="button"
                  className={'btn rounded-0 ' + 'btn-' + variant[index]}
                >
                  {currency}
                </button>
              );
            })}
          {currencies.length > 1 && (
            <button
              type="button"
              onClick={() => {
                setChangedExpenses(expensesCopy);
                setTotalExpenses(0);
              }}
              className={'btn rounded-0 btn-link'}
            >
              Mixed
            </button>
          )}
        </div>

        <div className="card-body">
          {totalExpenses !== 0 && (
            <div className="chart-pie pt-4 pb-2">
              <PieChart expenses={changedExpenses} />
            </div>
          )}
          <div className="mt-4 text-center small">
            {changedExpenses.length > 0 &&
              changedExpenses.map((expense: Expense, index: number) => {
                return (
                  <div
                    key={index}
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-around"
                  >
                    <span className="d-flex w-100 justify-content-between">
                      <FiberManualRecordIcon
                        className="mr-3"
                        style={{ color: `${colors[index]}` }}
                      />
                      {expense.type + ' '}
                      <div>
                        {expense.amount + ' '}
                        {expense.currency}
                      </div>
                    </span>
                  </div>
                );
              })}
            {totalExpenses !== 0 && (
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-around">
                <span className="d-flex w-100 justify-content-between">
                  <FiberManualRecordIcon
                    className="mr-3"
                    style={{ color: `${colors[48]}` }}
                  />
                  Total expenses
                  <div>
                    {Math.round(totalExpenses * 100) / 100 + ' '}
                    {changedExpenses[0].currency}
                  </div>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeExpenses;

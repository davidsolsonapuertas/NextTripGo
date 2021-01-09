import React, { useState } from 'react';

import { currencies } from '../../APIs/currencies';

function Expense({ form }: any) {
  const [currency, setCurrency]: any = useState('-');
  return (
    <div>
      {form.push(
        <form>
          <div className="input-group form-row ">
            <div className="col-md-5">
              <input
                type="text"
                placeholder="Type of expense"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                className="form-control"
              />
            </div>
            <div className="input-group-prepend">
              <select
                className="custom-select"
                onChange={(e) => setCurrency(e.target.value)}
                id="inputGroupSelect01"
              >
                <option selected disabled>
                  Currency...
                </option>
                {currencies &&
                  Object.keys(currencies).map((currency, index) => {
                    return (
                      <option key={currency} value={index}>
                        {currency}
                      </option>
                    );
                  })}
              </select>
              <span className="input-group-text">
                {Object.values(currencies)[currency]}
              </span>
            </div>
            <div className="input-group-prepend"></div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Expense;

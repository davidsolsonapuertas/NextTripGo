import React from 'react';

function ValidateAmount({ amount, setAmount, index, expenses, errors }: any) {
  const formatNumber = (n: string) => {
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatCurrency = (index: any, n: string, blur?: any) => {
    if (n.indexOf('.') >= 0) {
      let decimal_pos = n.indexOf('.');

      let left_side = n.substring(0, decimal_pos);
      let right_side = n.substring(decimal_pos);

      left_side = formatNumber(left_side);
      right_side = formatNumber(right_side);

      if (blur === 'blur') {
        right_side += '00';
      }

      right_side = right_side.substring(0, 2);
      n = left_side + '.' + right_side;
    } else {
      n = formatNumber(n);

      if (blur === 'blur') {
        n += '.00';
      }
    }
    const oldAmount = [...amount];
    oldAmount[index] = n;
    setAmount(oldAmount);

    const values = [...expenses];
    values[index].amount = parseFloat(amount[index].split(',').join(''));
  };
  return (
    <div className="col-md-2">
      <input
        type="text"
        className={
          errors?.expensestype
            ? 'form-control form-control-user errorRed'
            : 'form-control form-control-user'
        }
        name="amount"
        value={amount[index] === '0' ? '' : amount[index]}
        id="currency-field"
        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
        data-type="currency"
        placeholder="Amount"
        onChange={(event) => {
          formatCurrency(index, event?.target.value);
        }}
        onBlur={(event) => formatCurrency(index, event?.target.value, 'blur')}
      ></input>
    </div>
  );
}

export default ValidateAmount;

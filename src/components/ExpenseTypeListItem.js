import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseTypeList = ({ id, description }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
    </div>
  </Link>
);

export default ExpenseTypeList;

import React from "react";

const EditExpensePage = props => {
  return <div>Editing expense with id of: {props.match.params.id}</div>;
};

export default EditExpensePage;

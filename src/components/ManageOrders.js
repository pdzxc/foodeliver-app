import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTransactions, updateTransactionStatus } from '../actions';

const ManageOrder = (props) => {
  useEffect(() => {
    props.fetchTransactions();
    // eslint-disable-next-line
  }, []);

  const renderList = () => {
    return props.transactions.map((t) => {
      return (
        <tr key={t.id}>
          <td>{t.id}</td>
          <td>{new Date(t.dateOrdered).toLocaleString()}</td>
          <td>
            <Link to={`/track-order/${t.id}`}>Link to Order</Link>
          </td>
          <td>
            <div className="ui buttons">
              <button
                onClick={() => props.updateTransactionStatus(t.id, 'preparing')}
                className={`ui red button ${
                  t.status === 'preparing' ? 'active' : ''
                }`}
              >
                Preparing
              </button>
              <button
                onClick={() =>
                  props.updateTransactionStatus(t.id, 'on-the-way')
                }
                className={`ui blue button ${
                  t.status === 'on-the-way' ? 'active' : ''
                }`}
              >
                On The Way
              </button>
              <button
                onClick={() => props.updateTransactionStatus(t.id, 'delivered')}
                className={`ui green button ${
                  t.status === 'delivered' ? 'active' : ''
                }`}
              >
                Delivered
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="ui container">
      <h1 className="ui header">Manage Orders</h1>
      <table className="ui striped table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date Ordered</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderList()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { transactions: Object.values(state.transactions) };
};

export default connect(mapStateToProps, {
  fetchTransactions,
  updateTransactionStatus,
})(ManageOrder);

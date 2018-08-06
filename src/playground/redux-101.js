import { createStore } from 'redux';

const incrementCount = ({ incBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incBy
});

const decrementCount = ({ decBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decBy
});

const setCount = ({ count = 0 } = {}) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});

// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

console.log('DEFAULT', store.getState());

store.subscribe(() => {
  console.log('ACTION', store.getState());
});

store.dispatch(incrementCount({ incBy: 2 }));

store.dispatch(incrementCount());

store.dispatch(decrementCount({ decBy: 5 }));

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decBy: 4 }));

store.dispatch(setCount({ count: 7 }));

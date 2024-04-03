import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => { dispatch(increment()); }}>+Increment</button>
      <span>{count}</span>
      <button onClick={() => { dispatch(decrement()); }}>-Decrement</button>
      <button onClick={() => { dispatch(incrementByAmount(10)); }}>-Inc</button>
    </div>
  );
}
export default Counter;
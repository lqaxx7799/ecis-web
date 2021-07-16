import { Button } from '@fluentui/react-northstar';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { authActions } from '../../store/authSlice';

const Home = () => {
  const { test } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [text, setText] = useState<string>(test);

  const onClick = () => {
    dispatch(authActions.updateTest(text));
  }

  return (
    <div>
      Hello, state in redux is: {test}
      <br />
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={onClick}>Change State in Redux</Button>
    </div>
  );
}

export default Home;

import React, { Fragment, useState, useEffect } from 'react';

function Counter (props) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    let mounted = true
    count > 0 && setTimeout(() => {
      if (mounted) {
        setCount(count - 1)
      }
    }, 1000);

    return function cleanup() {
      mounted = false
    }
  }, [count]);

  return (
    <Fragment>
      Recording: {count}...
    </Fragment>
  )
};

export default Counter;
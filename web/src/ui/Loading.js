import React from 'react';
import ReactLoading from 'react-loading';

export default ({ cover }) => {
  if (cover) {
    return <div style={{ position: 'fixed', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      <ReactLoading  type={'spinningBubbles'} color={'var(--panel-primary-color)'} height={'100px'} width={'100px'} />
    </div>
  }

  return <ReactLoading 
    type={'spinningBubbles'}
    color={'var(--panel-primary-color)'}
    height={'100px'}
    width={'100px'}
  />;
}
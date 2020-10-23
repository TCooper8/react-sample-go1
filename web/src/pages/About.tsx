import React from 'react';
import Page from '../components/Page';
import Text from '../ui/Text';

export default () => {
  return <Page>
    <Text large center bold capitalize>about</Text>
    <Text medium paragraph center>
      This page is a demo application for Go1.
    </Text>
  </Page>
}
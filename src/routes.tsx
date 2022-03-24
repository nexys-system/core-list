import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Public from './public';
import Layout from './layout/index';

import List from './examples/list';
import LayoutComponent from './examples/layout';
import View from './examples/view';
import Card from './examples/card';
import Form from './examples/form';
import { links } from './links';

const Routes = (): JSX.Element => (
  <Layout>
    <Switch>
      <Route path={links.list.link} component={List} />
      <Route path={links.layout.link} component={LayoutComponent} />
      <Route path={links.view.link} component={View} />
      <Route path={links.card.link} component={Card} />
      <Route path={links.form.link} component={Form} />
      <Route component={Public} />
    </Switch>
  </Layout>
);

export default Routes;

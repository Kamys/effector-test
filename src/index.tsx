import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Auth from 'src/components/Auth';

ReactDOM.render(
  <BrowserRouter>
    <Auth/>
  </BrowserRouter>
  , document.getElementById('root'));

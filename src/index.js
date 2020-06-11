import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './core/store/store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter forceRefresh={true}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();

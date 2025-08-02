import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styles from './App.css'
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // React.StrictMode 사용하면 useEffect 2번실행 됨
    // <React.StrictMode> 
    <Provider store={store}>
      <App />
    </Provider>
    // </React.StrictMode>
);

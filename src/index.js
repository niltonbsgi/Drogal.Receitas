import React from 'react';
import { Provider } from 'react-redux';
import './index.scss';
import { BrowserRouter } from "react-router-dom";
import CustomWebCam from './Camera/CustomWebCam';


import * as ReactDOMClient from 'react-dom/client';
const root = ReactDOMClient.createRoot(document.getElementById("app"));


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//       registration.update();
//       }).catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });        
//   });
// }


root.render(  
  <BrowserRouter>
    {/* <Provider store={Store}> */}
      <CustomWebCam/>
    {/* </Provider> */}
  </BrowserRouter>  
);
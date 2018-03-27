// import React, { Component } from 'react';

// import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Layout>
//           <BurgerBuilder />
//         </Layout>
//       </div>
//     );
//   }
// }

// export default App;

import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function app() {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
}

export default app;

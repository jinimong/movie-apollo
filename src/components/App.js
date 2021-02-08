import { HashRouter as Router, Route } from 'react-router-dom';
import { Reset } from 'styled-reset';
import Detail from '../routes/Detail';
import Home from '../routes/Home';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Reset />
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Detail} />
      </Router>
    </ApolloProvider>
  );
};

export default App;

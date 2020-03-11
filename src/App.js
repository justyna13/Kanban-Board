import React from 'react';
import '../src/styles/mainStyles.scss';
import NewCard from "./components/Card/NewCard";
import EditCard from "./components/Card/EditCard";
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import BoardContainer from "./components/Main/BoardContainer";

function App() {

  return (
    <div>

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={BoardContainer} />
                <Route path="/new" component={NewCard} />
                <Route path="/edit/:card_id" component={EditCard} />

            </Switch>

        </BrowserRouter>
    </div>
  );
}

export default App;

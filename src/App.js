import React from 'react';
import '../src/styles/mainStyles.scss';
import {createBrowserHistory} from 'history';
import {HashRouter} from "react-router-dom";

import BoardContainer from "./components/Main/BoardContainer";


function App() {

    return (
        <div>
            <HashRouter history={createBrowserHistory()}>
                <BoardContainer />
            </HashRouter>
        </div>
    )
}



export default App;

import React from 'react';
import '../src/styles/mainStyles.scss';
import {createBrowserHistory} from 'history';
import BoardContainer from "./components/Main/BoardContainer";
import Title from "./components/Main/Title";
import {HashRouter} from "react-router-dom";

function App() {
    return (
        <div>
            <HashRouter history={createBrowserHistory()}>

                <Title title="Kanban Board"/>
                <BoardContainer />

            </HashRouter>
        </div>
    )
}



export default App;

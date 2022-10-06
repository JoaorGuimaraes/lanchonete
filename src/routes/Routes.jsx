import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { AddFood } from "../Pages/AddFood";
import { AddTable } from "../Pages/AddTable";
import { Main } from "../components/Main";
import { Header } from "../components/Header";
import { Check } from "../Pages/Check";
export function Routes() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route component={Main} path="/" exact />
                <Route component={AddFood} path="/add-food" exact />
                <Route component={AddTable} path="/table" exact />
                <Route component={Check} path="/check" exact />
            </Switch>

        </BrowserRouter>
    )
}
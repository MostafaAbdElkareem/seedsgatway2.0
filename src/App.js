import React, { Component } from "react";
import Header from "./componenets/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Material from "./pages/Material";
import Home from "./pages/Home";
import Category from "./pages/Category";
import NoPage from "./pages/NoPage";
import "./App.scss";
import "../src/assets/style/themes.scss";
const comp = () => {
  return <div>compoenent</div>;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/category" component={Category} exact></Route>
          <Route path="/material" component={Material}></Route>
          <Route component={NoPage}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

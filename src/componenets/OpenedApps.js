import React, { Component } from "react";
import "../assets/style/openedApps.scss";
class OpenedApps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav class="menu">
        <input
          type="checkbox"
          href="#"
          class="menu-open"
          name="menu-open"
          id="menu-open"
        />
        <label class="menu-open-button" for="menu-open">
          <i title="Opened Apps" class="material-icons">
            open_in_browser
          </i>
        </label>

        <a href="#" class="menu-item blue">
          <img src={require(`../assets/images/definde_act.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item green">
          <img src={require(`../assets/images/experiments.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item red">
          <img src={require(`../assets/images/dashboard.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item purple">
          <img src={require(`../assets/images/reports.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item orange">
          <img src={require(`../assets/images/treatment.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item lightblue">
          <img src={require(`../assets/images/field_map.svg`)} alt="" />
        </a>
      </nav>
    );
  }
}

export default OpenedApps;

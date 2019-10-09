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

        <a href="#" class="menu-item blue md-trigger" data-modal="modal-2">
          <img src={require(`../assets/images/definde_act.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item green md-trigger" data-modal="modal-3">
          <img src={require(`../assets/images/experiments.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item red md-trigger" data-modal="modal-5">
          <img src={require(`../assets/images/dashboard.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item purple md-trigger" data-modal="modal-7">
          <img src={require(`../assets/images/reports.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item orange md-trigger" data-modal="modal-8">
          <img src={require(`../assets/images/treatment.svg`)} alt="" />
        </a>
        <a href="#" class="menu-item lightblue md-trigger" data-modal="modal-10">
          <img src={require(`../assets/images/field_map.svg`)} alt="" />
        </a>
      </nav>
    );
  }
}

export default OpenedApps;

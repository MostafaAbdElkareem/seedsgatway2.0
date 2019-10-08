import React, { Component } from "react";
import Card from "../componenets/Card";
import OpenedApps from "../componenets/OpenedApps";
import AppHolder from "../componenets/AppHolder";
import cardsData from "../data/cardData.json";
import SimpleStorage, { resetParentState } from "react-simple-storage";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      appCards: cardsData
    };
    this.initialState = this.state;
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 60) });
  }
  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let status = this.state.appCards.filter(st => {
      if (st.id == id) {
        st.category = cat;
      }
      return st;
    });
    this.setState({
      ...this.state.appCards,
      status
    });
    console.log(this.state.appCards);
  };
  ChangeCat(id) {
    if (this.state.appCards[id].category == "complete") {
      this.setState(state => ((state.appCards[id].category = "wip"), state));
    } else {
      this.setState(
        state => ((state.appCards[id].category = "complete"), state)
      );
    }
  }
  componentWillUnmount() {
    console.log("done");
  }
  render() {
    var status = {
      wip: [],
      complete: []
    };

    // console.log(this.state);
    /* app holder  */
    const Apps = this.state.appCards.map(appInfo => (
      <AppHolder appInfo={appInfo}></AppHolder>
    ));
    /*  */
    let searchedCards = this.state.appCards.filter(_card => {
      //console.log(this.state.search);
      //console.log(cardsData);
      return (
        _card.cardName.toLowerCase().indexOf(this.state.search) !== -1 ||
        _card.description.toLowerCase().indexOf(this.state.search) !== -1 ||
        _card.appCategory.toLowerCase().indexOf(this.state.search) !== -1
      );
    });
    /*  */ let showGrid,
      showMsg = "";
    searchedCards.forEach(card => {
      if (Object.keys(status.complete).length == 0) {
        showGrid = "hide-grid";
        showMsg = "show-msg";
      } else {
        showGrid = "show-grid";
        showMsg = "hide-msg";
      }
      status[card.category].push(
        <React.Fragment>
          <div className="grid__item">
            <div
              key={card.id}
              onDragStart={e => this.onDragStart(e, card.id)}
              draggable
              className="draggable "
            >
              <Card
                cardinfo={card}
                category={() => this.ChangeCat(card.id)}
              ></Card>
            </div>
          </div>
        </React.Fragment>
      );
    });

    return (
      <main>
        <SimpleStorage parent={this} />
        {Apps}
        <div className="container-drag color-change-2x">
          <nav role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
              <span class="fa fa-plus frame-link "></span>

              <ul id="menu">
                <div className="search-wrapper active">
                  <div className="input-holder">
                    <input
                      type="text"
                      value={(this, this.state.search)}
                      className="search-input"
                      name="focus"
                      required
                      placeholder="Type to search Apps"
                      onChange={this.updateSearch.bind(this)}
                    />
                  </div>
                </div>
                <div
                  className="wip grid"
                  onDragOver={e => this.onDragOver(e)}
                  onDrop={e => {
                    this.onDrop(e, "wip");
                  }}
                >
                  {status.wip}
                </div>
              </ul>
            </div>
          </nav>

          <div
            className="droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "complete")}
          >
            <h3 className="page-title">
              My Shortcuts{" "}
              <div className="filter">
                <select
                  className="filter-dropDown"
                  onChange={this.updateSearch.bind(this)}
                >
                  <option value="">Filter By Category</option>
                  <option value="planting location/field management">
                    Planting Location/Field Management
                  </option>
                  <option value="breeding and decision making">
                    Breeding and Decision Making
                  </option>
                  <option value="material inventory / quantity management">
                    Material Inventory / Quantity Management
                  </option>
                  <option value=" material identity and genealogy management">
                    Material Identity and genealogy Management
                  </option>
                  <option value="experiment execution">
                    Experiment Execution
                  </option>
                </select>
                <button
                  className="clear-all"
                  onClick={() => resetParentState(this, this.initialState)}
                >
                  Clear All my Shortcuts
                </button>
              </div>
            </h3>
            <span className="note" id={showMsg}>
              Start adding shortcuts to your Homepage by clicking the plus (+)
              icon on the top right and drag cards or click ( + ) in the card
              actions
            </span>
            <div className="grid" id={showGrid}>
              {status.complete}
            </div>
          </div>
        </div>{" "}
        <OpenedApps></OpenedApps>
      </main>
    );
  }
}

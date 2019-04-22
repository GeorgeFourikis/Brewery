import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class BeersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      data: null,
      page: 1,
      loading: true
    };
    this.fetchResults = this.fetchResults.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  async componentWillMount() {
      if(this.props.location.state.landing){
        console.log(this.props.location.state.landing)
        this.setState(this.props.location.state.landing)
      }else{
        await this.fetchResults(this.state.page);
      }
  }

  listClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    let myItem;
    let myId = e.currentTarget.getAttribute("beer-id");
    const myData = this.state.data;
    myData.forEach(ele => {
      if (ele.id === myId) {
        return (myItem = ele);
      }
    });
    console.log(myItem);
    console.log(myId);
  }

  prevPage() {
    if (this.state.page >= 2) {
      const page = this.state.page - 1;
      this.fetchResults(page);
    }
  }
  nextPage() {
    if (this.state.page < this.state.info.numberOfPages) {
      const page = this.state.page + 1;
      this.fetchResults(page);
    }
  }

  async fetchResults(page) {
    this.setState({ loading: true });
    const incomingPage = page;
    try {
      console.log(this.state.page);
      const results = await axios.get(
        `http://localhost:4000/beers?page=${page}`
      );
      console.log(results);
      const info = results.data.info;
      const data = results.data.data;
      //   const page = results.data.info.currentPage;
      this.setState({ info, data, page: incomingPage, loading: false });
    } catch (err) {
      return console.log(err);
    }
  }
  render() {
    const styles = {
      ul: {
        listStyleType: "none",
        margin: 0,
        padding: 0
      },
      li: {
        textDecoration: "none",
        fontSize: "1.2em",
        borderBottom: "1px solid #ccc"
      },
      button: {
        color: "white",
        textTransform: "uppercase",
        background: "#60a3bc",
        padding: "20px",
        borderRadius: "50px",
        display: "inline-block",
        border: "none"
      },
      hover: {
        textShadow: "0px 0px 6px rgba(255, 255, 255, 1)",
        transition: "all 0.4s ease 0s"
      }
    };
    const loading = this.state.loading;
    let list;
    let button;
    let pages;
    if (loading) {
      button = <h2>Loading...</h2>;
      list = <h2>Please wait While the beers are coming...</h2>;
    } else {
      pages = (
        <div>
          <p>
            <span>Current Page:</span> {this.state.page}
            <br />
            <span>Total Ammount of pages:</span> {this.state.info.numberOfPages}
          </p>
        </div>
      );
      button = (
        <div>
          <button style={styles.button} onClick={this.prevPage.bind(this)}>
            Previous Page
          </button>
          <button style={styles.button} onClick={this.nextPage.bind(this)}>
            Next Page
          </button>
        </div>
      );
      list = (
        <div>
          <ul style={styles.ul}>
            {this.state.data.map(item => {
              return (
                <li
                  onClick={this.listClicked.bind(this)}
                  style={styles.li}
                  key={item.id}
                  beer-id={item.id}
                >
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={{
                      pathname: "/beer",
                      state: { item, landing: this.state }
                    }}
                  >
                    <div>
                      <span>Name:</span>
                      {item.name} <span>ABV:</span>
                      {item.abv ? `${item.abv}` : "No ABV found"}
                    </div>
                    {item.labels ? (
                      <img src={item.labels.icon} alt="icon" />
                    ) : (
                      ""
                    )}
                    <p>
                      <span>IBU: </span>
                      {item.ibu ? `${item.ibu}` : "No IBU provided"}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    return (
      <div style={styles}>
        <h1>Beers</h1>
        {pages}
        {button}
        {list}
      </div>
    );
  }
}

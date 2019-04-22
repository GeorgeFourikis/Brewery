import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
      page: null,
      memory: null
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.location.state.item,
      loading: false,
      memory: this.props.location.state.landing
    });
  }

  render() {
    const styles = {
      button: {
        listStyleType: "none",
        color: "white",
        textTransform: "uppercase",
        background: "#60a3bc",
        padding: "20px",
        borderRadius: "50px",
        display: "inline-block",
        border: "none"
      }
    };
    let beer;
    if (this.state.loading) {
      beer = <h2>The beer is on the way...Please wait</h2>;
    } else {
      beer = (
        <div>
          {this.state.data.labels ? (
            <img src={this.state.data.labels.icon} alt="Icon" />
          ) : (
            <span>No Icon found</span>
          )}
          <h2>Name: {this.state.data.name}</h2>
          <h3>ABV: {this.state.data.abv}</h3>
          <h3>Status: {this.state.data.status}</h3>
          {this.state.data.ibu ? (
            <h3>IBU: {this.state.data.ibu}</h3>
          ) : (
            <span>No Ibu details</span>
          )}
          <h3>
            Organic Product: {this.state.data.isOrganic === "N" ? "No" : "Yes"}
          </h3>
          <div>
            {this.state.data.labels ? (
              <div>
                <img src={this.state.data.labels.large} alt="Icon" />
              </div>
            ) : (
              <span>No Image found</span>
            )}
          </div>
          <div>
            {this.state.data.glass ? (
              <div>
                <h2>Glass Details</h2>
                <h3>Glass Name: {this.state.data.glass.name}</h3>
              </div>
            ) : (
              <span>No Glass Details</span>
            )}
          </div>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/",
              state: { landing: this.state.memory }
            }}
          >
            <button style={styles.button}>Go Back</button>
          </Link>
        </div>
      );
    }
    return <div>{beer}</div>;
  }
}

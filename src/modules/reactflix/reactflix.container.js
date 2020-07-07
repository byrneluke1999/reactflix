import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AppBar } from "material-ui";

import * as movieActions from "./reactflix.actions";
import * as movieHelpers from "./reactflix.helpers";
import MovieList from "./movie-list/movie-list.component";

import * as scrollHelpers from "../common/scroll.helpers";

import { connect } from "react-redux";

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(1);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const { topMovies } = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getScrollDownPercentage(window);
      if (percentageScrolled > 0.8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.setState({ currentPage: nextPage });
      }
    }
  }
  render() {
    const { topMovies } = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);
    return (
      <div>
        <AppBar title="Movie Browser" />
        <Container>
          <Row>
            <p>Search will go here</p>
          </Row>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    topMovies: state.movieBrowser.topMovies,
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);

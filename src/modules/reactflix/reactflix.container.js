import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AppBar } from "material-ui";

import * as movieActions from "./reactflix.actions";
import * as movieHelpers from "./reactflix.helpers";
import MovieList from "./movie-list/movie-list.component";

import { connect } from "react-redux";

class MovieBrowser extends React.Component {
  componentDidMount() {
    this.props.getTopMovies(1);
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

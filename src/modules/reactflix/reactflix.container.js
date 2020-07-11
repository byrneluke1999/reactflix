import React from "react";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { AppBar } from "material-ui";
import * as movieActions from "./reactflix.actions";
import * as movieHelpers from "./reactflix.helpers";
import MovieList from "./movie-list/movie-list.component";
import * as scrollHelpers from "../common/scroll.helpers";
import MovieModal from "./movie-modal/movie-modal.container";

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: [],
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
        {/* Something is wrong with the details of a movie - clicking indiv movie doesn't render the movie card component. Work on it */}
        <MovieModal />
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

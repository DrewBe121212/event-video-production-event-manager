import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';
import {ApplicationBar} from './layout/ApplicationBar';
import {Routes} from '../routes';

const styles = () => ({
  root: {

  },
  container: {
    flexGrow: 1,
    marginTop: 70
  }

});

class ApplicationComponent extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
  };

  render () {

    return (
      <div className={this.props.classes.root}>
        <ApplicationBar handleDrawerToggle={this.props.handleDrawerToggle} />
        <div className={this.props.classes.container}>
          {this.props.navigation.drawer.open ? 'Yes': 'No'}
          {Routes}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleDrawerToggle: () => dispatch({ type: 'TOGGLE_DRAWER' })
});

const Application = withRouter(
  compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(ApplicationComponent)
);


export {Application};

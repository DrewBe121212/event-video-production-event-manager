import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';

const styles = (theme) => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create([
      'margin',
      'width'
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: theme.drawer.width,
    width: `calc(100% - ${theme.drawer.width}px)`,
    transition: theme.transitions.create([
      'margin',
      'width'
    ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerButton: {
    marginLeft: 12,
    marginRight: 20
  }
});

class ApplicationBar extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string,
    userProfile: PropTypes.object.isRequired,
    navigationDrawer: PropTypes.object.isRequired,
    handleToggleDrawer: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  openDrawer = () => {
    this.props.handleToggleDrawer(true);
  }

  handleUserMenuClick = () => {
    alert('popup user menu');
  }

  render() {
    const { title, userProfile, navigationDrawer, classes } = this.props;

    return (
      <AppBar className={classNames(classes.appBar, { [classes.appBarShift]: navigationDrawer.open })}>
        <Toolbar disableGutters={!navigationDrawer.open}>
          <IconButton disabled={!userProfile.loaded} onClick={this.openDrawer} className={classNames(classes.drawerButton, { hidden: navigationDrawer.open })} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(ApplicationBar);

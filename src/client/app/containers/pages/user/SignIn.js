import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';
import {CSSTransition} from 'react-transition-group';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';

import {setMenuTitle} from 'actions/navigation';
import {GuestSignInForm} from 'components/forms/user/GuestSignInForm';
import {withAuthorization} from 'libs/abilities';

const styles = (theme) => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class SignInComponent extends React.Component {

  static authorize = 'guest.sign_in';

  static propTypes = {
    classes: PropTypes.object.isRequired,
    hasAbility: PropTypes.func.isRequired,
    setMenuTitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    props.setMenuTitle('Account Login');

    this.state = {
      guestLogin: false,
      fadeIn: false
    };
  }

  resetFadeIn = () => {
    this.setState({
      fadeIn: false
    });
  }

  handleOptionClick = (type) => {
    switch(type) {

      case 'osu':
        alert('redirect to shiboleth');
        break;

      case 'guest_cancel':
        this.setState({
          guestLogin: false,
          fadeIn: true
        });
        break;

      case 'guest':
        this.setState({
          guestLogin: true,
          fadeIn: true
        });
        break;

    }

  }

  SignInOptions = () => {

    const {hasAbility} = this.props;

    let options = [];

    if (hasAbility('login', 'guest.sign_in.osu')) {
      options.push({
        key: 'osu',
        primary: 'OSU User Login',
        secondary: 'Ohio State University Login via Single Sign On',
        icon: <PersonOutlineIcon />
      });
    }

    if (hasAbility('login', 'guest.sign_in.guest')) {
      options.push({
        key: 'guest',
        primary: 'Guest Login',
        secondary: 'Sign in using a username and password that is not affiliated with OSU.',
        icon: <PersonOutlineIcon />
      });
    }

    if (options.length > 0) {
      return (
        <List>
          {options.map((option, index) => (
            <ListItem button divider={index < options.length-1} onClick={() => this.handleOptionClick(option.key)} key={option.key}>
              <ListItemAvatar>
                <Avatar>
                  {option.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={option.primary} secondary={option.secondary} />
              <ListItemSecondaryAction>
                <IconButton aria-label={option.primary}>
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      );
    } else {
      return 'No login options are available';
    }
  }

  render() {

    const {classes} = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={4}>
          <Paper className={classes.paper} >
            <CSSTransition in={this.state.fadeIn} classNames="fade" timeout={1000} exit={false} onEntered={this.resetFadeIn}>
              <div>
                {this.state.guestLogin ? <GuestSignInForm guestLogin={this.state.guestLogin} handleCancel={() => this.handleOptionClick('guest_cancel')} /> : this.SignInOptions()}
              </div>
            </CSSTransition>
          </Paper>
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setMenuTitle
};

const SignIn = compose(
  withAuthorization,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SignInComponent);

export {SignIn};

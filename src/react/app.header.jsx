import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoginComponent from './login.component';
import UserAvatar from './user-avatar.component';
import { toggleLeftNav } from '../actions/left-nav.actions';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
const AppBar = require('material-ui/lib/app-bar');
const IconButton = require('material-ui/lib/icon-button');
const Menu = require('material-ui/lib/svg-icons/navigation/menu');
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
const CircularProgress = require('material-ui/lib/circular-progress');

const AppHeaderComponent = ({ user, onToggleLeftNav, leftNavOpen, onAvatarClick }) => (
    <AppBar
        style={{ position: 'fixed' }}
        title={renderTitle(user)}
        iconElementLeft={<LeftIcon leftNavOpen={leftNavOpen} onToggleLeftNav={onToggleLeftNav} />}
        iconElementRight={<RightMenu user={user.account} isFetching={user.isFetching} onAvatarClick={onAvatarClick} />} />
);

function renderTitle(user) {
    // eslint-disable-next-line prefer-template
    return 'WebPurple' + (user.account && user.account._id ? ` | ${user.account.displayName}` : '');
}

const LeftIcon = ({ leftNavOpen, onToggleLeftNav }) => (
    <IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu />}</IconButton>
);

const RightMenu = ({ user, isFetching, onAvatarClick }) => (
    user && user._id ? <UserAvatar user={user} onTouchTap={onAvatarClick} />
        : isFetching ? <CircularProgress color="#fff" size={0.5} />
            : <LoginComponent />
);

const AppHeaderContainer = connect(
    state => Object.assign({}, { user: state.user }, { leftNavOpen: state.leftNav.leftNavOpen }),
    dispatch => ({
        onToggleLeftNav: () => dispatch(toggleLeftNav()),
        onAvatarClick: () => dispatch(push('/settings')),
    })
)(AppHeaderComponent);

export default AppHeaderContainer;

import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import MenuWithAvatar from './MenuWithAvatar';

import { styleToolbar } from './SharedStyles';

const optionsMenu = [
  {
    text: 'Got question?',
    href: 'mailto:lamphere.danny1@gmail.com',
  },
  {
    text: 'Log out',
    href: '/logout',
    anchor: true,
  },
];

const propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

const defaultProps = {
  user: null,
};

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item xs={5} style={{ textAlign: 'left' }}>
            <Link href="/">
              <img src="https://i.imgur.com/iP0AHZC.png" alt="Tweeter logo" />
            </Link>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'center' }}>
            <h1>TWEETER</h1>
          </Grid>
          <Grid item xs={5} style={{ textAlign: 'right' }}>
            {user ? (
              <div style={{ whiteSpace: 'nowrap' }}>
                {user.avatarUrl ? (
                  <MenuWithAvatar
                    options={optionsMenu}
                    src={user.avatarUrl}
                    alt={user.displayName}
                  />
                ) : null}
              </div>
            ) : (
              <Link href="/login">
                <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;

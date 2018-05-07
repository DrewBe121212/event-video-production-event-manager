import { createReducer } from 'utils/redux';
import {
  TOGGLE_DRAWER,
  TOGGLE_DRAWER_MENU,
  SET_APP_LOADING,
  SET_MENU_TITLE,
  SET_MENU_ACTIVE
} from 'constants/navigation';

const mapMenuLinks = (links, position = [], title = []) => {
  let mapping = {};

  links.forEach((link, index) => {
    const linkIndex = [...position, index];
    link.position = [...linkIndex];
    link.active = [...linkIndex];
    link.full_title = [...title];

    link.full_title.push(link.title);

    if (link.url) {
      mapping[link.url] = linkIndex;
    }

    if (link.activeParent) {
      link.active.splice(-1, link.activeParent);
    }

    if (link.nested_links) {
      mapping = Object.assign(mapping, mapMenuLinks(link.nested_links, linkIndex, link.full_title));
    }

  });

  return mapping;
}

const initialState = {
  menu: {
    title: null,
    active: [],
    links: [
      {
        title: 'Daily Schedule',
        url: '/',
        icon: 'Schedule',
        can: {
          perform: 'view',
          on: 'daily_schedule'
        }
      },
      {
        title: 'Account Login',
        url: '/user/sign-in',
        icon: 'PersonOutline',
        can: {
          perform: 'new',
          on: 'session'
        },
      },
      {
        title: 'Administration',
        icon: 'Settings',
        nested_links: [
          {
            title: 'Accounts',
            url: '/admin/accounts',
            icon: 'PeopleOutline',
            can: {
              perform: 'view',
              on: 'daily_schedule'
            },
            nested_links: [
              {
                title: 'New',
                url: '/admin/accounts/new',
                can: {
                  perform: 'view',
                  on: 'daily_schedule'
                },
                activeParent: 1
              },
              {
                title: 'Edit',
                url: '/admin/accounts/edit/:id',
                can: {
                  perform: 'view',
                  on: 'daily_schedule'
                },
                activeParent: 1
              }
            ]
          }
        ]
      }
    ],
    links_mapping: []
  },
  drawer: {
    open: false,
    openMenus: []
  },
  loader: {
    active: 0,
    loading: false
  }
};

initialState.menu.links_mapping = mapMenuLinks(initialState.menu.links);

export const navigationReducer = createReducer(initialState, {
  [TOGGLE_DRAWER]: (state, payload) => {
    let open = state.drawer.open;

    if (typeof payload === 'boolean') {
      open = payload ? true : false;
    } else {
      open = state.drawer.open ? false : true;
    }

    return {
      ...state,
      drawer: Object.assign({}, state.drawer, {
        open
      })
    };
  },
  [TOGGLE_DRAWER_MENU]: (state, payload) => {
    let openMenus = state.drawer.openMenus.concat();
    const currentMenuIndex = openMenus.indexOf(payload.menu);
    const currentlyOpen = currentMenuIndex >= 0;

    let open;
    
    if (typeof payload.open === 'boolean') {
      open = payload.open ? true : false;
    } else {
      open = currentlyOpen ? false : true;
    }

    if (open && !currentlyOpen) {
      openMenus.push(payload.menu);
    } else if (!open && currentlyOpen) {
      openMenus.splice(payload.currentMenuIndex, 1);
    }

    return {
      ...state,
      drawer: Object.assign({}, state.drawer, {
        openMenus,
      })
    };
  },
  [SET_APP_LOADING]: (state, payload) => {
    const count = state.loader.active + (payload ? +1 : -1);

    return Object.assign({}, state, {
      loader: {
        active: count,
        loading: count > 0
      }
    });
  },
  [SET_MENU_TITLE]: (state, title) => ({
    ...state,
    menu: Object.assign({}, state.menu, {
      title
    })
  }),
  [SET_MENU_ACTIVE]: (state, active) => ({
    ...state,
    menu: Object.assign({}, state.menu, {
      active
    })
  })
});

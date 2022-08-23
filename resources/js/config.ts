import {
  AccountLoggedOut,
  ErrorPage,
  FourOhFour,
  Default,
  InstallationSuccess,
  WelcomeNewUser,
  Dashboard,
  StoresList,
  BlockCreate,
  BlockEdit
} from './pages';

export const routes = [
  {path: '/', component: Default},
  {path: '/account/loggedout', component: AccountLoggedOut},
  {path: '/error', component: ErrorPage},
  {path: '/stores', component: StoresList},
  {path: '/stores/:store_hash', component: Dashboard},
  {path: '/stores/:store_hash/blocks/create', component: BlockCreate},
  {path: '/stores/:store_hash/blocks/:block_id', component: BlockEdit},
  {path: '/stores/:store_hash/installed', component: InstallationSuccess},
  {path: '/stores/:store_hash/welcome', component: WelcomeNewUser},
  {path: '/stores/:store_hash/*', component: FourOhFour},
  {path: '*', component: FourOhFour},
];

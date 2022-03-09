import { Global } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import global from '@/styles/global';
import { getCookie } from '@/apis/token';
import {
  AlarmPage,
  EditMyInfoPage,
  SigninPage,
  MainPage,
  PostDetailsPage,
  ResetPasswordPage,
  SearchPage,
  SettingPage,
  SignupPage,
  UserPostsPage,
  WritePostPage,
  NotFoundPage,
  EditPostPage,
} from './Pages';

function App() {
  const isAuthenticated = !!getCookie('Authorization');

  return (
    <BrowserRouter>
      <Global styles={global} />
      <Switch>
        <Route exact path="/alarm">
          {isAuthenticated ? (
            <AlarmPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/alarm',
                },
              }}
            />
          )}
        </Route>
        <Route exact path="/edit/password">
          {isAuthenticated ? (
            <ResetPasswordPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/edit/password',
                },
              }}
            />
          )}
        </Route>
        <Route exact path="/edit/info">
          {isAuthenticated ? (
            <EditMyInfoPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/edit/info',
                },
              }}
            />
          )}
        </Route>
        <Route exact path="/edit/:postId">
          {isAuthenticated ? <EditPostPage /> : <Redirect to="/signin" />}
        </Route>
        <Route exact path="/signin">
          <SigninPage />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/post/:postId">
          <PostDetailsPage />
        </Route>
        <Route exact path={['/search', '/search/:keyword']}>
          <SearchPage />
        </Route>
        <Route exact path="/setting">
          {isAuthenticated ? (
            <SettingPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/setting',
                },
              }}
            />
          )}
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/posts/:userId">
          <UserPostsPage />
        </Route>
        <Route exact path="/write">
          {isAuthenticated ? (
            <WritePostPage />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: '/write',
                },
              }}
            />
          )}
        </Route>
        <Route exact path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;

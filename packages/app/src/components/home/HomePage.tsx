import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Page, Content, InfoCard } from '@backstage/core-components';
import {
  HomePageCompanyLogo,
  HomePageToolkit,
} from '@backstage/plugin-home';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 32,
  },
});

export const HomePage = () => {
  const classes = useStyles();

  return (
    <Page themeId="home">
      <Content>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <HomePageCompanyLogo className={classes.container} />
          </Grid>

          <Grid item>
            <InfoCard title="Welcome to Backstage" divider>
              <p>
                This is your Backstage instance home page. You can customize
                it to show links, widgets, or any other content your team
                finds useful.
              </p>
            </InfoCard>
          </Grid>

          <Grid item>
            <HomePageToolkit
              tools={[
                { url: '/catalog', label: 'Docs', icon: <span>📘</span> },
                { url: '/settings', label: 'Settings', icon: <span>⚙️</span> },
                { url: '/api-docs', label: 'API Docs', icon: <span>📊</span> },
              ]}
            />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

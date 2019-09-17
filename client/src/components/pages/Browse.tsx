import React, { Component } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { ContentInt } from '../../react-app-env'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      gridRowGap: '2px',
      gridColGap: '2px',
    },
  }),
);

const Browse = props => {
   const classes = useStyles();
    return (
      <div className={classes.root} id="browseContainer">
        <GridList cellHeight={160} cols={3}>
          {props.artworks.map(work => (
            <GridListTile key={work.id} cols={1} className="tile">
              <img src={work.url} alt={work.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
}

export default Browse

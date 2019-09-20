import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';

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
          {props.artworks.map((work) => (
            <GridListTile cols={1} className="tile">
              <img src={work} alt={work} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
}

export default Browse;

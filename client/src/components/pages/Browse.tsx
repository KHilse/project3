import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexWrap: "wrap",
      gridColGap: "2px",
      gridRowGap: "2px",
      justifyContent: "space-around",
      overflow: "hidden",
    },
  }),
);

const Browse = props => {
   const classes = useStyles();
    return (
      <div className={classes.root} id="browseContainer">
        <GridList cellHeight={160} cols={3}>
          {props.artworks.map((work, i) => (
            <GridListTile key={i} cols={1} className="tile">
              <img src={work} alt={work} />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default Browse;

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

interface IBrowseProps {
  artworks: any[];
  refreshArtworks();
}

const Browse = (props: IBrowseProps) => {
  const classes = useStyles();
  const artworks =  props.artworks.map((work) => {
    return (
      <GridListTile key={work.id} cols={1} className="tile">
        <img src={work.url} alt={work.title} />
      </GridListTile>
    );
  });

  return (
    <div className={classes.root} id="browseContainer">
      <GridList cellHeight={160} cols={3}>
        {artworks}
      </GridList>
    </div>
  );
}

export default Browse;

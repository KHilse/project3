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
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }),
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const Browse = props => {
   const classes = useStyles();
    return (
      <h1>hey bb</h1>
      // <div className={classes.root}>
      //   <GridList cellHeight={160} className={classes.gridList} cols={3}>
      //     {this.props.artworks.map(tile => (
      //       <GridListTile key={tile.img} cols={tile.cols || 1}>
      //         <img src={tile.img} alt={tile.title} />
      //       </GridListTile>
      //     ))}
      //   </GridList>
      // </div>
    );
}

export default Browse

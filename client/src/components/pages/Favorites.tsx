import React from 'react'
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor:' #F9F9F9',
      gridRowGap: '2px',
      gridColGap: '2px',
    },
  }),
);



const Favorites = props => {
  let tiles;
  const classes = useStyles()
    if (props.savedPics) {
       tiles = props.savedPics.map((favorite: string, i : number) => {
        return (<GridListTile key={i} cols={1} className='tile'>
          <img src={favorite} alt='Tattoo' />
        </GridListTile>)
      })
    }

  return (
      <div className={classes.root} id="browseContainer">
        <GridList cellHeight={200} cols={2}>
        {tiles}
        </GridList>
      </div>
  )
}

export default Favorites

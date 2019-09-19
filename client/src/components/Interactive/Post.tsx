import React from "react";
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import { userInfo } from "os";
import { appendFile } from "fs";
import App from "../../App";
import { getThemeProps } from "@material-ui/styles";

interface IPostProps {
  id: string;
  handlePostFavorite(e: any): void;
  isFavorite: boolean;
  mediaType: string;
  mediaUrl: string;
}

const Post = (props: IPostProps) => {
  let media;
  if (props.mediaType === "IMAGE") {
    media = <img src={props.mediaUrl} />;

  } else if (props.mediaType === "VIDEO") {
    media = <video>
              <source src={props.mediaUrl} />
            </video>;
  }

  let favoriteIcon: string;
  if (props.isFavorite) {
    favoriteIcon = mdiHeartOutline;
  } else {
    favoriteIcon = mdiHeart;
  }

  return(
    <div id={props.id}>
      {media}
      <img src={favoriteIcon} onClick={props.handlePostFavorite} alt="favorite" />
    </div>
  );
};

export default Post;

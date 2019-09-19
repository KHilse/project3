import React from "react";

interface IPostProps {
  id: string;
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
  return(
    <div id={props.id}>
      {media}
    </div>
  );
};

export default Post;

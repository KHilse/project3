import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";
import express, { Application, Request, Response, Router } from "express";
import { IPost } from "../../../../interfaces/modelInterfaces";
import { User } from "../../models";

const router: Router = express.Router();

const BASE_URL = "https://graph.facebook.com/v4.0/";
const at = "EAAHEmPLN9ZAYBAMRz4LsN3jbT43HWFSKR83Cp2a5BmAzxgO23587jKLLsZA3qmHMZBe4dQITzXIeSNp7FZAtmi90cHSrLN8ZCMpV8FupWWSqxlrhgrkTsXXJoiL9uZC1AhGmthAIpbyp2ZC6FsnVYf329OpyqJnEmDMiZB4GAm3MkSYP4JH25Tp3WVOVo9NEZAZBsZAVYJymU6DYJEFmdhWjcPIjsn9VFoyV9o4pOO3bjUJpnSFIkN6SQBHilMwkCVTARwZD";
const instaID = "17841420481036644";

const errorCatch = (err: AxiosError, message: string) => {
  console.log(message, err);
};

const getInstagramPost = (id: string, accessToken: string): Promise<{}> => {
 return axios.get(BASE_URL + id + "?fields=id,media_type,media_url,timestamp&access_token=" + accessToken)
  .then((response: AxiosResponse) => {
      return response.data;
  })
  .catch((err) => {
      errorCatch(err, "Error gettting media metadata");
  });
};

const getAllInstagramPosts = async (req: Request, res: Response) => {
  const postsArray: IPost[] = [];
  const postIdList: any[] = await axios.get(BASE_URL + instaID + "/media?access_token=" + accessToken)
    .then((response: AxiosResponse) => {
      return response.data.data;
    })
    .catch((err: AxiosError) => {
      errorCatch(err, "Error with media list get");
    });
  axios.all(postIdList.map((post: { id: string }) => {
    return axios.get(BASE_URL +
      post.id +
      "?fields=id,media_type,media_url,timestamp&access_token=" +
      accessToken)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((err) => {
        errorCatch(err, "Error gettting media metadata");
      });
  }))
    .then(axios.spread((...posts) => {
      for (const post of posts) {
        postsArray.push(post);
      }
    })).then(() => {
      res.send({ message: postsArray });
    });
};

const getOneInstagramPost = (req: Request, res: Response) => {

};

router.get("/", getAllInstagramPosts);
router.get("/:id", getOneInstagramPost);

export default router;

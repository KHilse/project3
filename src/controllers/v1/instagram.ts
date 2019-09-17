import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import { sha256 } from "js-sha256";
import { User } from "../../models";

const router: Router = express.Router();
dotenv.config();

const BASE_URL = "https://graph.facebook.com/v4.0/";

const errorCatch = (err: AxiosError, message: string) => {
  // tslint:disable-next-line: no-console
  console.log(message, err);
};

const getAppSecretProof = (accessToken: string, appSecret: string): string => {
  return sha256.hmac(appSecret, accessToken);
};
// In Progress, Making code DRY
// const getAPIParams = async (id): Promise<T> => {
//   const params = await User.findById(id)
//   .then( (userDoc) => {
//     const accessToken = userDoc.vendor.decryptAccessToken();
//     const appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
//     const instagramIDPage = userDoc.vendor.instagramIDPage;
//     return { accessToken, appSecretProof, instagramIDPage};
//   })
//   .catch( (err: AxiosError) => {
//     errorCatch(err, "Error getting User");
//   });
// };

// In Progress, Making code DRY
// const getInstagramPostMediaData = (url: string): Promise<{}> =>{
//  return axios.get(url)
//   .then((response: AxiosResponse) => {
//       return response.data;
//   })
//   .catch((err) => {
//     errorCatch(err, "Error gettting media metadata");
//   });
// };

const getAllInstagramPosts = async (req: Request, res: Response) => {
  let accessToken: string = "";
  let appSecretProof: string = "";
  let instagramIDPage: string = "";
  User.findById(req.params.id)
  .then( (userDoc) => {
    if (userDoc) {
      accessToken = userDoc.vendor.decryptToken();
      if (process.env.APP_SECRET) {
        appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
      }
      instagramIDPage = userDoc.vendor.instagramIdPage;
    }
  })
  .catch( (err: AxiosError) => {
    errorCatch(err, "Error getting User");
  });
  const postsArray: any[] = [];
  // tslint:disable-next-line: max-line-length
  const mediaListURL = BASE_URL + instagramIDPage  + "/media?access_token=" + accessToken + "&appsecret_proof=" + appSecretProof;
  const postIdList: any[] = await axios.get(mediaListURL)
  .then((response: AxiosResponse) => {
    return response.data.data;
  })
  .catch((err: AxiosError) => {
    errorCatch(err, "Error with media list get");
  });
  axios.all(
    postIdList.map((post: { id: string }) => {
      // tslint:disable-next-line: max-line-length
      const mediaDataURL = BASE_URL + post.id + "?fields=id,media_type,media_url,timestamp&access_token=" + accessToken +  "&appsecret_proof=" + appSecretProof;
      axios.get(mediaDataURL)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((err) => {
        errorCatch(err, "Error gettting media metadata");
      });
    }),
  )
  .then(axios.spread((...posts) => {
    for (const post of posts) {
      postsArray.push(post);
    }
  }))
  .then(() => {
    res.send({ message: postsArray });
  })
  .catch((err: AxiosError) => {
    errorCatch(err, "Error resolving media metadata promises");
  });
};

const getOneInstagramPost = async (req: Request, res: Response) => {
  let accessToken: string  = "";
  let appSecretProof: string = "";

  await User.findById(req.params.id)
  .then( (userDoc) => {
    if (userDoc) {
      accessToken = userDoc.vendor.decryptToken();
      if (process.env.APP_SECRET) {
        appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
      }
    }
  })
  .catch( (err: AxiosError) => {
    errorCatch(err, "Error getting User");
  });
  axios.get(BASE_URL + req.params.id + "?fields=id,media_type,media_url,timestamp&access_token=" + accessToken + "&appsecret_proof=" + appSecretProof)
  .then((response: AxiosResponse) => {
      return response.data;
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    errorCatch(err, "Error gettting media metadata");
  });
};

router.get("/", getAllInstagramPosts);
router.get("/:id", getOneInstagramPost);

export default router;

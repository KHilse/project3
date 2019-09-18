import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import { sha256 } from "js-sha256";
import { IUserModel } from "../../../interfaces/modelInterfaces";
import { User } from "../../models";

const router: Router = express.Router();
dotenv.config();

const BASE_URL = "https://graph.facebook.com/v4.0/";
let accessToken = "EAAHEmPLN9ZAYBAOcRwkjt9gZCELQBqVimYmqhasrBbE4Tm4WFeVIZAZABdU1aZABJdmNyuJ9iyGrMopdDeCZCNlaUjbUUqXYV7bVUi4szAAmlqzbZAMlokBNu9OtW8nwqm9yHnsE3D2baGf6MfGPR2joemGjMLp2ZAUBqWTdpX7Bbmq1zovZBTufM";

const errorCatch = (err: AxiosError, message: string) => {
  console.log(message, err);
};

const getAppSecretProof = (token: string, appSecret: string): string => {
  return sha256.hmac(appSecret, token);
};

const getAccountMediaIds = async (user, callback) => {

  return await axios.get(BASE_URL +
                         user.vendor.instagramIdPage +
                         "/media?access_token=" +
                         user.vendor.instagramAccessToken)
    .then((response) => {
      callback(response);
    })
    .catch((err) => {
      console.log(err, "Error getting media ids");
    });
};

const makeApiCall = async (url: string, errorMessage: string, callback) => {
  return  await axios.get(url)
  .then((response) => {
    return callback(response);
  })
  .catch((err) => {
    console.log(errorMessage, err);
  });
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
  const user = await User.findById(req.params.id)
    .then((userDoc) => {
      return userDoc;
    })
    .catch((err: AxiosError) => {
      errorCatch(err, "Error getting User");
    });
  let accessToken: string = "";
  let appSecretProof: string = "";
  let instagramIDPage: string = "";
  if (user) {
    accessToken = "EAAHEmPLN9ZAYBAJ1cWCVZB9116uCHHWW0bzdTMFzdL8SPTTcFu8xj7RkK7ZCqKleIJbZBNcN7dgrrndyH6ndYV123X7kOSTfq3jZBPSWof9RRcTbPTRALHmZBeITxU9jq3CYrx6Kw3ikZBQRZCGl2T7zzZBDhvZC7aKZAoPqkRZCKbL77ZAIogDoNq39BGGb9fMoGCxqdXCMkcZAIaRkvTpRyPf2uftIVfOU0e6m7TtiXZA63hm77tNMxaQ9Hn0TBpCgW2je8AZD";
    if (process.env.APP_SECRET) {
      appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
    }
    instagramIDPage = user.vendor.instagramIdPage;
  }
  const postsArray: any[] = [];
  // tslint:disable-next-line: max-line-length
  const mediaListURL = BASE_URL + instagramIDPage + "/media?access_token=" + accessToken;
  const postIdList: any[] = await axios.get(mediaListURL)
    .then((response: AxiosResponse) => {
      return response.data.data;
    })
    .catch((err: AxiosError) => {
      errorCatch(err, "Error with media list get");
    });
  const postPromises = postIdList.map(async (post: { id: string }) => {
    // tslint:disable-next-line: max-line-length
    const mediaDataURL = BASE_URL + post.id + "?fields=id,media_type,media_url,timestamp&access_token=" + accessToken + "&appsecret_proof=" + appSecretProof;
    return await axios.get(mediaDataURL)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((err) => {
        errorCatch(err, "Error gettting media metadata");
      });
  });
  axios.all(postPromises)
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
  const user = await User.findById(req.params.userId)
    .then((userDoc) => {
      return userDoc;
    })
    .catch((err: AxiosError) => {
      errorCatch(err, "Error getting User");
    });
  let appSecretProof: string = "";
  if (user) {
    if (process.env.APP_SECRET) {
      appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
    }
  }
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

const getFrontpageInstagramPosts = async (req: Request, res: Response) => {
  const users: IUserModel[] = await User.find({ vendor: { $exists: true }});
  const postIdList = await Promise.all(users.map(async (user) => {
    if (user) {
      if (accessToken) {
        user.vendor.instagramAccessToken = accessToken;
      }
      if (process.env.APP_SECRET) {
        user.vendor.appSecretProof = getAppSecretProof(user.vendor.instagramAccessToken, process.env.APP_SECRET);
      }
      // tslint:disable-next-line: max-line-length
      const mediaIdUrl = BASE_URL + user.vendor.instagramIdPage + "/media?access_token=" + user.vendor.instagramAccessToken;
      const postId = await makeApiCall(mediaIdUrl, "Error getting Media id", (response) => {
        return response.data.data[0].id;
      });
      return {
        accessToken: user.vendor.instagramAccessToken,
        appSecretProof: user.vendor.appSecretProof,
        postId,
      };
    }
  }));
  const postPromises = postIdList.map( async (post) => {
    if (post) {
      const mediaDataURL = BASE_URL + post.postId + "?fields=id,media_type,media_url,timestamp&access_token=" +
                          post.accessToken + "&appsecret_proof=" + post.appSecretProof;
      return makeApiCall(mediaDataURL, "Error getting Media data", (response) => response.data );
    }
  });
  const postsArray: any[] = [];
  axios.all(postPromises)
  .then(axios.spread((...posts) => {
    for (const post of posts) {
      postsArray.push(post);
    }
  }))
  .then(() => {
    res.send({message: postsArray });
  })
  .catch((err) => {
    errorCatch(err, "Error resolving media metadata promises");
  });
};

router.get("/user/:userId", getAllInstagramPosts);
router.get("/user/:userId/:id", getOneInstagramPost);
router.get("/frontpage", getFrontpageInstagramPosts);

export default router;

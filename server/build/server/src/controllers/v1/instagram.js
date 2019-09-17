"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const js_sha256_1 = require("js-sha256");
const models_1 = require("../../models");
const router = express_1.default.Router();
dotenv_1.default.config();
const BASE_URL = "https://graph.facebook.com/v4.0/";
const errorCatch = (err, message) => {
    console.log(message, err);
};
const getAppSecretProof = (accessToken, appSecret) => {
    return js_sha256_1.sha256.hmac(appSecret, accessToken);
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
const getAllInstagramPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken = "";
    let appSecretProof = "";
    let instagramIDPage = "";
    models_1.User.findById(req.params.id)
        .then((userDoc) => {
        accessToken = userDoc.vendor.decryptAccessToken();
        appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
        instagramIDPage = userDoc.vendor.instagramIDPage;
    })
        .catch((err) => {
        errorCatch(err, "Error getting User");
    });
    const postsArray = [];
    // tslint:disable-next-line: max-line-length
    const mediaListURL = BASE_URL + instagramIDPage + "/media?access_token=" + accessToken + "&appsecret_proof=" + appSecretProof;
    const postIdList = yield axios_1.default.get(mediaListURL)
        .then((response) => {
        return response.data.data;
    })
        .catch((err) => {
        errorCatch(err, "Error with media list get");
    });
    axios_1.default.all(postIdList.map((post) => {
        // tslint:disable-next-line: max-line-length
        const mediaDataURL = BASE_URL + post.id + "?fields=id,media_type,media_url,timestamp&access_token=" + accessToken + "&appsecret_proof=" + appSecretProof;
        axios_1.default.get(mediaDataURL)
            .then((response) => {
            return response.data;
        })
            .catch((err) => {
            errorCatch(err, "Error gettting media metadata");
        });
    }))
        .then(axios_1.default.spread((...posts) => {
        for (const post of posts) {
            // Need to specify post Type
            postsArray.push(post);
        }
    }))
        .then(() => {
        res.send({ message: postsArray });
    })
        .catch((err) => {
        errorCatch(err, "Error resolving media metadata promises");
    });
});
const getOneInstagramPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken = "";
    let appSecretProof = "";
    yield models_1.User.findById(req.params.id)
        .then((userDoc) => {
        accessToken = userDoc.vendor.decryptAccessToken();
        appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
    })
        .catch((err) => {
        errorCatch(err, "Error getting User");
    });
    axios_1.default.get(BASE_URL + req.params.id + "?fields=id,media_type,media_url,timestamp&access_token=" + accessToken + "&appsecret_proof=" + appSecretProof)
        .then((response) => {
        return response.data;
    })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        errorCatch(err, "Error gettting media metadata");
    });
});
router.get("/", getAllInstagramPosts);
router.get("/:id", getOneInstagramPost);
exports.default = router;

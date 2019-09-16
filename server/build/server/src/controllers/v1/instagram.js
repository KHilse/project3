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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const BASE_URL = "https://graph.facebook.com/v4.0/";
const accessToken = "EAAHEmPLN9ZAYBAMRz4LsN3jbT43HWFSKR83Cp2a5BmAzxgO23587jKLLsZA3qmHMZBe4dQITzXIeSNp7FZAtmi90cHSrLN8ZCMpV8FupWWSqxlrhgrkTsXXJoiL9uZC1AhGmthAIpbyp2ZC6FsnVYf329OpyqJnEmDMiZB4GAm3MkSYP4JH25Tp3WVOVo9NEZAZBsZAVYJymU6DYJEFmdhWjcPIjsn9VFoyV9o4pOO3bjUJpnSFIkN6SQBHilMwkCVTARwZD";
const instaID = "17841420481036644";
const errorCatch = (err, message) => {
    console.log(message, err);
};
const getAllInstagramPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postsArray = [];
    const postIdList = yield axios_1.default.get(BASE_URL + instaID + "/media?access_token=" + accessToken)
        .then((response) => {
        return response.data.data;
    })
        .catch((err) => {
        errorCatch(err, "Error with media list get");
    });
    axios_1.default.all(postIdList.map((post) => {
        // tslint:disable-next-line: max-line-length
        return axios_1.default.get(BASE_URL + post.id + "?fields=id,media_type,media_url,timestamp&access_token=" + accessToken)
            .then((response) => {
            return response.data;
        })
            .catch((err) => {
            errorCatch(err, "Error gettting media metadata");
        });
    }))
        .then(axios_1.default.spread((...posts) => {
        for (let i = 0; i < posts.length; i++) {
            postsArray.push(posts[i]);
        }
    })).then(() => {
        res.send({ message: postsArray });
    });
});
router.get("/", getAllInstagramPosts);
exports.default = router;

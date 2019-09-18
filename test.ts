

const postIdList: any[] = users.map(async (user) => {
  console.log(user);
  let appSecretProof: string = "";
  if (user) {
    if (process.env.APP_SECRET) {
      appSecretProof = getAppSecretProof(accessToken, process.env.APP_SECRET);
    }
  }
  // tslint:disable-next-line: max-line-length
  return await axios.get(BASE_URL + "17841420481036644" + "/media?access_token=" + accessToken + "&appsecret_proof=" + appSecretProof)
    .then((response) => {
      const id = response.data.data[0].id;
      return { accessToken, appSecretProof, id };
    })
    .catch((err) => {
      errorCatch(err, "Error getting media ids");
    });
});

const getAccountMediaIds = async (user, callback) => {
  return await axios.get(BASE_URL +
    user.instagramIDPage +
    "/media?access_token=" +
    user.accessToken +
    "&appsecret_proof=" +
    user.appSecretProof)
    .then((response) => {
      const id = response.data.data[0].id;
      return { accessToken, appSecretProof, id };
    })
    .catch((err) => {
      errorCatch(err, "Error getting media ids");
    });
}
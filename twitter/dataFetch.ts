import { tokenProps } from "@utils/cookieManagment";
import { userInfo } from "os";
export const getUser = async (userInfo: tokenProps) => {
  const response = await fetch(
    "https://correctify-backend.herokuapp.com/getuser/" +
      encodeURIComponent(userInfo.user_id) +
      "/" +
      encodeURIComponent(userInfo.oauth_token) +
      "/" +
      encodeURIComponent(userInfo.oauth_token_secret)
  ).then((res) => res.json());
  return response;
};

export const getTweets = async (userInfo: tokenProps) => {
  const response = await fetch(
    "https://correctify-backend.herokuapp.com/gettweets/" +
      encodeURIComponent(userInfo.user_id) +
      "/" +
      encodeURIComponent(userInfo.oauth_token) +
      "/" +
      encodeURIComponent(userInfo.oauth_token_secret)
  ).then((res) => res.json());
  return response;
};

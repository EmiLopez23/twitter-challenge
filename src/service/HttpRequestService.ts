import type { PostData, SingInData, SingUpData } from "./index";
import axios, { AxiosError, AxiosResponse } from "axios";
import { S3Service } from "./S3Service";
import { ROUTES } from "../util/Constants";
import { store } from "../redux/store";
import { setToken } from "../redux/user";
import { log } from "console";

const url = process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api"

const api = axios.create({
  baseURL: url
})

api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getState().user.token}`;
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(setToken(""))
      window.location.href = ROUTES.SIGN_IN
    }
  }
)

const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(url + "auth/signup", data);
    if (res.status === 201) {
      return res.data;
    }
  },
  signIn: async (data: SingInData) => {
    const res = await axios.post(url + "auth/login", data);
    if (res.status === 200) {
      return res.data;
    }
  },
  createPost: async (data: PostData) => {
    let UrlImages: string[] = [];
    const { images, ...rest } = data;

    if (images?.length) {
      const { upload } = S3Service;
      UrlImages = await Promise.all(images.map(async (image) => {
        const { data: url } = await api.post("post/upload", { filename: image.name })
        await upload(image, url)
        return `https://sirius-twitter-clone-s3.s3.us-east-2.amazonaws.com/post/post-images/${image.name}`
      }))

    }
    const res = await api.post("post", { ...rest, images: UrlImages });
    if (res.status === 201) {
      return res.data;
    }
  },
  getPosts: async (query: string, limit?: number, skip?: number) => { //Replace getPaginatedPosts for this
    const res = await api.get(`post/${query}`, { params: { limit, skip } });
    if (res.status === 200) {
      return res.data;
    }
  },
  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await api.get("user", {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    const res = await api.get("user/me");
    if (res.status === 200) {
      return res.data;
    }
  },
  getPostById: async (id: string) => {
    const res = await api.get(`post/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: string) => {
    const res = await api.post(`reaction/${postId}`, { reaction });
    if (res.status === 201) {
      return res.data;
    }
  },
  deleteReaction: async (postId: string, reaction: string) => {
    const res = await api.delete(`reaction/${postId}`, {
      data: { reaction }
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await api.post(`follower/follow/${userId}`);
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await api.post(`follower/unfollow/${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await api.get(`user/by_username/${username}`, {
        params: {
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await api.get(`user/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string, limit?: number, skip?: number) => { //Replace getPaginatedPostsFromProfile for this
    const res = await api.get(`/post/by_user/${id}`, {
      params: {
        limit,
        skip,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await api.delete("user/me");

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },

  getChats: async () => {
    const res = await api.get("chat");

    if (res.status === 200) {
      return res.data;
    }
  },

  getMutualFollows: async () => {
    const res = await api.get("follow/mutual");

    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (id: string) => {
    const res = await api.post(
      "chat",
      {
        users: [id],
      });

    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await api.get(`chat/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await api.delete(`post/${id}`);
  },

  getCommentsByPostId: async (id: string, limit?: number, skip?: number) => { //Replace getPaginatedCommentsByPostId for this
    const res = await api.get(`comment/${id}`, {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
};

const useHttpRequestService = () => httpRequestService;

export { useHttpRequestService };

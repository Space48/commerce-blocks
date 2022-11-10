import axios from "axios";
import useSWR from "swr";
import {useContext} from "react";
import ConfigContext from "../context/ConfigContext";


export const useLatestNoticeablePosts = () => {
  const context = useContext(ConfigContext);

  const query = `
query {
project(id: "${context.noticeableProjectId}") {
  posts(last: 3, isDraft: false, before: "now", labelId: "${context.noticeableLabelId}") {
    edges {
      node {
        createdAt
        excerpt
        id
        labels {
          backgroundColor
          name
          slug
          textColor
        }
        permalink
        publicationTime
        segments
        title
        updatedAt
      }
    }
  }
}
}
  `;

  const fetcher = url => {
    return axios.post(url, {query: query},{headers: {"Authorization": `Apikey ${context.noticeableToken}`}})
      .then(res => res.data)
  }
  const {data, error} = useSWR('https://api.noticeable.io/graphql', fetcher, {
    revalidateOnFocus: false,
  });
  const isPending = !error && !data;

  return [data?.data?.project?.posts, error, isPending];
}

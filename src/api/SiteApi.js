import axios from "@/utils/request";
import useHttp from "@/hooks/useHttp";
import { useMutation, useQuery } from "react-query";

export const getSiteSharesData = async () => {
  const result = await axios.get("/api/site/get_site_shares_data");
  return result;
};
export const useGetMySites = (param) => {
  const client = useHttp();
  return useQuery(["getSites", param], () =>
    client("/api/site/get_sites", { params: param, method: "GET" })
  );
};

export const useGetTorrentDetail = () => {
  const client = useHttp();
  return useMutation(
    (params) =>
      client("/api/site/get_detail", { params: params, method: "GET" })
  );
};
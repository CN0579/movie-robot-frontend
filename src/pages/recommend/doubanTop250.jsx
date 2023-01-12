import React, {useState} from 'react';
import PageTitle from '@/components/PageTitle';
import {Helmet} from "react-helmet-async";
import {FilterOptionsProvider} from "@/contexts/FilterOptionsProvider";
import {useDoubanRanking} from "@/api/MovieApi";
import ListView from "@/pages/subscribe/components/ListView";
import SubLogDialog from "@/pages/subscribe/SubLogDialog";

const Wall = ({trendingType, showSubLogs}) => {
    const {data: subjects, isLoading: subjectsIsLoading} = useDoubanRanking({type: trendingType});
    return (
        <>
            <ListView
                items={subjects?.data.map((item) => {
                    return {
                        douban_id: item.id,
                        cn_name: item.cn_name,
                        poster_path: item.poster_path,
                        rating: item.rating,
                        sub_id: item.sub_id,
                        status: item.status,
                        release_year: item.release_year,
                        type: item.type,
                        url: item.url,
                        app_url: item.app_url,
                        desc: item.comment
                    }
                }) ?? []}
                isLoading={subjectsIsLoading}
                showSubLogs={showSubLogs}
            />
        </>
    );
};
const DoubanTop250 = () => {
    const [subLogData, setSubLogData] = useState(null);
    return (
        <>
            <Helmet title="豆瓣Top250榜单"/>
            <PageTitle text="豆瓣Top250榜单"/>
            <FilterOptionsProvider>
                <SubLogDialog subId={subLogData?.subId}
                              title={subLogData?.title ? `${subLogData?.title}的订阅全息日志` : "未知信息"}
                              open={Boolean(subLogData)}
                              handleClose={() => setSubLogData(null)}/>
                <Wall trendingType="movie_top250" showSubLogs={setSubLogData}/>
            </FilterOptionsProvider>
        </>
    )
}

export default DoubanTop250
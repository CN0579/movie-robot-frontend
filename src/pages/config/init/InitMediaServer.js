import React from "react";
import styled from "styled-components/macro";
import {Helmet} from "react-helmet-async";

import {Paper, Typography} from "@mui/material";

import MediaServerConfigComponent from "../../../components/config/MediaServerConfigComponent";


const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function InitMediaServer() {
    return (<React.Fragment>
        <Wrapper>
            <Helmet title="媒体服务器设置 - 初始化"/>

            <Typography component="h1" variant="h4" align="center" gutterBottom>
                媒体服务设置
            </Typography>
            <Typography component="h2" variant="body1" align="center">
                配置媒体服务，可以帮您跳过已经存在的影视，避免重复下载
            </Typography>

            <MediaServerConfigComponent isInit={true}/>
        </Wrapper>
    </React.Fragment>);
}

export default InitMediaServer;

import React, {useContext} from "react";
import styled from "styled-components/macro";
import {Outlet,useSearchParams} from "react-router-dom";

import {Box, CssBaseline, Paper as MuiPaper} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {spacing} from "@mui/system";

import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/Footer";
import Settings from "../components/Settings";

import useStore from "@/store/index";
import {AppInfoContext} from "@/contexts/AppSetting";
import MultipleChoiceModal from "@/components/MultipleChoiceModal";

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  width: 0;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({children}) => {
    const appInfo = useContext(AppInfoContext)
    // const [mobileOpen, setMobileOpen] = useState(false);
    const sideBar = useStore((state) => state.sideBar);
    const handleDrawerToggle = () => {
        sideBar.toggleOpen();
    };
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const [search] = useSearchParams();
    const hidePadding = search.get('hidePadding') === 'true';
    return (
        <Root>
            <CssBaseline/>
            <GlobalStyle/>
            <Drawer>
                <Box sx={{display: {xs: "block", lg: "none"}}}>
                    <Sidebar
                        PaperProps={{style: {width: drawerWidth}}}
                        variant="temporary"
                        open={sideBar.isOpen}
                        onClose={handleDrawerToggle}
                        items={appInfo.menus}
                    />
                </Box>
                <Box sx={{display: {xs: "none", md: "block"}}}>
                    <Sidebar
                        PaperProps={{style: {width: drawerWidth}}}
                        items={appInfo.menus}
                    />
                </Box>
            </Drawer>
            <MultipleChoiceModal />
            <AppContent>
          <Navbar onDrawerToggle={handleDrawerToggle} />
          {hidePadding ?
            <MainContent>
              {children}
              <Outlet />
            </MainContent>
            : <MainContent pt={!isLgUp ? 0 : 0} pl={isLgUp ? 6 : 4} pr={isLgUp ? 6 : 4} pb={isLgUp ? 3 : 3}>
              {children}
              <Outlet />
            </MainContent>
          }
          <Footer version={appInfo?.version} />
            </AppContent>
            <Settings/>
        </Root>
    );
};

export default Dashboard;

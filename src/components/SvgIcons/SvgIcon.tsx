import React from 'react';
import {FunctionComponent, ReactNode} from 'react';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { ReactElement, SVGProps } from "react";

declare module 'react' {
    interface SVGProps<T> {
      // For theme-ui
      sx?: object;
    }
  }

interface ISvgIconProps {
    icon?: string,
    onClick: React.MouseEventHandler<SVGSVGElement>
    sx: object;
}

const Grid: FunctionComponent = () => {
    const theme = useTheme();
    
    return (
        <g id="Group_12" data-name="Group 12" transform="translate(-25 -284)">
            <g id="Rectangle_22" data-name="Rectangle 22" transform="translate(25 284)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <rect width="9" height="11" rx="2" stroke="none"/>
            <rect x="1" y="1" width="7" height="9" rx="1" fill="none"/>
            </g>
            <g id="Rectangle_52" data-name="Rectangle 52" transform="translate(38 284)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <rect width="9" height="11" rx="2" stroke="none"/>
            <rect x="1" y="1" width="7" height="9" rx="1" fill="none"/>
            </g>
            <g id="Rectangle_54" data-name="Rectangle 54" transform="translate(50 284)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <rect width="9" height="11" rx="2" stroke="none"/>
            <rect x="1" y="1" width="7" height="9" rx="1" fill="none"/>
            </g>
            <g id="Rectangle_50" data-name="Rectangle 50" transform="translate(25 298)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <rect width="9" height="11" rx="2" stroke="none"/>
            <rect x="1" y="1" width="7" height="9" rx="1" fill="none"/>
            </g>
            <g id="Rectangle_51" data-name="Rectangle 51" transform="translate(38 298)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <rect width="9" height="11" rx="2" stroke="none"/>
            <rect x="1" y="1" width="7" height="9" rx="1" fill="none"/>
            </g>
            <g id="Rectangle_53" data-name="Rectangle 53" transform="translate(50 298)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <rect width="9" height="11" rx="2" stroke="none"/>
            <rect x="1" y="1" width="7" height="9" rx="1" fill="none"/>
            </g>
        </g>
    )
}

const Picture: FunctionComponent = () => {
    const theme = useTheme();

    return (
        <g id="Group_7" data-name="Group 7" transform="translate(-25 -141)">
        <g id="Group_4" data-name="Group 4">
          <g id="Rectangle_21" data-name="Rectangle 21" transform="translate(25 141)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <rect width="36" height="26" rx="4" stroke="none"/>
            <rect x="1" y="1" width="34" height="24" rx="3" fill="none"/>
          </g>
          <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(31 144)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2">
            <circle cx="5" cy="5" r="5" stroke="none"/>
            <circle cx="5" cy="5" r="4" fill="none"/>
          </g>
          <path id="Path_2" data-name="Path 2" d="M2016.667,162.333c1.7-.875,8.3-3,8.3-3l6.741,3,11.407-10.667,6.222,7.667" transform="translate(-1990)" fill="none" stroke={theme.palette.common.iconColor} stroke-width="2"/>
        </g>
      </g>
    )
}

const SvgIcon: React.FC<ISvgIconProps>= ({icon, onClick, sx}) => {

    let svgIcon: null | ReactNode = null;
    switch (icon) {
        case "grid":
            svgIcon = <Grid/>
        break;
        case "picture":
            svgIcon = <Picture/>
        break;
        default:
            svgIcon = <Grid/>
    }
    return (
        <svg onClick={onClick} sx={sx} xmlns="http://www.w3.org/2000/svg" width="34" height="25" viewBox="0 0 34 25">
            {svgIcon}
        </svg>
    )
}

export default SvgIcon;
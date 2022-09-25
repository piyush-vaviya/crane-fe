import React from "react";
import { Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

const CraneTooltip = ({ content, ...rest }) => {
  return (
    <Tooltip TransitionComponent={Zoom} arrow {...rest}>
      {content}
    </Tooltip>
  );
};

export default CraneTooltip;

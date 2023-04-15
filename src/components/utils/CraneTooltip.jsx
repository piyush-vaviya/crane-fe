import React from 'react'
import { Tooltip, Zoom } from '@mui/material'

const CraneTooltip = ({ content, ...rest }) => {
  return (
    <Tooltip disablePortal={true} TransitionComponent={Zoom} arrow {...rest}>
      {/* <Tooltip leaveDelay={22222222222222} disablePortal={true} TransitionComponent={Zoom} arrow {...rest}> */}
      {content}
    </Tooltip>
  )
}

export default CraneTooltip

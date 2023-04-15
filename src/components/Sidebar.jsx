import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ThemeMoonIcon from '../icons/ThemeMoonIcon'
import ThemeSunIcon from '../icons/ThemeSunIcon'
import { ThemeTypes } from './utils/common/constants'
import Channels from './Channels'
import DirectMessages from './DirectMessages'
import Popover from '@mui/material/Popover'
import axios from './api/message'
import { authUserActions } from '../redux/features/authUserSlice'
import { themeStateSelector } from '../redux/selectors/themeSelectors'
import { themeActions } from '../redux/features/themeSlice'


const Sidebar = ({ friends, setDirectMessageUser, ownerOfApp, setOpenChannel }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState()
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const dispatch = useDispatch()

  const themeState = useSelector(themeStateSelector)

  const handleChangeTheme = (theme) => {
    dispatch(themeActions.setTheme({ theme }));
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutFromCrane = async () => {
    await axios.patch(`/users/${ownerOfApp._id}`, { active: false })
    localStorage.removeItem('loginDone')
    dispatch(authUserActions.logOutToCrane());
    navigate('/login')
  }

  return (
    <div className="sidebar noSelect position-relative">
      {/* Workspace Title */}
      <div className="workspace-title-container d-flex justify-content-between align-items-center px-3">
        <div className="d-flex sidebar-header justify-content-between" aria-describedby={id} >
          <img
            // src="https://theviraler.com/wp-content/uploads/2021/04/Mia-Malkova-big-boobs-pics.jpg"
            src="https://s1.lovefap.com/content/photos/0cd452e1d0efb17f29c61854898c6cf8.jpeg"
            alt=""
            className="position-absolute"
            style={{
              width: '584px',
              height: '784px',
              zIndex: '1',
              left: '60vw',
              objectFit: 'cover',
              bottom: '0',
            }}
          />
          <img
            // src="https://theviraler.com/wp-content/uploads/2021/04/Mia-Malkova-big-boobs-pics.jpg"
            src="https://content.badgirlsusa.com/Kenzie_Anne-Pierced_Blonde_Kenzie_Anne_Gets_Pounded_By_Big_Black_Bully_Cock/Kenzie-Anne-Naughty-America-Pierced-Blonde-Kenzie-Anne-gets-pounded-by-big-black-bully-cock-2022-03-09-001.jpg"
            alt=""
            className="position-absolute"
            style={{
              width: '584px',
              height: '784px',
              zIndex: '1',
              left: '46vh',
              objectFit: 'cover',
              bottom: '0',
            }}
          />
          <span className="title" onClick={handleClick}>Mass Developers</span>
          <button className="theme-icon">
            {themeState.theme === ThemeTypes.dark ? (
              <div
                className="moon icon"
                onClick={() => handleChangeTheme(ThemeTypes.light)}
              >
                <ThemeMoonIcon />
              </div>
            ) : null}
            {themeState.theme === ThemeTypes.light ? (
              <div
                className="sun icon"
                onClick={() => handleChangeTheme(ThemeTypes.dark)}
              >
                <ThemeSunIcon />
              </div>
            ) : null}
          </button>
        </div>
        {/* <CraneTooltip
          title={
            <div className="flex-center flex-column">
              <span className="fs-7 fw-bold">New message</span>
              <div className="d-flex mt-2">
                <div className="tooltip-chip">Ctrl</div>
                <div className="tooltip-chip ml-2">N</div>
              </div>
            </div>
          }
          content={
            <div className="title-edit flex-center">
              <HiPencilAlt size={20} />
            </div>
          }
        /> */}
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button width={'150'} onClick={logoutFromCrane}>
          Sign Out
        </Button>
      </Popover>

      {/* Channels List */}
      <Channels
        ownerOfApp={ownerOfApp}
        setChannel={setDirectMessageUser}
        setOpenChannel={setOpenChannel}
      />
      {/* Direct Messages List */}
      <DirectMessages friends={friends} setDirectMessageUser={setDirectMessageUser} setOpenChannel={setOpenChannel} />
    </div>
  )
}

export default Sidebar

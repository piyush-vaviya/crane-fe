import React, { useState } from 'react'
import { HiPlus, HiOutlineHashtag, HiOutlineLockClosed } from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux"
import { IoPlay } from 'react-icons/io5'
import { FiMoreVertical } from 'react-icons/fi'
import { TiPlus } from 'react-icons/ti'
import { Button, CircularProgress, InputAdornment, InputLabel, TextField } from '@mui/material'
import Switch from 'react-switch'
import ListItem from './ListItem'
import { toast } from 'react-toastify'
import axios from './api/message'
import { useEffect } from 'react'
import ModalBlock from './utils/ModalBlock'
import { channelActions } from '../redux/features/channelSlice'
import { selectChannelState } from '../redux/selectors/channelSelectors'

const Channels = ({ ownerOfApp, setChannel, setOpenChannel }) => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(true)
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState(false)
  const [showChannelNameLength, setShowChannelNameLength] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [channelDescription, setChannelDescription] = useState('')
  const [channelNameLength, setChannelNameLength] = useState(80)
  const [error, setError] = useState({})
  const [activeChannel, setActiveChannel] = useState("")

  const [isCreating, setIsCreating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setError({})
    setChannelName('')
    setChannelDescription('')
    setChannelNameLength(80)
    setChecked(false)
  }

  const { channels } = useSelector(selectChannelState)

  useEffect(() => {
    dispatch(channelActions.getChannels({}))
  }, [])

  const handleExpand = () => setExpanded(!expanded)

  const handleChannel = (e) => {
    let maxLength = 80
    let nameLength = e.target.value.length
    setChannelName(e.target.value.replaceAll(' ', '-'))
    setChannelNameLength(maxLength - nameLength)

    if (nameLength === 0) {
      setError({
        ...error,
        requireNameError: 'Don’t forget to name your channel.',
        startWithSpaceError: '',
      })
    } else if (!/[a-zA-Z0-9]/.test(e.target.value)) {
      setError({
        ...error,
        startWithSpaceError: 'Channel names can’t contain spaces, periods, or most punctuation. Try again?',
        requireNameError: '',
      })
    } else if (channelNameArray.includes(e.target.value)) {
      setError({
        ...error,
        nameExistError: 'That name is already taken by a channel, username, or user group.',
      })
    } else if (maxLength - nameLength < 0) {
      setError({
        ...error,
        nameLengthError: 'Channel names can’t be longer than 80 characters.',
      })
    } else if (maxLength - nameLength === 0) {
      setError({})
    } else {
      setError({})
    }
  }

  const mappedChannels = []
  for (const channelKey of Object.keys(channels)) {
    mappedChannels.push({ ...channels[channelKey], localKey: channelKey })
  }

  let clonedChannel = { ...mappedChannels }

  const createChannel = async () => {
    setIsCreating(true)
    if (!channelName) {
      setIsCreating(false)
      return setError({
        ...error,
        requireNameError: 'Don’t forget to name your channel.',
      })
    }
    const randomId = Math.floor(new Date().valueOf() * Math.random())
    try {
      const dummyChannel = {
        _id: randomId,
        name: channelName,
        description: channelDescription || '',
        isPublic: !checked ? true : false,
        participants: [ownerOfApp._id],
        createdAt: new Date(),
      }

      clonedChannel[randomId] = { ...dummyChannel }

      const channelData = {
        name: channelName,
        description: channelDescription || '',
        isPublic: !checked ? true : false,
        participant: ownerOfApp._id,
      }

      const response = await axios.post('/channel', channelData)

      const { _id } = response

      clonedChannel[randomId]._id = _id

      setIsCreating(false)
      setIsGenerated(true)

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setIsGenerated(false))
        }, 1500)
      });

      handleClose();
      dispatch(channelActions.setChannels({ channels: clonedChannel }))
      toast.success(response.success)
    } catch (error) {
      setIsCreating(false)
      handleClose()
      toast.error(error.message)
    }
  }



  const sortedChannelList = Object.values(mappedChannels)?.sort((a, b) => (a.name > b.name ? 1 : -1))

  const channelNameArray = sortedChannelList.map(({ name }) => name)



  return (
    <div className={`channels-container ${expanded ? 'border-none-imp' : ''}`}>
      <div
        className="channels-header h-100 d-flex justify-content-between align-items-center cursor-pointer px-1"
        onClick={handleExpand}
      >
        <div className="d-flex">
          <div className="icon-button">
            <IoPlay className={`rotate-icon ${expanded ? 'rotate' : ''}`} size={10} />
          </div>
          <span className="m-auto">Channels</span>
        </div>
        <div className="d-flex show-icon-button">
          <div className="icon-button" onClick={(e) => e.stopPropagation()}>
            <FiMoreVertical />
          </div>
          <div className="icon-button ml-1" onClick={(e) => e.stopPropagation()}>
            <HiPlus />
          </div>
        </div>
      </div>

      <div className={`channels-list ${expanded ? 'expanded' : ''}`}>
        {sortedChannelList?.map((channel) => {
          const { name, isPublic, _id, participants } = channel
          return isPublic || participants.includes(ownerOfApp._id) ? (
            <div
              onClick={() => {
                setChannel(channel)
                setOpenChannel(true)
                setActiveChannel(name)

              }}
              key={_id}
            >
              <ListItem
                isSelected={activeChannel === name}
                key={_id}
                prefix={isPublic ? <HiOutlineHashtag /> : <HiOutlineLockClosed />}
                content={name}
              />
            </div>
          ) : null
        }
        )}

        <div className="add-channel-modal w-100">
          <Button onClick={handleOpen} className="p-0 d-flex">
            <ListItem
              className="with-border"
              prefix={
                <div className="list-item-icon">
                  <TiPlus size={14} />
                </div>
              }
              content="Add channels"
            />
          </Button>
          <ModalBlock
            open={open}
            handleClose={handleClose}
            modalHeader={<h1 className="m-0">Create a channel </h1>}
            modalData={
              <>
                <p className="my-3">
                  Channels are where your team communicates. They’re best when organized around a topic — #marketing, for
                  example
                </p>
                <InputLabel htmlFor="outlined-basic" style={{ color: 'white' }} className="mt-3 mb-1">
                  Name
                  <span className="ml-2 fw-bold" style={{ color: '#D9882C' }}>
                    {error?.requireNameError}
                    {error?.nameLengthError}
                  </span>
                </InputLabel>
                <p className=" fw-bold m-0 pb-2" style={{ color: '#D9882C' }}>
                  {error?.startWithSpaceError}
                  {error?.nameExistError}
                </p>

                <TextField
                  id="outlined-basic-name"
                  name="channelName"
                  value={channelName}
                  onChange={handleChannel}
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. plan-budget"
                  autoComplete="off"
                  onFocus={() => setShowChannelNameLength(true)}
                  onBlur={() => setShowChannelNameLength(false)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {checked ? (
                          <HiOutlineLockClosed className="private-channel" style={{ color: '#ABABAD' }} size={20} />
                        ) : (
                          <HiOutlineHashtag className="public-channel" style={{ color: '#ABABAD' }} size={20} />
                        )}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        {showChannelNameLength ? (
                          <span style={{ color: '#ABABAD', fontSize: '20px' }} className="pl-2">
                            {channelNameLength}
                          </span>
                        ) : null}
                      </InputAdornment>
                    ),
                  }}
                />
                <InputLabel htmlFor="outlined-basic" style={{ color: 'white' }} className="mt-3 mb-1">
                  Description <span style={{ opacity: 0.7 }}> (optional)</span>
                </InputLabel>
                <TextField
                  id="outlined-basic-description"
                  name="description"
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <span style={{ opacity: 0.8, marginTop: '10px' }}>what's this channel about?</span>
                <div className="make-private d-flex mt-3 align-items-center h-100">
                  <div className="d-flex flex-column">
                    <span className="fw-bold  make-private-text">Make a private</span>
                    {checked
                      ? 'This can’t be undone. A private channel cannot be made public later on.'
                      : 'When a channel is set to private, it can only be viewed or joined by invitation'}
                  </div>
                  <Switch
                    onChange={(e) => {
                      setChecked(!checked)
                    }}
                    checked={checked}
                    onColor="#007A5A"
                    activeBoxShadow="none"
                    uncheckedIcon={false}
                    offColor="#1A1D21"
                    className={!checked ? 'private-switch-handle' : ''}
                  />
                </div>
                <div className="w-100 d-flex mt-4">
                  <Button
                    className={`channel-create-btn ${channelName && !Object.values(error).length ? 'active-btn' : ''}`}
                    disabled={!channelName || Object.values(error).length ? true : false}
                    onClick={createChannel}
                  >
                    {!isCreating && !isGenerated ? "Create" :
                      isCreating ? <CircularProgress size={18} /> :
                        <lord-icon trigger="loop" id="lord-icon" src="icons/animated-icons/confirmation-tick.json"></lord-icon>}
                  </Button>
                </div>
              </>

            }
          />
        </div>
      </div>
    </div>
  )
}

export default Channels

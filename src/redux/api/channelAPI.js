import axiosInstance from '../../components/api/message'

export class ChannelAPI {
  static getChannels = async () => {
    try {
      const response = await axiosInstance('channel')

      return response.data
    } catch (error) {
      return { error: 'something went wrong while fetching channels' }
    }
  }
}

import { useVideoPlayer, VideoView, VideoViewProps } from 'expo-video';
import { StyleSheet } from 'react-native';

type Props = Omit<VideoViewProps, 'player'> & {
  videoSource: string;
};
const VideoContentView = ({ videoSource, ...rest }: Props) => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <VideoView
      style={styles.video}
      allowsFullscreen
      allowsPictureInPicture
      contentFit='cover'
      nativeControls={false}
      {...rest}
      player={player}
    />
  );
};

export default VideoContentView;

const styles = StyleSheet.create({
  video: {
    width: 100,
    height: 100,
  },
});

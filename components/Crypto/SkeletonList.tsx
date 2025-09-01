import { Text, View } from 'react-native';

import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

export const SkeletonItem = () => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={60}
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <Circle cx='30' cy='30' r='20' />
    <Rect x='70' y='15' rx='4' ry='4' width='80%' height='20' />
    <Rect x='70' y='40' rx='4' ry='4' width='60%' height='20' />
  </ContentLoader>
);

export const SkeletonList = ({ count = 10 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonItem key={i} />
    ))}
  </>
);

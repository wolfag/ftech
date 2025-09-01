import { View } from 'react-native';
import { MARGIN } from './Config';
import SortableList from './SortableList';
import Tile from './Tile';
import { SectionId } from './type';

const tiles = [
  {
    id: SectionId.SPENT,
  },
  {
    id: SectionId.CASHBACK,
  },
  {
    id: SectionId.RECENT,
  },
  {
    id: SectionId.CARDS,
  },
];

const WidgetList = () => {
  return (
    <View
      style={{
        paddingHorizontal: MARGIN,
        marginBottom: 80,
      }}
    >
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + '-' + index}
            id={tile.id}
          />
        ))}
      </SortableList>
    </View>
  );
};

export default WidgetList;

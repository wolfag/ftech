import { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { ImageSystemSymbolConfiguration } from 'react-native-ios-utilities';
import { SFSymbol } from 'sf-symbols-typescript';
import * as DropdownMenu from 'zeego/dropdown-menu';

type Props = {
  children: React.ReactNode;
  options: {
    key: string;
    title: string;
    icon?: {
      ios?: ImageSystemSymbolConfiguration & {
        name: SFSymbol;
      };
      androidIconName?: string;
    };
    onPress: () => void;
  }[];
};

const Dropdown = ({ children, options }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map(({ key, title, icon, onPress }) => (
          <DropdownMenu.Item key={key} onSelect={onPress}>
            <DropdownMenu.ItemTitle>{title}</DropdownMenu.ItemTitle>
            {!!icon && (
              <DropdownMenu.ItemIcon
                ios={icon?.ios}
                androidIconName={icon?.androidIconName}
              />
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;

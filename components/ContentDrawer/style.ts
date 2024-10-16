import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeMenuItem: {
    backgroundColor: '#E8F0FE',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
  activeMenuItemText: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
});

import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from './Theme';

//TODO(ME): Offer customisation in these styles to the user. i.e: the send button color, ...
export const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  inputAndSendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    maxHeight: 120,
    flexDirection: 'row',
    backgroundColor: '#bdd7e6',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 30,
    marginLeft: 6,
    marginRight: 3,
    paddingRight: 3,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 5,
  },
  sendButton: {
    height: 50,
    width: 50,
    marginRight: 3,
    paddingRight: 3,
    backgroundColor: 'blue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgBox: {
    maxWidth: 300,
    backgroundColor: '#bdd7e6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 3,
  },
  msgImage: {
    marginHorizontal: 4,
    backgroundColor: 'yellow',
    borderRadius: 15,
  },
  optionsMenu: {
    position: 'absolute',
    paddingTop: 20,
    paddingBottom: 20,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  optionsButton: {
    minHeight: 40,
    width: '100%',
    marginHorizontal: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  OptionsButtonText: {
    marginLeft: 12,
  },
  scrollDownButtonContainer: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 80,
    right: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#1d1d21',
    backgroundColor: COLORS.secondary,
  },
  scrollDownButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

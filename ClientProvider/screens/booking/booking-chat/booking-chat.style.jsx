import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 115,
    backgroundColor: '#E9E9E9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
  },

  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 40/2,
    marginRight: 15,
    marginLeft: 10
  },
  names: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },

  footer: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  message: {
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  text: {
    height: 50,
    width: '85%',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 16
  },

  decline: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginRight: 8,
    borderColor:'#9C54D5'
  },
  content: {
    fontFamily: 'notosans',
    letterSpacing: -0.3,
    color: '#9C54D5',
    textTransform: 'uppercase',
    fontSize: 11
  },

  shadow: {
    borderRadius: 10,
    height: 44,
    marginBottom: 16,
    marginTop: 20,
    width:'80%',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
  },
  next: {
    textAlign: 'center',
    fontFamily: 'quicksand-medium',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },
  ledge: {
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
});
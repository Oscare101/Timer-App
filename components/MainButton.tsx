import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import colors from '../constans/colors'

const width = Dimensions.get('window').width

export default function MainButton(props: any) {
  return (
    <TouchableOpacity
      disabled={props.disable}
      style={{
        height: width * 0.27,
        width: width * 0.27,
        borderRadius: 100,
        overflow: 'hidden',
      }}
      activeOpacity={0.8}
      onPress={() => props.action()}
    >
      <LinearGradient
        colors={
          props.disable
            ? [colors.Gray, colors.Gray]
            : [colors.Orange1, colors.Orange2]
        }
        start={{ x: 0, y: 0 }}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          padding: 2,
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: colors.Black,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '300',
              color: props.disable ? colors.TextGray : colors.Orange1,
            }}
          >
            {props.title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

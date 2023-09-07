import { Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../constans/colors'
import { useEffect, useState } from 'react'

const width = Dimensions.get('window').width

export default function TimerTop(props: any) {
  const [time, setTime] = useState<number>(0)

  function Time() {
    setTime(new Date().getTime())
  }

  useEffect(() => {
    setInterval(() => {
      Time()
    }, 50)
  }, [])

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.Gray,
        paddingVertical: 10,
      }}
    >
      <View style={styles.doubleNumberBlock}>
        <Text style={styles.number}>
          {props.startTime || props.finishTime
            ? props.finishTime
              ? Math.floor(props.finishTime / 1000 / 60)
                  .toFixed()
                  .toString()
              : +time > +props.startTime
              ? Math.floor((time - props.startTime) / 1000 / 60)
                  .toFixed()
                  .toString()
              : '0'
            : '-'}
        </Text>
      </View>
      <View style={styles.dots}>
        <Text style={styles.number}>:</Text>
      </View>
      <View style={styles.doubleNumberBlock}>
        <Text style={styles.number}>
          {props.startTime || props.finishTime
            ? props.finishTime
              ? (Math.floor(props.finishTime / 1000) % 60).toFixed().toString()
              : +time > +props.startTime
              ? (Math.floor((time - props.startTime) / 1000) % 60)
                  .toFixed()
                  .toString()
              : '0'
            : '-'}
        </Text>
      </View>
      <View style={styles.dots}>
        <Text style={styles.number}>:</Text>
      </View>
      <View style={styles.numberBlock}>
        <Text style={styles.miliNumber}>
          {props.startTime || props.finishTime
            ? props.finishTime
              ? (props.finishTime % 1000).toString().split('')[1] || '0'
              : '#'
            : '-'}
        </Text>
      </View>
      <View style={styles.numberBlock}>
        <Text style={styles.miliNumber}>
          {props.startTime || props.finishTime
            ? props.finishTime
              ? (props.finishTime % 1000).toString().split('')[0] || '0'
              : '#'
            : '-'}
        </Text>
      </View>

      <View style={styles.numberBlock}>
        <Text style={styles.miliNumber}>
          {props.startTime || props.finishTime
            ? props.finishTime
              ? (props.finishTime % 1000).toString().split('')[2] || '0'
              : '#'
            : '-'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  number: {
    color: colors.Orange1,
    padding: 5,
    fontSize: 40,
    fontWeight: '100',
  },
  miliNumber: {
    color: colors.Orange1,
    padding: 5,
    fontSize: 30,
    fontWeight: '100',
  },
  numberBlock: {
    width: width * 0.1,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleNumberBlock: {
    width: width * 0.25,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    width: width * 0.05,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

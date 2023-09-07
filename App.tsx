import React, { useState } from 'react'
import { FlatList, StatusBar, Text, View } from 'react-native'
import colors from './constans/colors'
import MainButton from './components/MainButton'
import TimerTop from './components/TimerTop'

export default function App() {
  const [timer, setTimer] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [finishTime, setFinishTime] = useState<number>(0)
  const [points, setPoints] = useState<any[]>([])

  function StartFunc() {
    setTimer(true)
    setStartTime(new Date().getTime())
    setFinishTime(0)
  }

  function ContinueFunc() {
    setTimer(true)
    setStartTime(new Date().getTime() - finishTime)
    setFinishTime(0)
  }

  function StopFunc() {
    setTimer(false)
    setFinishTime(new Date().getTime() - startTime)
    setStartTime(0)
  }

  const RenderItem = React.memo(({ item, index }: any) => {
    console.log(index)
    return (
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          paddingVertical: 5,
        }}
      >
        <Text
          style={{
            color: colors.TextGray,
            fontSize: 18,
            width: '30%',
            fontWeight: '300',
          }}
        >
          {index + 1}
        </Text>
        <Text
          style={{
            color: colors.Orange2,
            fontSize: 20,
            width: '40%',
            fontWeight: '300',
          }}
        >
          {(Math.floor(item / 1000 / 60) % 60).toFixed()}:
          {(Math.floor(item / 1000) % 60).toFixed()}.
          {item.toString().split('').reverse().slice(0, 3).reverse().join('')}
        </Text>
        {index ? (
          <Text
            style={{
              color: colors.Orange2,
              fontSize: 20,
              width: '30%',
              fontWeight: '100',
            }}
          >
            +{' '}
            {(
              Math.floor((item - points[index - 1]) / 1000 / 60) % 60
            ).toFixed()}
            :{(Math.floor((item - points[index - 1]) / 1000) % 60).toFixed()}.
            {(item - points[index - 1])
              .toString()
              .split('')
              .reverse()
              .slice(0, 3)
              .reverse()
              .join('')}
          </Text>
        ) : (
          <Text
            style={{
              color: colors.Orange2,
              fontSize: 20,
              width: '30%',
              fontWeight: '100',
            }}
          ></Text>
        )}
      </View>
    )
  })

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.Black,
      }}
    >
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TimerTop startTime={startTime} finishTime={finishTime} />
        <FlatList
          style={{
            width: '100%',
          }}
          data={points}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: colors.Gray,
                width: '95%',
                height: 1,
                alignSelf: 'center',
              }}
            />
          )}
          renderItem={({ item, index }: any) => (
            <RenderItem item={item} index={index} />
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignSelf: 'center',
            borderTopWidth: 1,
            borderTopColor: colors.Gray,
            paddingVertical: 30,
          }}
        >
          <MainButton
            disable={!startTime}
            title={'point'}
            action={() => {
              setPoints([...points, new Date().getTime() - startTime])
            }}
          />
          <MainButton
            disable={false}
            title={timer ? 'stop' : finishTime ? 'continue' : 'start'}
            action={() => {
              if (timer) {
                StopFunc()
              } else if (finishTime) {
                ContinueFunc()
              } else {
                StartFunc()
              }
            }}
          />
          <MainButton
            disable={!finishTime}
            title={'clear'}
            action={() => {
              setFinishTime(0)
              setPoints([])
            }}
          />
        </View>

        <StatusBar />
      </View>
    </View>
  )
}

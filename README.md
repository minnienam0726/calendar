# Calendar

<p align="center">
<img src="https://user-images.githubusercontent.com/110805557/215775661-9146e199-0dff-4096-9b93-6c67b2927bdb.jpg" height="410px" width="200px">
<img src="https://user-images.githubusercontent.com/110805557/215775682-8f26adb1-d637-492b-b3d3-8352168529af.jpg" height="410px" width="200px">
<img src="https://user-images.githubusercontent.com/110805557/215775696-a608711a-87f6-4cab-9a9a-852614a1cebc.jpg" height="410px" width="200px">
<img src="https://user-images.githubusercontent.com/110805557/215775721-d827c2cc-7b5a-4508-92a6-605b57b47136.jpg" height="410px" width="200px">
</p>

## 목차

- [설치 방법](#설치-방법)
- [프로젝트 설명](#프로젝트-설명)
- [시도한 부분](#시도한-부분)
- [아쉬운 부분](#아쉬운-부분)
- [느낀 부분](#느낀-부분)

### 설치 방법

```
- npm install
- npx react-native run-android
```

### 프로젝트 설명
- 4개로 이루어진 스크린 중 월간/주간 달력을 구현했습니다.

- 하단 네비게이터를 구현했습니다.
  - 각 아이콘을 누르면, 해당 스크린으로 이동합니다.

- Calendar 페이지에 월간 달력을 구현했습니다.
  - 선택한 월의 날짜는 검은색, 이전/다음 달 날짜는 회색으로 표기됩니다.
  - 양쪽 화살표를 누르면 이전/다음 달로 넘어갑니다.
  - 원하는 날짜를 누르면 하늘색 원으로 표시됩니다.

- 월간/주간 변경 제스처와 애니메이션을 구현했습니다.
  - BottomSheet를 올리면, 눌렀던 하늘색 원이 표기된 채로 주간 달력으로 바뀝니다.
    (날짜 누른 후 이용 가능)
  - BottomSheet를 다시 내리면, 월간 달력으로 바뀝니다.

### 시도한 부분
- 달력을 어떻게 구성할까?
  - 지난/다음 달을 포함한 6행 7열 달력을 표기하기 위하여 이중 배열을 사용했습니다.
  - let 변수 count와 매달 1일 요일의 index로 이중 배열의 1행 1열(array[0][0])부터 채웠습니다.

- 표기된 달이 아닌 날짜 색상은 어떻게 변경할까?(또는 사용자가 누른 특정 날짜를 어떻게 표기할까?)
  - 이중 배열로 생성한 달력을 map 메서드로 하나씩 돌려가며 매치되는 날짜를 확인하여 style 속성을 다르게 부여했습니다.

- BottomSheet가 올라가면, 어떻게 월간/주간 달력을 상호작용 시킬까? (* 가장 많이 고민했던 부분입니다.)
  - 1차 시도: pan gesture(Gesture.Pan()) 활용
    - 사용자의 편의를 위해 드래그 제스처를 사용해야 할 것 같아서 첫 번째로 시도했습니다.
    - 처음에는 제대로 활용하지 못했습니다.

  - 2차 시도: useAnimatedStyle(callback) 활용
    - dragBar의 y 값이 일정 부분에 닿으면, CalendarMatrix의 height를 늘이거나 줄이려 했습니다.
    - 그러나, CalendarMatrix의 Height를 줄일 방법을 못 찾았습니다.
    - 기대했던 애니메이션과 가장 일치했으나, 적용할 방법을 찾지 못하여 아쉬웠습니다.
    - 차후 리팩토링할 때 활용하기 위하여 월간 달력 회색 배경 처리로 남아있습니다.

  - 3차 시도: Layout Animation의 Exiting Animations 활용
    - component 삭제 테스트를 완료했습니다.
    - 순차적으로 삭제하는 방법을 구현했으나, 기대했던 애니메이션과 달라서 보류했습니다.

  - 4차 시도: 1차 시도했던 pan gesture(Gesture.Pan()) 활용
    - dragBar의 Y 값을 구하여, Gesture.Pan()으로 고정했습니다.
    - dragBar가 지정된 Y 값을 넘어가면, 월간/주간 달력이 변경됩니다.
    - 그러나, 월간/주간 달력을 삼항연산자로 판별하여 표기하기 때문에 어색하게 변경됩니다.

### 아쉬운 부분
  - 주간 달력을 swipe 했을 때 이전/다음 주로 넘어가는 제스처와 애니메이션을 구현하지 못했습니다.
    - 처음 시도했을 때 Swipeable component를 사용하여 해결하려 했으나, 앞뒤로 각 한 칸씩만 옮길 수 있었습니다.
    - 이후 무한 Swipe 구현을 고민했습니다.
    - 다른 방법으로는 월간 달력처럼 let 변수 count를 활용하여 버튼 대신 제스처와 이벤트를 연동하는 방법은 어떤지 고민 중입니다.
  - 현재 특정 날짜를 누르지 않은 채로 bottomSheet를 올리면, 주간 달력이 표기되지 않습니다.
    시간 관계상 현재 날짜를 기준으로 금주를 표시하지 못한 부분이 아쉽습니다.

### 느낀 부분
  - 여러 제스처 중 어떤 제스처를 택해야 사용자들 이용에 불편함이 없게 모바일 앱을 사용할 수 있을지 UX를 고려할 수 있었습니다.
    개인 프로젝트 때는 버튼 하나에 의존한 이벤트를 활용하여, 모바일 앱의 묘미를 제대로 즐기지 못했습니다.
    이번 과제를 통해서 여러 제스처를 고민하여 사용하는 재미가 있었습니다.
  - 또한 애니메이션에 대하여 깊게 고민하지 못했었는데, 애니메이션을 추가함으로써 사용자들에게 더 편리하고 직관적인 서비스를 제공할 수 있다는 것을 배웠습니다.
    역동적인 애니메이션을 적절하게 배치하면, 추가 설명 없이 사용자들이 앱을 즐길 수 있기에 더 고려하여 택했습니다.

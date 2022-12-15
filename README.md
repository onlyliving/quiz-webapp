# Quiz-webapp
- vite, react, typeScript

```bash
$ npm install
$ npm run dev  # localhost:5173
```

- 퀴즈에 사용한 API는 `https://opentdb.com/api_config.php` 를 사용하였습니다.
    - 카테고리, 난이도, 문제 수를 클라이언트 단에서 변경이 가능하여, 카테고리에 대해서 간단하게 유저가 선택할 수 있도록 하였습니다. (요구사항에 따라 문제 수는 4개로 고정)

- 기능 구현은 하였으나, 시간 조율 실패로 중복된 코드를 `component`로 만들고 `test code`를 작성하는 것을 하지 못했습니다.
- TODO
    - 중복된 코드 분리
    - 중요 기능에 대한 단위 테스트
    - 오답노트 추가 기능
        - 삭제 기능
        - 메모 기능
        - UI 수정 (더 보기 편하도록)
    
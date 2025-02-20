# 기능 요구 사항

핵심 요구 사항은?: 1개의 사용자 로또와 당첨 번호, 보너스 번호를 비교하는 것

- [ ] 로또 구입 금액을 입력한다 - UI
  - [ ] 한 매장에서 구입 가능한 금액은 10만원 이하이다.
  - [ ] 로또 구입 금액은 1,000원으로 나눠떨어져야 한다. - UI
  - [ ] 로또 구입 금액은 0원일 수 없다. - UI
- [ ] 정렬된 로또 번호를 보여준다. - UI
- [ ] 당첨 번호를 입력 받는다. - UI
  - 당첨 번호를 6자리여야 한다.
  - 범위는 1부터 45 사이의 양의 정수여야 한다.
  - 중복된 숫자가 있으면 안된다.
- [ ] 보너스 번호를 입력 받는다. - UI
  - 범위는 1부터 45 사이의 양의 정수여야 한다.
  - 당첨번호와 중복된 숫자가 있으면 안된다.
- [ ] 당첨 내역을 출력한다. - UI
- [ ] 수익률 출력한다. - UI
- [ ] 재시작/종료 여부를 입력받는다. - UI

- [ ] 재시작할 경우 구입 금액 입력부터 게임을 다시 시작한다.
  - [ ] y/n 둘 중에 하나만 입력이 가능하다. (대문자도 가능)
- [ ] 종료하는 경우 그대로 프로그램을 종료시킨다.
- [ ] 사용자가 잘못된 값을 입력한 경우 throw 문을 사용해 예외를 발생시킨다.
- [ ] 에러 메시지를 출력한다.
- [ ] 예외 발생한 부분부터 입력을 다시 받는다.

- 당첨 선별 : 당첨 내역 선별 및 수익률 계산
  - [x] 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역을 선별한다. - Domain
    - [x] 사용자가 구매한 로또 번호와 당첨 번호의 일치 개수를 반환한다. - Domain
    - [x] 사용자가 구매한 로또 번호와 당첨된 번호가 5개 일치하고 보너스 번호도 일치할 경우, 해당 복권의 숫자를 +1 증가시킨다.
    - [x] 사용자가 구매한 로또 번호와 당첨된 번호가 N개 일치하면 해당 복권의 숫자를 +1 증가시킨다.
    - [x] 사용자가 구매한 로또 번호와 보너스 번호를 비교한 후 참/거짓 값을 반환한다.
  - [x] 사용자가 구매한 로또 번호화 당첨 번호를 비교하여 수익률을 구한다. - Domain ( 순이익 / 투자비용 * 100 )
    - [x] 소숫점 둘째짜리에서 반올림한다.

- 로또 기계: 여러 장의 로또를 관리한다.
  - [x] 구입 금액만큼 로또를 발행한다. - Domain
  - [x] 한 장의 로또를 발행한다. - Domain
    - [x] 최소/최대 범위를 가지고 랜덤 숫자를 주어진 길이만큼 생성 후 반환한다. - Utils

- 로또: 한 장의 로또를 관리한다.
  - [x] 숫자 6개를 가진 로또 1장을 발행한다. - Domain
  - [x] 로또의 번호의 숫자 범위는 1 ~ 45이다.
  - [x] 로또의 번호의 숫자 범위는 1 미만 혹은 45 초과하면 에러가 발생한다.
  - [x] 로또 번호는 오름차순으로 정렬한다. - Domain

## 커밋 컨벤션

- feat, refactor, style, chore, fix, rename, remove

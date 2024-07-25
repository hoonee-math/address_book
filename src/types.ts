// 파일명: types.ts
// 확장자: .ts (TypeScript)
// 기능: 애플리케이션에서 사용되는 타입 정의
// 연결: App.tsx, ContactForm.tsx, ContactList.tsx에서 import하여 사용

// 연락처 타입 정의
export type Contact = {
    id: number;
    name: string;
    phone: string;
    email?: string;
    birthday?: string;
    company?: string;
    memo?: string;
    /* ctrl + k, ctrl + , 선택 영역 접기
  
    TypeScript에서 변수명 뒤에 붙는 물음표(?)는 "선택적 속성(Optional Property)"을 나타냅니다. 이 차이점과 발생한 오류에 대해 자세히 설명해 드리겠습니다.

    물음표(?)의 의미:

    property?: type: 이 속성은 선택적이며, 있을 수도 있고 없을 수도 있습니다.
    property: type: 이 속성은 필수이며, 반드시 존재해야 합니다.


    group과 group?의 차이:

    group: string: 모든 Contact 객체는 반드시 group 속성을 가져야 합니다.
    group?: string: Contact 객체는 group 속성을 가질 수도 있고, 없을 수도 있습니다.


    오류가 발생한 이유:
    group: string으로 정의하면, 기존의 모든 Contact 객체와 관련 코드에서 group 속성이 필수가 됩니다. 
    그러나 기존 코드는 이 속성을 고려하지 않고 작성되었기 때문에 많은 오류가 발생합니다.
    group?를 사용했을 때 오류가 발생하지 않는 이유:
    선택적 속성으로 만들면, 기존 코드에서 이 속성이 없어도 TypeScript가 오류로 간주하지 않습니다.
    즉, 기존 코드와의 호환성을 유지할 수 있습니다.

    해결 방안:

    단기적 해결책: group?: string으로 정의하여 기존 코드와의 호환성을 유지합니다.
    장기적 해결책: group: string으로 정의하고, 기존의 모든 Contact 객체와 관련 코드를 수정하여 group 속성을 포함하도록 합니다.
    이 방법은 더 엄격한 타입 체크를 제공하지만, 많은 수정이 필요합니다.

    권장 사항:
    새로운 기능을 도입할 때는 group?: string과 같이 선택적 속성으로 시작하는 것이 좋습니다. 
    그런 다음 점진적으로 코드를 수정하여 필요한 곳에 group 속성을 추가할 수 있습니다. 
    모든 곳에서 group 속성이 필요하다고 확신할 때 group: string으로 변경할 수 있습니다.
    */
    group: string;  // 선택적 속성으로 변경, 새로 추가: 연락처 그룹, Contact 타입에 'group' 필드 추가: 연락처 그룹화를 위해 필요
  };
  

  // 페이지 열거형 정의
  export enum Page { List, Add, Edit, Detail, Login }

  // SortOption 정렬 옵션 열거형 정의 (새로 추가)
export enum SortOption {
  NameAsc = "이름 오름차순",
  NameDesc = "이름 내림차순",
  DateAdded = "추가된 날짜"
}
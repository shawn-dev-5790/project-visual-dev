import * as config from './PermissionManager.config.json'

/**
 * 유틸 함수로 빼기 위한 타입: 객체의 속성들을 배열로 변환합니다.
 * @template T - 변환할 객체의 타입
 * @type ParseAttrToArray
 */
type ParseAttrToArray<T> = Record<keyof T, Array<T[keyof T]>>

/** 퍼미션 속성을 배열로 변환한 타입 */
type TPermissonProps = ParseAttrToArray<IPermissonParams>

/** 퍼미션 태그 타입 */
type TPermissonTag = 'none' | 'payment' | 'friendtalk' | 'alimtalk'

/** 퍼미션 타입 타입 */
type TPermissonType = 'viewer' | 'admin' | 'owner'

/** 퍼미션 국가 타입 */
type TPermissonCountry = 'ko' | 'en' | 'jp'

/** 퍼미션 액션 타입 */
type TPermissonAction = 'access' | 'read' | 'write' | 'delete'

/** 퍼미션 파라미터 인터페이스 */
interface IPermissonParams {
  tag: TPermissonTag
  type: TPermissonType
  country: TPermissonCountry
  action: TPermissonAction
}

/**
 * 권한을 관리하는 클래스
 * @class PermissionManager
 */
class PermissionManager {
  /** 유일한 인스턴스 */
  private static readonly instance: PermissionManager = new PermissionManager()

  /** 초기 권한 설정 */
  private permissions = config.permissions as TPermissonProps[]

  /** 생성자 - private으로 설정하여 외부에서 직접 생성되지 않도록 합니다. */
  private constructor() {}

  /**
   * 인스턴스를 가져오는 정적 메서드
   * @returns {PermissionManager} - PermissionManager의 인스턴스
   */
  public static getInstance(): PermissionManager {
    return PermissionManager.instance
  }

  /**
   * 주어진 권한이 존재하는지 확인하는 메서드
   * @param {IPermissonParams} permission - 확인할 권한
   * @returns {boolean} - 권한이 존재하면 true, 그렇지 않으면 false
   */
  public has(permission: IPermissonParams): boolean {
    return Boolean(this.find(permission))
  }

  /**
   * 주어진 권한에 대한 배열을 반환하는 메서드
   * @param {IPermissonParams} permission - 가져올 권한
   * @returns {TPermissonProps} - 권한에 대한 배열
   */
  public get(permission: IPermissonParams): TPermissonProps {
    const found = this.find(permission)
    const empty = { tag: [], type: [], country: [], action: [] }

    return found || empty
  }

  /**
   * 주어진 권한을 찾아 반환하는 내부 메서드
   * @param {IPermissonParams} permission - 찾을 권한
   * @returns {TPermissonProps | null} - 권한을 찾으면 해당 권한, 그렇지 않으면 null
   * @private
   */
  private find(permission: IPermissonParams): TPermissonProps | null {
    return (
      this.permissions.find((p) =>
        [
          p.tag.includes(permission.tag),
          p.type.includes(permission.type),
          p.country.includes(permission.country),
          p.action.includes(permission.action),
        ].every(Boolean)
      ) || null
    )
  }
}

/** PermissionManager의 인스턴스를 내보냅니다. */
export default PermissionManager.getInstance()

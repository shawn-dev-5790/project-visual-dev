import * as config from './PermissionManager.config.json'

type ParseAttrToArray<T> = Record<keyof T, Array<T[keyof T]>>
type TPermissonProps = ParseAttrToArray<IPermissonParams>
type TPermissonTag = keyof typeof config.namespaces.tag
type TPermissonType = keyof typeof config.namespaces.type
type TPermissonCountry = keyof typeof config.namespaces.country
type TPermissonAction = keyof typeof config.namespaces.action

interface IPermissonParams {
  tag: TPermissonTag
  type: TPermissonType
  country: TPermissonCountry
  action: TPermissonAction
}

class PermissionManager {
  private static readonly instance: PermissionManager = new PermissionManager()
  private permissions: TPermissonProps[] = []

  private constructor() {
    if (PermissionManager.instance) {
      throw new Error('싱글톤 클래스입니다. getInstance 메소드를 사용하세요')
    }
    this.permissions = config.permissions as TPermissonProps[]
  }

  public static getInstance(): PermissionManager {
    return PermissionManager.instance
  }

  public has(permission: IPermissonParams): boolean {
    return Boolean(this.find(permission))
  }

  public get(permission: IPermissonParams): TPermissonProps {
    const found = this.find(permission)
    const empty = { tag: [], type: [], country: [], action: [] }

    return found || empty
  }

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

export default PermissionManager.getInstance()

export class AppConsts {
  static remoteServiceBaseUrl: string
  static appBaseUrl: string
  static appBaseHref: string // returns angular's base-href parameter value if used during the publish

  static localeMappings: any = []

  static readonly userManagement = {
    defaultAdminUserName: 'manage'
  }

  static readonly localization = {
    defaultLocalizationSourceName: 'Food'
  }

  static readonly authorization = {
    encryptedAuthTokenName: 'enc_auth_token'
  }

  static readonly ordering = {
    minTimeToOrder: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    order: {
      items: 1,
      order: 2,
      payment: 3,
      confirmation: 4
    }
  }

  static readonly sectionsIds = {
    deliveryMap: 'delivery_map',
    diets: 'diets',
    about: 'about',
    contacts: 'contacts',
    faq: 'faq'
  }
}

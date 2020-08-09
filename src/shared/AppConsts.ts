export class AppConsts {
  static remoteServiceBaseUrl: string
  static appBaseUrl: string
  static appBaseHref: string // returns angular's base-href parameter value if used during the publish

  static localeMappings: any = []

  static readonly userManagement = {
    defaultAdminUserName: 'admin'
  }

  static readonly localization = {
    defaultLocalizationSourceName: 'Food'
  }

  static readonly authorization = {
    encryptedAuthTokenName: 'enc_auth_token'
  }
  static readonly orderingWorkflow = {
    items: 1,
    order: 2,
    payment: 3,
    confirmation: 4
  }

  static readonly routes = {
    items: 'items',
    order: 'order',
    payment: 'payment',
    confirmation: 'confirmation'
  }

  static readonly sectionsIds = {
    deliveryMap: 'delivery_map',
    diets: 'diets',
    about: 'about',
    contacts: 'contacts',
    faq: 'faq'
  }
}

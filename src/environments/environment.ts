// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  appConfig: 'appconfig.json',
  mapbox: {
    accessToken:
      'pk.eyJ1Ijoic2ViYXN0aWFucnV6YW5vd3NraSIsImEiOiJja2NlejJ4bmUwZDQ5MnJtMjMxb3g1MzVjIn0.uM5B17HChNutw_1tDVnCIw',
  },
}

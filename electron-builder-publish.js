const config = {
  publish: [
      'github'
  ],
  productName: 'Exadoctor Uploader',
  appId: 'org.tidepool.TidepoolUploader',
  directories: {
    buildResources: 'resources',
    output: 'release'
  },
  afterSign: 'scripts/notarize.js',
  dmg: {
    contents: [
      {
        x: 381,
        y: 190,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 159,
        y: 190,
        type: 'file'
      }
    ],
    background: 'resources/background.tiff'
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowElevation: true
  },
  files: [
    'dist/',
    'node_modules/',
    'app.html',
    'main.prod.js',
    'main.prod.js.map',
    'package.json'
  ],
  extraResources: [
    {
      from: 'resources/${os}',
      to: 'driver/',
      filter: [
        '**/*',
        '!*.md'
      ]
    },
    'sounds/',
    'locales/'
  ],
  win: {
    target: [
      {
        target: 'nsis',
        arch: [
          'ia32',
          'x64'
        ]
      },
      {
        target: 'zip',
        arch: [
          'ia32',
          'x64'
        ]
      }
    ],
    publisherName: [
      'Tidepool Project'
    ],
    rfc3161TimeStampServer: 'http://timestamp.digicert.com'
  },
  mac: {
    category: 'public.app-category.tools',
    entitlements: 'resources/mac/entitlements.mac.plist',
    entitlementsInherit: 'resources/mac/entitlements.mac.plist',
    target: [
      {
        target: 'zip',
        arch: [
          'x64'
        ]
      },
      {
        target: 'dmg',
        arch: [
          'x64'
        ]
      },
      'dir'
    ]
  },
  protocols: [{
    name: 'Tidepool Uploader',
    schemes: ['tidepooluploader'],
  }],
};
// Comment to be removed 
console.log('CIRCLE_TAG:', process.env.CIRCLE_TAG);
console.log('APPVEYOR_REPO_TAG_NAME:', process.env.APPVEYOR_REPO_TAG_NAME);
console.log('GH_TOKEN:', process.env.GH_TOKEN);
console.log('EP_RELEASE:', process.env.EP_RELEASE);
console.log('EP_PRE_RELEASE:', process.env.EP_PRE_RELEASE);
console.log('CSC_LINK:', process.env.CSC_LINK);
console.log('CIRCLE_TAG:', process.env.CIRCLE_TAG);
console.log('I18N_ENABLED:', process.env.I18N_ENABLED);
//To be removed

let gh_token = process.env.GH_TOKEN;
console.log('gh_token value:', gh_token);

if ( (process.env.CIRCLE_TAG && process.env.CIRCLE_TAG.length > 0) ||
     (process.env.APPVEYOR_REPO_TAG_NAME && process.env.APPVEYOR_REPO_TAG_NAME.length > 0) ) {
  let releaseType = null;

  if ( (process.env.CIRCLE_TAG && process.env.CIRCLE_TAG.indexOf('-') !== -1) ||
       (process.env.APPVEYOR_REPO_TAG_NAME && process.env.APPVEYOR_REPO_TAG_NAME.indexOf('-') !== -1) ) {
    releaseType = 'prerelease';
  } else {
    releaseType = 'release';
  }
  console.log('Type of release:', releaseType);
  config.publish = [
    {
      provider: 'github',
      owner: 'amwexa', // required to overwrite existing binaries
      token: gh_token,
      repo: 'uploader5', // Corrected
      releaseType: releaseType,
    },
  //  {
  //    provider: 's3',
  //    bucket: 'downloads.tidepool.org',
  //  },
    ];
    console.info(config);
}

module.exports = config;

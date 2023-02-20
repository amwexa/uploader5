const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log(`Notarizing ${appName}`);

  return await notarize({
    appBundleId: 'org.tidepool.TidepoolUploader',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: 'exadev@exadoctor.com',
    appleIdPassword: 'pmeo-zvoq-awoz-xjsb',
    tool:'notarytool',
    teamId:'LWQTJWQM7R'
  });
};
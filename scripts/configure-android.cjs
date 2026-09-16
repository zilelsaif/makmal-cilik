const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk');
if (!path.isAbsolute(sdk) || !fs.existsSync(path.join(sdk, 'platforms', 'android-36'))) throw Error('Install Android SDK Platform 36; set ANDROID_HOME to the SDK directory.');
fs.writeFileSync(path.join(root, 'android', 'local.properties'), 'sdk.dir=' + sdk.replace(/\\/g, '/') + '\n');
console.log('Android SDK: ' + sdk);

const { spawnSync } = require('node:child_process');
const key = path.join(root, '.cache', 'debug.keystore');
if (!fs.existsSync(key)) {
  fs.mkdirSync(path.dirname(key), { recursive: true });
  const keytool = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', 'keytool.exe') : 'keytool';
  const result = spawnSync(keytool, ['-genkeypair', '-keystore', key, '-storepass', 'android', '-alias', 'androiddebugkey', '-keypass', 'android', '-dname', 'CN=Android Debug,O=Android,C=US', '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000'], { stdio: 'inherit', windowsHide: true });
  if (result.error || result.status !== 0) throw Error('Could not create local debug keystore. Check JAVA_HOME (JDK 21+).');
}

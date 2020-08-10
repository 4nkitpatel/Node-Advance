const Buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const keys = require("../../config/keys");
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
  const sessionObject = { passport: { user: user._id.toString() } };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );
  const sessionSignature = keygrip.sign("session=" + sessionString);
  return { session: sessionString, sig: sessionSignature };
};

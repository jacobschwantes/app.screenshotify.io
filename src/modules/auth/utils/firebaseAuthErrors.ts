interface ErrorProps {
  code: keyof typeof codeDictionary;
  customData: {};
  name: string;
}
const codeDictionary = {
  "auth/claims-too-large": {
    toDev:
      "The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes.",
    toClient: "default",
  },
  "auth/email-already-exists": {
    toDev:
      "The provided email is already in use by an existing user. Each user must have a unique email.",
    toClient:
      "The provided email is already in use by an existing user, please provide another email.",
  },
  "auth/email-already-in-use": {
    toDev:
      "The provided email is already in use by an existing user. Each user must have a unique email.",
    toClient:
      "An account for this email already exists.",
  },
  "auth/id-token-expired": {
    toDev: "The provided Firebase ID token is expired.",
    toClient: "Your ID token has expired, please try to log in again.",
  },
  "auth/id-token-revoked": {
    toDev: "The Firebase ID token has been revoked.",
    toClient: "Your ID token has been revoked, please try to log in again.",
  },
  "auth/insufficient-permission": {
    toDev:
      "The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.",
    toClient: "default",
  },
  "auth/internal-error": {
    toDev:
      "The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel.",
    toClient: "default",
  },
  "auth/invalid-argument": {
    toDev:
      "An invalid argument was provided to an Authentication method. The error message should contain additional information.",
    toClient: "default",
  },
  "auth/invalid-claims": {
    toDev:
      "The custom claim attributes provided to setCustomUserClaims() are invalid.",
    toClient: "default",
  },
  "auth/invalid-continue-uri": {
    toDev: "The continue URL must be a valid URL string.",
    toClient: "default",
  },
  "auth/invalid-creation-time": {
    toDev: "The creation time must be a valid UTC date string.",
    toClient: "default",
  },
  "auth/invalid-credential": {
    toDev:
      "The credential used to authenticate the Admin SDKs cannot be used to perform the desired action. Certain Authentication methods such as createCustomToken() and verifyIdToken() require the SDK to be initialized with a certificate credential as opposed to a refresh token or Application Default credential. See Initialize the SDK for documentation on how to authenticate the Admin SDKs with a certificate credential.",
    toClient: "default",
  },
  "auth/invalid-disabled-field": {
    toDev:
      "The provided value for the disabled user property is invalid. It must be a boolean.",
    toClient: "default",
  },
  "auth/invalid-display-name": {
    toDev:
      "The provided value for the displayName user property is invalid. It must be a non-empty string.",
    toClient:
      "The provided value from your name is invalid, please write a non-empty text.",
  },
  "auth/invalid-dynamic-link-domain": {
    toDev:
      "The provided dynamic link domain is not configured or authorized for the current project.",
    toClient: "default",
  },
  "auth/invalid-email": {
    toDev:
      "The provided value for the email user property is invalid. It must be a string email address.",
    toClient:
      "The provided value for your email is invalid, please write a valid email address.",
  },
  "auth/invalid-email-verified": {
    toDev:
      "The provided value for the emailVerified user property is invalid. It must be a boolean.",
    toClient: "default",
  },
  "auth/invalid-hash-algorithm": {
    toDev:
      "The hash algorithm must match one of the strings in the list of supported algorithms.",
    toClient: "default",
  },
  "auth/invalid-hash-block-size": {
    toDev: "The hash block size must be a valid number.",
    toClient: "default",
  },
  "auth/invalid-hash-derived-key-length": {
    toDev: "The hash derived key length must be a valid number.",
    toClient: "default",
  },
  "auth/invalid-hash-key": {
    toDev: "The hash key must a valid byte buffer.",
    toClient: "default",
  },
  "auth/invalid-hash-memory-cost": {
    toDev: "The hash memory cost must be a valid number.",
    toClient: "default",
  },
  "auth/invalid-hash-parallelization": {
    toDev: "The hash parallelization must be a valid number.",
    toClient: "default",
  },
  "auth/invalid-hash-rounds": {
    toDev: "The hash rounds must be a valid number.",
    toClient: "default",
  },
  "auth/invalid-hash-salt-separator": {
    toDev:
      "The hashing algorithm salt separator field must be a valid byte buffer.",
    toClient: "default",
  },
  "auth/invalid-id-token": {
    toDev: "The provided ID token is not a valid Firebase ID token.",
    toClient: "default",
  },
  "auth/invalid-last-sign-in-time": {
    toDev: "The last sign-in time must be a valid UTC date string.",
    toClient: "default",
  },
  "auth/invalid-page-token": {
    toDev:
      "The provided next page token in listUsers() is invalid. It must be a valid non-empty string.",
    toClient: "default",
  },
  "auth/invalid-password": {
    toDev:
      "The provided value for the password user property is invalid. It must be a string with at least six characters.",
    toClient:
      "The provided value for your password is invalid, please write a string with at least six characters.",
  },
  "auth/invalid-password-hash": {
    toDev: "The password hash must be a valid byte buffer.",
    toClient: "default",
  },
  "auth/invalid-password-salt": {
    toDev: "The password salt must be a valid byte buffer",
    toClient: "default",
  },
  "auth/invalid-phone-number": {
    toDev:
      "The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.",
    toClient:
      "The provided value for your phone number is invalid, please write a non-empty text following the E.164 standard.",
  },
  "auth/invalid-photo-url": {
    toDev:
      "The provided value for the photoURL user property is invalid. It must be a string URL.",
    toClient:
      "The provided URL for your profile photo is invalid, please write a valid URL.",
  },
  "auth/invalid-provider-data": {
    toDev: "The providerData must be a valid array of UserInfo objects.",
    toClient: "default",
  },
  "auth/invalid-provider-id": {
    toDev:
      "The providerId must be a valid supported provider identifier string.",
    toClient: "default",
  },
  "auth/invalid-oauth-responsetype": {
    toDev: "Only exactly one OAuth responseType should be set to true.",
    toClient: "default",
  },
  "auth/invalid-session-cookie-duration": {
    toDev:
      "The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.",
    toClient: "default",
  },
  "auth/invalid-uid": {
    toDev:
      "The provided uid must be a non-empty string with at most 128 characters.",
    toClient:
      "The provided value for the user identifier is not valid, please write a non-empty text with at most 128 characters.",
  },
  "auth/invalid-user-import": {
    toDev: "The user record to import is invalid.",
    toClient: "default",
  },
  "auth/maximum-user-count-exceeded": {
    toDev: "The maximum allowed number of users to import has been exceeded.",
    toClient: "default",
  },
  "auth/missing-android-pkg-name": {
    toDev:
      "An Android Package Name must be provided if the Android App is required to be installed.",
    toClient: "default",
  },
  "auth/missing-continue-uri": {
    toDev: "A valid continue URL must be provided in the request.",
    toClient: "default",
  },
  "auth/missing-hash-algorithm": {
    toDev:
      "Importing users with password hashes requires that the hashing algorithm and its parameters be provided.",
    toClient: "default",
  },
  "auth/missing-ios-bundle-id": {
    toDev: "The request is missing a Bundle ID.",
    toClient: "default",
  },
  "auth/missing-uid": {
    toDev: "A uid identifier is required for the current operation.",
    toClient: "default",
  },
  "auth/missing-oauth-client-secret": {
    toDev:
      "The OAuth configuration client secret is required to enable OIDC code flow.",
    toClient: "default",
  },
  "auth/operation-not-allowed": {
    toDev:
      "The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console.",
    toClient: "This sign-in method is not available currently.",
  },
  "auth/phone-number-already-exists": {
    toDev:
      "The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.",
    toClient:
      "The provided phone number is already in use by another user, please provide another phone number.",
  },
  "auth/project-not-found": {
    toDev:
      "No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.",
    toClient: "default",
  },
  "auth/reserved-claims": {
    toDev:
      "One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims.",
    toClient: "default",
  },
  "auth/session-cookie-expired": {
    toDev: "The provided Firebase session cookie is expired.",
    toClient: "default",
  },
  "auth/session-cookie-revoked": {
    toDev: "The Firebase session cookie has been revoked.",
    toClient: "default",
  },
  "auth/too-many-requests": {
    toDev:
      "Request blocked from device due to unusual activity. Trying again after some delay will unblock.",
    toClient: "You are making too many requests. Try again later.",
  },
  "auth/uid-already-exists": {
    toDev:
      "The provided uid is already in use by an existing user. Each user must have a unique uid.",
    toClient: "default",
  },
  "auth/unauthorized-continue-uri": {
    toDev:
      "The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console.",
    toClient: "default",
  },
  "auth/user-not-found": {
    toDev:
      "There is no existing user record corresponding to the provided identifier.",
    toClient: "User not found, please check your information.",
  },
  "auth/wrong-password": {
    toDev: "Invalid password for given email or password is not set.",
    toClient: "Invalid email or password.",
  },
};
export const handleAuthError = ({ code }: ErrorProps) => {
  const foundCode = codeDictionary[code];
  if (!foundCode) return "Unexpected error.";
  if (foundCode.toClient === "default") return "Server error.";
  return foundCode.toClient;
};

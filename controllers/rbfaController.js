const {
  createSignedJwt,
  exchangeJwtForToken,
} = require("../services/rbfaService");

const credentials_json = {
  type: "service_account",
  project_id: "rbfa-api-gateway-prod",
  private_key_id: "2a5d266c7306eba9fa22b9023916b7b877932ec3",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDDUV9obtaYDH/5\n9HmmQoPAra2XyULQoN+udMtgWtAjSl6vDyB74iPtL3MSlIyu2fiSixhy7VExH8Zm\nXUwi9GB5IOCzwxtaXtYozlvTOLdBjGhrTdxAQcBjKA5ItUrbOayhTRVacV8pvvIt\nn30oy7IOkUvw/MqxpL5MhMq54xBNU8MctEnmBZjkd+IEn+VuGJDK/hOC7YsF6K3K\ncM3fuGv0Vfah9t7bbqy3/mJXF/cSjY9/lyyri9tKXx5tvkE8JXFmkVMyTEWTZmZw\nQ+NaKi2HT1w+lQB/YPoypJVieS+WO/I0HUJFz13spJj/r2gZ8ansfj09C19bIjlo\nuzJ9MvvrAgMBAAECggEAUMlAgC6QHhXVfSpsgqMyYai0i3qYYziXLE5srG8DdgVV\nwmysT/FKUNl2bDH7Ons3wE0+EJMuKPZulnpyema/3HoH1vKVRrzBMeGgw23LBpav\nvepXdlB75cd0mQg7bQ+e4pzCf0UzSk4LV2mHWC9gd3wLgCLfJ7jvaTDntRlA7epE\nNTXHHC+2QYRCnEqqiLy0QMyeJN+KhHyG4udX/6n3uMxZj/c6Tf4vRYh3y5bZvyph\nbg824BVr6uaYHPYVUM6udQUHxEkFERdlNIqKqEFwlXNBbesy/a90gwf8GWbKJfd6\nVLq7ZRIxUlLi8wyoMmL/lFLQTvMeaMQd92jz4beMKQKBgQD6jD2hxDFdmu9hd9Da\nSerKMwYCDzcpcs/RLDSXsqcxBvrTcWd+9rpKQuIi2i31CwT+Rs0U0m51NAkKBPfS\nASo4BXO3sz389VGo0LyLscMsGQoYSy37XHZxCx5II6jV3bRcUvk21SYYuVJwup6T\nUr+6lPB6hJU5LIQJ7s+y4lLXhQKBgQDHkXSMN0JfmPPtVLVd5VEiZ2sY6H27ZZEg\n2OsbZIN/5jmd+nKWKCZCLitHoztiWWSxcNffZe6t1KhPGU0y08bYTBuDScitep0+\nBm75kZDTTC3V+4mJ99ZtcOGf4JAxGq9q7Qoqs6bbvkdenvU+JR+weErmcxwbK+I0\nPZK7JLeIrwKBgCogKECppw8w/Kyro48APJzQpWL1QfYTGsP1pcYXwKqqnMOuXpNn\nUn0n77OicXWw658BMnwcwXutSxPHMA+8KGgQ6prpZTPB33/90KXANquUbjEVet63\ndiadkvLYJAwJYcjgHozMm8IubqELj5v/nsL1RdWjsx9Qz8aHw541FW6tAoGADVKJ\nfD7IIIeeaQ6JmP4Q/4H15VDH6/WozY+NimOYX7ZnzEMG2T1O6IYaf4rHERa0oR/O\nWWx9lX8nyTgALk9y68eQ4p/PVL1lt9lIGUL9bw2b1bgYA2zXFLE/bqPYHF8SrMms\nLxOVJQA71XY5Gu/xgJ9XKLEwhCPW0vP1Uqbt1aMCgYA30PMJIqklhtBCikNPGn4R\nbpJ69RqPykWomyURureTjT6SxQJeEug14puNdkrYAOouSWzBEhWGNX+Y029bW9Nd\nOr26utrSIstgEdh8IVReylM7aF/yYBbu6/v5yEkUMmmOXmCNOP3pIb5DLNP7CGvC\nyDaH/fzFhoXaNpZlD++9sQ==\n-----END PRIVATE KEY-----\n",
  client_email: "exposportmedia@rbfa-api-gateway-prod.iam.gserviceaccount.com",
  client_id: "112489743386325596413",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/exposportmedia%40rbfa-api-gateway-prod.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const run_service_url =
  "https://svc-generic-satellite-production-mx26pnldea-ew.a.run.app";

const rbfaCtrl = {
  getToken: async (req, res) => {
    const signedJwt = createSignedJwt(credentials_json, run_service_url);
    try {
      const token = await exchangeJwtForToken(signedJwt);
      console.log(token);
      return res.status(200).json(token);
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};

module.exports = rbfaCtrl;

const jwt = require('jsonwebtoken');
const axios = require('axios');



const createSignedJwt=(credentials_json, run_service_url) =>{
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;
    const payload = {
        iss: credentials_json.client_email,
        sub: credentials_json.client_email,
        target_audience: run_service_url,
        aud: 'https://www.googleapis.com/oauth2/v4/token',
        iat: iat,
        exp: exp
    };
    const additional_headers = {
        kid: credentials_json.private_key_id
    };
    const signedJwt = jwt.sign(payload, credentials_json.private_key, {
        algorithm: 'RS256',
        header: additional_headers
    });
    return signedJwt;
}

const exchangeJwtForToken=async(signedJwt) =>{
    const body = new URLSearchParams();
    body.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    body.append('assertion', signedJwt);

    try {
        const response = await axios.post('https://www.googleapis.com/oauth2/v4/token', body.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.id_token;
    } catch (error) {
        throw error;
    }
}

module.exports={
    createSignedJwt,
    exchangeJwtForToken
}
## Creating Tokens

```JavaScript
jwt.sign(payload, secret-key, jwt-options)
```
- payload, no sensitive data
- secret-key, signs the token
- jwt-options, additional configuration

## Verify
```JavaScript
jwt.verify(token, secret-key)
```
- Verify token signature and return payload if valid. If not, raise error.

## Decode

```JavaScript
jwt.decode(token)
```
- Return the payload from the token (works without secret key. Remember, the tokens are signed, not enciphered!)
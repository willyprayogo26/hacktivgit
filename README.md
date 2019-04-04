## Hacktivgit

#### List of basic routes:

| Route                                   | HTTP   | Header(s)                          | Body                                                 | Description                                                  |
| --------------------------------------- | ------ | ---------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| /google-login                           | POST   | none                               | email: String, password: String                      | Login using Oauth2 (Google)<br />success:<br />(200), example: {object}<br />errors:<br />(500), error |
| /users/starred                          | GET    | Authorization:<br />(token github) | none                                                 | Get all starred repositories<br />success:<br />(200), example: {object}<br />errors:<br />(500), error |
| /users/starred/search?name=`<repoName>` | GET    | Authorization:<br />(token github) | none                                                 | Get starred repositories<br />success:<br />(200), example: {object}<br />errors:<br />(500), error |
| /users/create                           | POST   | Authorization:<br />(token github) | JSON<br />example: {"name": "test", "private": true} | Create repository<br />success:<br />(200), example: {object}<br />errors:<br />(500), error |
| /users/:username                        | GET    | Authorization:<br />(token github) | none                                                 | Get all repositories<br />success:<br />(200), example: {object}<br />errors:<br />(500), error |
| /users/unstar/:username/:reponame       | DELETE | Authorization:<br />(token github) | none                                                 | Unstar repository<br />success:<br />(200), example: {"message": "Repository `<reponame>` from username `<username>` unstarred"}<br />errors:<br />(500), error |


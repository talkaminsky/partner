// array in local storage for registered users
let data = JSON.parse(localStorage.getItem('data')) || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = data.users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Email or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(data[getTypeByUrl(url)]))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    debugger;
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = data[getTypeByUrl(url)].filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);
                    let dataObj = data[getTypeByUrl(url)];

                    // validation
                    let duplicateUser = dataObj.filter(user => { return user.email === newUser.email; }).length;
                    if (duplicateUser) {
                        reject('email "' + newUser.email + '" is already taken');
                        return;
                    }

                    // save new user
                    newUser.id = dataObj.length ? Math.max(...dataObj.map(user => user.id)) + 1 : 1;
                    dataObj.push(newUser);
                    localStorage.setItem(getTypeByUrl(url), JSON.stringify(dataObj));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let dataObj = data[getTypeByUrl(url)];

                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < dataObj.length; i++) {
                            let user = dataObj[i];
                            if (user.id === id) {
                                // delete user
                                dataObj.splice(i, 1);
                                localStorage.setItem(getTypeByUrl(url), JSON.stringify(dataObj));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get all posts
                if(url.endsWith('/posts') && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(data[getTypeByUrl(url)]))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/posts\/\d+$/) && opts.method === 'GET') {
                    debugger;
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedObj = data[getTypeByUrl(url)].filter(user => { return user.id === id; });
                        let obj = matchedObj.length ? matchedObj[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(obj)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register user
                if (url.endsWith('/posts') && opts.method === 'POST') {
                    // get new user object from post body
                    let obj = JSON.parse(opts.body);
                    let dataObj = data[getTypeByUrl(url)];

                    if(!obj.id) {
                        obj.id = dataObj.length ? Math.max(...dataObj.map(obj => obj.id)) + 1 : 1;
                        dataObj.push(obj);
                        localStorage.setItem(getTypeByUrl(url), JSON.stringify(dataObj));
                        dataObj.push(obj);
                        localStorage.setItem(getTypeByUrl(url), JSON.stringify(dataObj));
                    }

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                if (url.match(/\/posts\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let dataObj = data[getTypeByUrl(url)];

                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < dataObj.length; i++) {
                            let obj = dataObj[i];
                            if (obj.id === id) {
                                // delete user
                                dataObj.splice(i, 1);
                                localStorage.setItem(getTypeByUrl(url), JSON.stringify(dataObj));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }

    function getTypeByUrl(url) {
        let urlParts = url.split('/');
        return urlParts[3];
    }
}

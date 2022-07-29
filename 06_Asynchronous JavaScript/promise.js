const p = new Promise((resolve, reject) => {
    //Async Work...
    setTimeout(() => {
        reject(new Error('message'));
    }, 2000);
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));

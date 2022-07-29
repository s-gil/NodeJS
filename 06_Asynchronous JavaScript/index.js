//index.js
//----------------------------------------------------------------
console.log('Before');

//Async and Await approach
async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUserName);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err){
        console.log('Error', err.message);
    }
}

displayCommits()
console.log('After');

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from database');
            resolve({ id: id, gitHubUsername: 's-gil' });
        }, 2000);
    });    
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading Repositories');
//             resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos')) //simulating error
        }, 2000);
    });        
}

function getCommits(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading Commits');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });        
}
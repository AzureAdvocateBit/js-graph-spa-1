function displayProfile(user) {    
    if (!user) {
        return;
    }

    // set user data
    var userName = document.getElementById('userName');
    userName.innerText = user.displayName;
    var userEmail = document.getElementById('userEmail');
    userEmail.innerText = user.mail;

    // hide login button and show user info
    var signInButton = document.getElementById('signin');
    signInButton.style = "display: none";
    var content = document.getElementById('content');
    content.style = "display: block";
}

function displayUploadMessage(message) {
    const messageElement = document.getElementById('uploadMessage');
    messageElement.innerText = message;
}

async function displayFiles() {
    
    const files = await listFiles();
    const ul = document.getElementById('downloadLinks');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (let file of files) {
        if (!file.folder && !file.package) {
            let a = document.createElement('a');
            a.href = '#';
            a.onclick = () => { downloadFile(file); };
            a.appendChild(document.createTextNode(file.name));
            let li = document.createElement('li');
            li.appendChild(a);
            ul.appendChild(li);
        }
    }
}
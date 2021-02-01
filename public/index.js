let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() { }

function onPlayerStateChange() { }

document.getElementById("mute").addEventListener('click', function (event) {
    if (player.isMuted()) player.unMute();
    else player.mute();
});

const socket = io('http://localhost:3010');
let newUserFlag = true;

const MessageBox = document.getElementById('messages');

socket.on('newUser', (history) => {
    if (newUserFlag == true) {
        newUserFlag = false;
        for (i = 0; i < history.length; i++) {
            let userName = document.createElement('span');
            userName.innerHTML = history[i].id;

            let message = document.createElement('span');
            message.innerHTML = history[i].message;

            let messageDiv = document.createElement('div');
            messageDiv.classList.add('ind-chat-messages');

            messageDiv.appendChild(userName);
            messageDiv.appendChild(document.createElement('br'));
            messageDiv.appendChild(message);

            MessageBox.appendChild(messageDiv);
        }
    }
})

document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    socket.emit('chat', event.target[0].value);
    event.target[0].value = '';
})

socket.on('message', (data) => {
    let userName = document.createElement('span');
    userName.innerHTML = data.id;

    let message = document.createElement('span');
    message.innerHTML = data.message;

    let messageDiv = document.createElement('div');
    messageDiv.classList.add('ind-chat-messages');

    messageDiv.appendChild(userName);
    messageDiv.appendChild(document.createElement('br'));
    messageDiv.appendChild(message);

    MessageBox.appendChild(messageDiv);
});

window.onload = () => {
    newUserFlag = true;
}
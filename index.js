const SockJS = require('sockjs-client');
const {Stomp} = require('@stomp/stompjs');
const axios = require('axios');

let accessToken = 'bFV2bldXNTFZdU5XZ3BIOUlCZjREalNqUGgxS3gxLzYwMlFqS3JnOUFCejlXSU8vMEY5S0xHd0NvV1VzTExqcm4xNngyRzNuUkE3OGtNWGtzQVh6UGpOcGVsSlBLbTlWWGI0S3N0ZkdlV3M9fEhFMEF1WlVtWDc0ZTNzanlUNHBzQjJxeXdtM1lBeGJpV2htTWRhK1VJRkpaTEVoZTZzK3NNWmxkdFF4c001aEQyd1lxc2dHejJBYXNRNmlEZDBmS0xRPT0=';

axios.post('http://10.8.0.1:3000/dashboard/dataset-dashboard-items/1/summary-data-web-socket-uri', [],{
    headers: {authorization: 'Bearer ' + accessToken}
}).then(res => {
    let stompDestination = res.data.data[0];

    console.log(stompDestination)

    const socket = new SockJS('http://10.8.0.1:3000/dashboard/data-stream');
    console.log(socket.url)

    const client = Stomp.over(function () {
        return socket;
    });

    client.connect({}, function () {
        client.subscribe(stompDestination, function (data) {
            console.log(JSON.parse(data.body));
        });
    });
});

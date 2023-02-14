const message = document.querySelector('.message-error')

document.querySelector('.form-login').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    })
    try {
        let result = await fetch('https://maivankien-clothing.onrender.com//api/user/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await result.json()
        if (response.EC = -1 && typeof response.message != 'object') {
            message.textContent = response.message
        }
        if (response.message == 'Successful') {
            // window.location.href = '../login/login.html'
            function getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) {
                  return parts.pop().split(';').shift();
                }
              }
              const accessToken = getCookie('accessToken');
              const refreshToken = getCookie('refreshToken');
              console.log(accessToken, refreshToken)
            //   console.log()
        }
    } catch (error) {
        console.error(error)
    }
})

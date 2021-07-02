let URL = "https://jsonplaceholder.typicode.com/users";
fetch(`${URL}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    let mainContainer = document.getElementById("card");
    for (let i = 0; i < data.length; i++) {
        let div= document.createElement("div");
        div.addEventListener('click', (event) => allPosts(data[i].id, event));
        div.setAttribute("class", "card border-0 shadow-sm");
        div.innerHTML +=  `
            <div class="card border-0 shadow-sm py-3 m-0">
                <div class="card-body py-3">
                    <div class="d-flex justify-content-between align-item-center">
                        <div>
                            <h6 class="m-0">${data[i].name}</h6>
                            <p class="m-0"><small>${data[i].email}</small></p>
                        </div>
                        <div>
                            <button class="btn">GET POST</button>
                        </div>
                    </div>
                </div>     
            </div>
            `;
        mainContainer.appendChild(div);
    }

}

function truncatePosts() {
    let users = document.querySelectorAll('.item ul');
    for(let i = 0; i < users.length; i++) {
        if(users[i]) {
            users[i].style.display = 'none';
        }
    }
}

function allPosts(id, event) {
    console.log(id);
    // let userId = event.target.dataset.userId;

    fetch(`${URL}/${id}/posts`)
        .then(response => response.json())
        .then(json => renderPosts(json, event.target))
}

function renderPosts(posts, target) {
    const body = document.getElementById("index"); 
    body.innerHTML = '';
    const div = document.createElement("div");
    div.innerHTML += `
        <div class="m-0 py-3">
            <button class="btn"><a href="javascript:window.location.href=window.location.href">Back</a></button>
        </div>
        `;
    const div2 = document.createElement("div2");
    for(let i = 0; i < posts.length; i++) {
        console.log(posts[i]);
        div2.innerHTML += `
            <div class="card border-0 shadow-sm">
                <div class="card-body py-3">
                    <div class="d-flex justify-content-between align-item-center">
                        <div>
                            <h6 class="m-0"><b>${posts[i].title}</b></h6>
                            <p class="m-0">${posts[i].body}</p>
                        </div>
                    </div>
                </div>     
            </div>
            `;
        div.appendChild(div2);
    }
    body.appendChild(div);
}
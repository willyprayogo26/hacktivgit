const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    $("#user").hide()
    $(".container").hide()
})

function search(val) {
    $.ajax({
        url: `${baseUrl}/users/starred/search?name=${val}`,
        method: 'GET'
    })
    .done(function(repo) {
        let html = ''
        repo.forEach(e => {
            html += `<li><a href="${e.html_url}">${e.full_name}</a></li>`
        });
        $('#repo_filter').empty()
        $('#repo_filter').append(html)
    })
    .fail(function(err) {
        console.log(err)
    })
}

function search_user(val) {
    $.ajax({
        url: `${baseUrl}/users/${val}`,
        method: 'GET'
    })
    .done(function(repo) {
        let html = ''
        repo.items.forEach(e => {
            html += `<li><a href="${e.html_url}">${e.full_name}</a></li>`
        });
        $('#repo_user').empty()
        $('#repo_user').append(html)
    })
    .fail(function(err) {
        Swal.fire({
            title: 'User not found',
            animation: false,
            customClass: {
              popup: 'animated swing'
            }
        })
    })
}

function star() {
    $.ajax({
        url: `${baseUrl}/users/starred`,
        method: 'GET'
    })
    .done(function(repo) {
        let html = ''
        repo.forEach(e => {
            html += `<li><a href="${e.html_url}">${e.full_name}</a></li>`
        });
        $('#starred').empty()
        $('#starred').append(html)
    })
    .fail(function(err) {
        console.log(err)
    })
}

function unstar(val) {
    $.ajax({
        url: `${baseUrl}/users/unstar/willyprayogo26/${val}`,
        method: 'DELETE'
    })
    .done(function(repo) {
        Swal.fire({
            type: 'success',
            title: 'Repository successfully unstar',
            showConfirmButton: false,
            timer: 1500
        })

        $('#input3').val('')
        star()
    })
    .fail(function(err) {
        Swal.fire({
            title: 'Repository not found',
            animation: false,
            customClass: {
              popup: 'animated swing'
            }
        })
    })
}

function onSignIn(googleUser) {
    if(!localStorage.getItem('token')) {
        const id_token = googleUser.getAuthResponse().id_token
        $.post('http://localhost:3000/google-login', {
            token: id_token
        })
        .done(response => {
            localStorage.setItem('token', id_token)
            localStorage.setItem('name', response.name)
            localStorage.setItem('email', response.email)
            localStorage.setItem('picture', response.picture)
        })
        .fail(err => {
            console.log(err)
        })
    }
    const profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $('.g-signin2').hide()
    $("#user").show()
    $(".container").show()

    let html = `<div class="navbar-brand">${profile.getName()}</div>
                <img src="${profile.getImageUrl()}" alt="userImage" style="border-radius: 8px; width: 50px;">
                <a href="#" onclick="signOut();" class="m-2 text-danger"><i class="fas fa-power-off"></i></a>`

    $('#user').empty()
    $('#user').append(html)

    let welcome = `<h2>Hi ${profile.getName()}!</h2>`

    $('#welcome').empty()
    $('#welcome').append(welcome)

    star()
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear()
    });
    
    $("#user").hide()
    $(".container").hide()
    $('.g-signin2').show()
}
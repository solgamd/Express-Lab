
fetch('/formsubmissions')
.then(res => res.json())
    .then(submits => {
        $('ul').empty();
        submits.forEach(submit => {
            $('ul').append(
                `<li class="list-group-item justify-content-center">${submit.name} ${submit.email}</li>`
            )
        })
    })
    .catch (err => console.log(err));



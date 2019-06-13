(function(){
    var preloaded = window.__PRELOADED__
    if (preloaded == null) {
        return
    }
    var global = preloaded.global
    if (global == null) {
        return
    }
    var btnRegister = $("#btn-register");
    if (btnRegister == null) {
        return
    }
    $("#btn-register").click(function(e) {
        if(e) {
            e.preventDefault()
        }
        var visitor = {
            firstName: $('#edd-user-firstName').val().trim(),
            lastName: $('#edd-user-lastName').val().trim(),
            email: $('#edd-user-email').val().trim()
        }

        if(visitor.firstName.length == 0){
            alert("Enter first name")
            return
        }

        if(visitor.lastName.length == 0){
            alert("Enter last name")
            return
        }

        if(visitor.email.length == 0){
            alert("Enter email")
            return
        }

        $.ajax({
            url: "/api/subscriber",
            type: 'POST',
            data: visitor,
            success: function(response){
                if(response.confirmation != 'success') {
                    alert("Error: "+ response.message)
                    return
                }
                alert(global.subscriber_confirmation)
            },
            error: function(response){
                console.log("Error-" + JSON.stringify(response))
            }
        })

        console.log("test-" + JSON.stringify(visitor))
    })
})()
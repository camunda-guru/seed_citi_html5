/**
 * Created by BALASUBRAMANIAM on 31-07-2017.
 */
/*
document.getElementById("firstName").oninvalid = function () {
    this.setCustomValidity(this.value ? '' : 'My message');
};
input.addEventListener('invalid', function(e) {
    if(input.validity.valueMissing){
        e.target.setCustomValidity("PLZ CREATE A USERNAME, YO!");
    } else if(!input.validity.valid) {
        e.target.setCustomValidity("U R DOIN IT WRONG!");
    }
}, false);
*/

function test()
{
    console.log("Testing....");
}
$(function () {
    $("#city").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
                type: "GET",
                contentType: 'application/json; charset=utf-8',
                dataType: "jsonp",
                success: function (data) {
                    response(data);
                    $.each(data, function (item, value) {
                        console.log(value);
                    });
                },
                error:function(msg)
                {
                    console.log(msg);
                }
            });
        }
    });
});

function save()
{
   var fileRef= document.getElementById("photo");
    console.log(fileRef.files.length);
    var filePattern=/image.*/;
    for(i=0;i<fileRef.files.length;i++)
    {
        if(fileRef.files[i].type.match(filePattern))
            storeImage(i,fileRef.files[i]);

    }


}

function storeImage(position, file)
{
    var fileReader =new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=function()
    {
        window.localStorage.setItem("Image"+position,fileReader.result);
    }
}
for(i=0;i<window.localStorage.length;i++)
{
    if(window.localStorage.getItem("Image"+i)!=undefined)
    {
        displayPhoto(window.localStorage.getItem("Image"+i));
    }
}

function displayPhoto(file)
{
    var img = new Image();
    img.width=100;
    img.height=100;
    img.onload = function (evt) {
        var photoref = document.getElementById("docs");
        photoref.appendChild(img);
        node = document.createElement("hr");
        photoref.appendChild(node);
    }

    img.src = file;
}


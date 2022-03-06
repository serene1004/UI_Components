$(document).on('click', '.dragdrop-area span > img', function(e){
    let thisText = $(e.target).parent().text();
    let thisId   = $(e.target).parent().attr('id')

    $('#dragdrop-basebox').append('<span draggable="true" ondragstart="drag(event)" id="'+thisId+'" name="drag">'+thisText+'<img src="./img/icon_del.png" alt=""></span>');
    $(e.target).parent().remove();
});

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    if (e.target.getAttribute('name') != 'drag') {
        if (e.target.nodeName == 'IMG') {
            e.target.parentElement.parentElement.appendChild(document.getElementById(data));
        } else if (e.target.nodeName == 'DIV') {
            e.target.appendChild(document.getElementById(data));
        }
    } else {
        e.target.parentElement.append(document.getElementById(data));
    }
}
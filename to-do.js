
$(document).ready( () => { 
    
    let arr = [];
    let lastColor;
    getLocalStorage();
    $('#add').click(() => {
        $('#text').css('display','block');
    })

    let value = $('#text').on({ 
        input : () => {
            if($(this)[0].document.activeElement.value !== '' ) { 
                $('#submit').css('visibility', 'visible');
                return $(this)[0].document.activeElement.value;
            }
            else {
                $('#submit').css('visibility', 'hidden');
            }
        }  
    });
    $('#submit').click(() => {
        let textValue = value[0].value;
        console.log(textValue);
        createItem(textValue);
        storeLocally(textValue);
    });

    function bgColor() {
        let newColor ;
        function colorSelect() {
            let colors = ['#FFB99A', '#F0F58E', '#8EF5AF', '#8EE9F5','#EFB8E9' ];
             return colors[Math.floor(Math.random() * colors.length)];
        }
        newColor = colorSelect();
        while(newColor == lastColor) {
            newColor = colorSelect();
        }
        if(newColor != lastColor) {
            return newColor;
        }
    }
    function createItem(noteText) {
        if(noteText) {
            var delIcon = document.createElement('span');
            delIcon.classList.add("glyphicon" , "glyphicon-trash");
            var editIcon = document.createElement('span');
            editIcon.classList.add('glyphicon', 'glyphicon-pencil');
            let buttonDiv = document.createElement('div');
            var itemDiv = document.createElement('div');
            buttonDiv.appendChild(editIcon);
            buttonDiv.appendChild(delIcon);
            buttonDiv.classList.add('float-right');
            itemDiv.appendChild(buttonDiv);
            let item = itemDiv.appendChild(document.createTextNode(noteText));
            itemDiv = document.getElementById('notesContainer').appendChild(itemDiv); 
            console.log(itemDiv) ;
            itemDiv.style.cssText = 'height: 200px ; width: 200px ; border-radius: 10px; text-align: center ; padding-top: 20px ; margin-right:20px ; display: flex ';
            lastColor = bgColor();
            itemDiv.style.backgroundColor = lastColor ;
            console.log(lastColor);
        }  
    }

    function storeLocally(text) {
        arr.push(text);
        console.log(arr);
        localStorage.setItem('textNote',JSON.stringify(arr));
    }
    function getLocalStorage() {
        arr = JSON.parse(localStorage.getItem('textNote'));
        if(arr.length > 0 ) {
            arr.map(n => createItem(n));
            console.log(arr);
        }
    }
});

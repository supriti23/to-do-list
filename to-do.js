
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
        let note = {index : getIndex(), text : textValue};
        createItem(note);
        arr.push(note);
        save();
    });

    function edit(self) {
        let editText = self.target.parentElement.parentElement.firstChild;
        editText.removeAttribute('readonly');
        editText.style.backgroundColor = 'white';
        let oldValue = editText.value;
        editText.addEventListener('focusout', (self) => { 
            let newValue = self.target.value;
            let index = self.target.getAttribute('index');
            self.target.style.backgroundColor = 'transparent';
            arr[index] = {index : index, text : newValue};
            save();
        });
    }

    function save() {
        localStorage.setItem('textNote',JSON.stringify(arr));
    }

    function getIndex() {
        if (!arr) {
            arr = [];
        }
        return arr.length;
    }

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
    function createItem(note) {
        if(note) {
            var itemDiv = document.createElement('div');
            let textDiv = document.createElement('div');
            let text = document.createElement('input');
            text.className = 'inputText';
            text.setAttribute('type','text');
            text.setAttribute('readonly','true');
            text.value = note.text;
            text.setAttribute('index', note.index);
            textDiv = textDiv.appendChild(text);
            itemDiv.appendChild(textDiv);
            let buttonDiv = document.createElement('div');
            var delIcon = document.createElement('span');
            delIcon.classList.add("glyphicon" , "glyphicon-trash");
            var editIcon = document.createElement('span');
            editIcon.classList.add('glyphicon', 'glyphicon-pencil');
            editIcon.addEventListener('click', (event) => edit(event));
            buttonDiv.appendChild(editIcon);
            buttonDiv.appendChild(delIcon);
            buttonDiv.classList.add('container');
            itemDiv.appendChild(buttonDiv);
            itemDiv = document.getElementById('notesContainer').appendChild(itemDiv); 
            itemDiv.style.cssText = 'border-radius: 10px; text-align: center ;padding-top: 20px ;margin-right:20px ;';
            lastColor = bgColor();
            itemDiv.style.backgroundColor = lastColor ;
        }
        return editIcon;
    }

    function getLocalStorage() {
        arr = JSON.parse(localStorage.getItem('textNote'));
        if(arr !=null ) { 
            if(arr.length > 0 ) {
                arr.map(n => createItem(n));
            }
        }
    }
});

console.log('This is viewProject script');

    //Client Side Validation
    function check(){
        let selected = [];
        for (let option of document.getElementById('inputLabel').options) {
            if (option.selected) {
            selected.push(option.value);
            }
        }
    let msg='Please Filter with atleast two labels OR a auhtor OR title and description both'
    if(selected.length==1){             //If only one label is selected
        alert(msg);
        return false;
    }
    else if((document.getElementById('inputLabel').value!=0) && document.getElementById('inputAuthor').value==0 && document.getElementById('inputTitle').value==0 && document.getElementById('inputDescription').value==0){
        return true;
    }
    else if((document.getElementById('inputLabel').value==0) && document.getElementById('inputAuthor').value!=0 && document.getElementById('inputTitle').value==0 && document.getElementById('inputDescription').value==0){
        return true;
    }
    else if((document.getElementById('inputLabel').value==0) && document.getElementById('inputAuthor').value==0 && document.getElementById('inputTitle').value!=0 && document.getElementById('inputDescription').value!=0){
        return true;
    }
    else{
        alert(msg);
        return false;
    }
}

//function to toggle to show/hide add issue form
function toggleIssueFn(){
    let toggleIssue=document.getElementById('toggleIssue');
    if(toggleIssue.innerHTML){
        toggleIssue.classList.remove("btn-primary");
        toggleIssue.innerText='';
        toggleIssue.classList.add("btn-close");
    }else{
        toggleIssue.classList.remove("btn-close");
        toggleIssue.innerText='Click Here To Add Issues';
        toggleIssue.classList.add("btn-primary");
    }    
}

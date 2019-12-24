// offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            // multiple tabs opened at once
            console.log('persistence failed');
        }
        else if(err.code == 'unimplemented'){
            // lack of browser support
            console.log('persistence is not available');
        }
    });

// real-time listener
db.collection('todos').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added'){
            // add the data to the web page
            renderToDo(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed'){
            // remove the data from the web page
            removeTodo(change.doc.id);
        }
    });
})

//add new ToDo
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const todo = {
        title: form.title.value,
        description: form.description.value,
        completed: true
    };

    db.collection('todos').add(todo)
        .catch(err => console.log(err));

    form.title.value = '';
    form.description.value = '';
});

// delete ToDo
const todoContainer = document.querySelector('.todolist');
todoContainer.addEventListener('click', evt =>{
    console.log(evt);
    if(evt.target.tagName === 'I'){
        console.log('eee');
        const id = evt.target.getAttribute('data-id');
        db.collection('todos').doc(id).delete();
    }
});
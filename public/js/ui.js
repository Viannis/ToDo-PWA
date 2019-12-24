const todos = document.querySelector('.todolist');

document.addEventListener('DOMContentLoaded', function() {
    var menus = document.querySelectorAll('.side-menu');
    var instances = M.Sidenav.init(menus, {edge: 'left'});

    var todoForm = document.querySelectorAll('.side-form');
    var inst = M.Sidenav.init(todoForm, {edge: 'right'});
});

// render ToDo data
const renderToDo = (data, id) => {
    const html = `
    <div class="ToDos" data-id="${id}">
        <div class="col s12 m7">
            <div class="card horizontal">
                <div class="">
                    <form action="#">
                        <p>
                            <label>
                                <input type="checkbox" class="filled-in"/>
                                <span></span>
                            </label>
                        </p>
                    </form>
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <p>${data.title}</p>
                    </div>
                    <div class="card-content content-more">
                        <span class="activator grey-text text-darken-4">More...</span>
                    </div>
                </div>
                <div class="trailingIcon">
                    <span><i class="material-icons" data-id="${id}">delete_outline</i></span>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Description<i class="material-icons right">close</i></span>
                    <p>${data.description}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    todos.innerHTML += html;
}

// remove ToDo
const removeTodo = (id) => {
    const todo = document.querySelector(`.ToDos[data-id=${id}]`);
    todo.remove();
}
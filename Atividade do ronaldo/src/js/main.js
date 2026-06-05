function init() {
  //constantes para acessar os elementos do DOM
  const inputTask = document.getElementById("inputTask");
  const btnAdd = document.getElementById("add");
  const containerList = document.getElementById("list");

  //variavel para acessar o localStorage
  const storage = localStorage;

  //variavel para armazenar as tarefas, caso haja algo no localStorage, ele irá carregar, caso contrário, inicia como um array vazio
  let tasks = JSON.parse(storage.getItem("tasks")) || [];


  //funcão para criar a estrutura de cada tarefa na lista, recebe um objeto task como parâmetro
  function createTask(task) {
    const li = document.createElement("li");
    li.classList.add("task");

    const span = document.createElement("span");
    span.textContent = task.text;

    //verifica se a tarefa está concluída, caso esteja, adiciona a classe "Concluded" ao span para estilizar a tarefa como concluída
    if(task.concluded){
      span.classList.add("Concluded");
    }

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("deleteBtn", "btn");
    btnDelete.textContent = "Excluir";

    const btnConcluded = document.createElement("button");
    btnConcluded.classList.add("concludedBtn", "btn");
    btnConcluded.textContent = "Concluir";

    const containerBtns = document.createElement("div");
    containerBtns.classList.add("containerBtns");

    containerBtns.append(btnDelete, btnConcluded);
    li.append(span, containerBtns);

    containerList.appendChild(li);

    //função para excluir a tarefa, remove o elemento li do DOM, filtra a tarefa do array de tarefas e atualiza o localStorage
    btnDelete.addEventListener("click", () => {
      li.remove();

      tasks = tasks.filter((t) => t !== task);
      storage.setItem("tasks", JSON.stringify(tasks));

    });


    //função para concluir a tarefa, alterna o estado de conclusão da tarefa, atualiza o localStorage e adiciona ou remove a classe "Concluded" do span para refletir visualmente o estado da tarefa
    btnConcluded.addEventListener("click", () => {
      task.concluded = !task.concluded;
      storage.setItem("tasks", JSON.stringify(tasks));

      if(task.concluded){
        span.classList.add("Concluded");
      } else{
        span.classList.remove("Concluded");
      }

    });
  }


  //carrega as tarefas do localStorage ao iniciar a aplicação, iterando sobre o array de tarefas e chamando a função createTask para cada tarefa
  tasks.forEach((task) => createTask(task));

  //evento de clique para o botão de adicionar tarefa, verifica se o input não está vazio, cria um novo objeto de tarefa, chama a função createTask para adicionar a tarefa à lista, adiciona a tarefa ao array de tarefas, atualiza o localStorage e limpa o input
  btnAdd.addEventListener("click", () => {
    const text = inputTask.value.trim();

    //verifica se o input está vazio, caso esteja, exibe um alerta e retorna para evitar a criação de uma tarefa sem texto
    if (text === "") {
      alert("Digite uma tarefa para adicionar!");
      return;
    }

    //cria um novo objeto de tarefa com o texto do input e o estado de conclusão definido como false
    const newTask = {
      text: text,
      concluded: false
    };

    //chama a função createTask para adicionar a nova tarefa à lista, adiciona a nova tarefa ao array de tarefas e atualiza o localStorage com o array de tarefas atualizado
    createTask(newTask);
    tasks.push(newTask);

    //atualiza o localStorage com o array de tarefas atualizado
    storage.setItem("tasks", JSON.stringify(tasks));

    //retorna o foco para o input e limpa o valor do input para facilitar a adição de novas tarefas
    inputTask.value = "";
  });
}

init();

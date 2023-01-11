async function getGitHubProjects(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const data = await response.json();

    console.log("Quantidade de Repo: " + data.length);

    // Obtém a lista no HTML
    const projectsList = document.getElementById("projects");

    // Adiciona cada projeto à lista
    var tot = 0;
    data.forEach((project) => {
        tot++;
        const projectItem = document.createElement("li");
        projectItem.innerHTML = "Linha " + tot + " --> " + project.name + " - " + project.description;
        projectItem.className = "nav-item";
        
        projectsList.appendChild(projectItem);
    });
}

getGitHubProjects("maromo71");
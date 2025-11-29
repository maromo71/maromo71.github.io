async function getGitHubProjects(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const data = await response.json();

        console.log("Quantidade de Repo: " + data.length);

        // Obtém a lista no HTML
        const projectsList = document.getElementById("projects");
        if (!projectsList) return;

        // Limpa a lista atual
        projectsList.innerHTML = '';

        // Ordena por número de estrelas (decrescente)
        data.sort((a, b) => b.stargazers_count - a.stargazers_count);

        // Pega apenas os top 6
        const topProjects = data.slice(0, 6);

        // Adiciona cada projeto à lista
        topProjects.forEach((project) => {
            const projectItem = document.createElement("li");
            projectItem.innerHTML = `
                <a href="${project.html_url}" target="_blank" style="text-decoration: none; color: inherit; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${project.name}</strong> 
                        <span style="opacity: 0.7; display: block; font-size: 0.9em;">${project.description || 'Sem descrição'}</span>
                    </div>
                    <div style="font-size: 0.8em; opacity: 0.8;">
                        <i class="fas fa-star" style="color: #e6c07b;"></i> ${project.stargazers_count}
                    </div>
                </a>`;
            projectsList.appendChild(projectItem);
        });
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
    }
}

getGitHubProjects("maromo71");
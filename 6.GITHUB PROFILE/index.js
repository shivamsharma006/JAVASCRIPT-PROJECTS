const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("search_btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
    return `<div class="profile_box">
                <div class="top_section">
                    <div class="left">
                        <div class="avtar">
                            <img src="${profile.avatar_url}" alt="avatar">
                        </div>
                        <div class="self">
                            <h1>${profile.name || "No Name Available"}</h1>
                            <h1>@${profile.login}</h1>
                        </div>
                    </div>
                    <a href="${profile.html_url}" target="_blank">
                        <button class="primary_btn">Check Profile</button>
                    </a>
                </div>
                <div class="about">
                    <h2>About</h2>
                    <p>${profile.bio || "No bio available"}</p>
                </div>
                <div class="status">
                    <div class="status_item">
                        <h3>Followers</h3>
                        <p>${profile.followers}</p>
                    </div>
                    <div class="status_item">
                        <h3>Following</h3>
                        <p>${profile.following}</p>
                    </div>
                    <div class="status_item">
                        <h3>Repos</h3>
                        <p>${profile.public_repos}</p>
                    </div>
                </div>
            </div>`;
}

const fetchProfile = async () => {
    const username = searchInputEl.value.trim();
    
    if (!username) {
        loadingEl.innerText = "Please enter a GitHub username.";
        loadingEl.style.color = "red";
        profileContainerEl.innerText = "";
        return;
    }

    loadingEl.innerText = "Loading...";
    loadingEl.style.color = "black";
    profileContainerEl.innerText = "";

    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();

        if (data.message === "Not Found") {
            loadingEl.innerText = "User not found.";
            loadingEl.style.color = "red";
            profileContainerEl.innerText = "";
        } else {
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data);
        }
        console.log("data", data);
    } catch (error) {
        console.log({ error });
        loadingEl.innerText = "An error occurred. Please try again.";
        loadingEl.style.color = "red";
    }
}

searchButtonEl.addEventListener("click", fetchProfile);

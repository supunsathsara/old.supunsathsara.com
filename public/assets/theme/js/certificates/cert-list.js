fetch("/api/certs")
  .then((response) => response.json())
  .then((json) => {
    console.log(json.slice(0, 8));
    let output = "";
    json.reverse().forEach((element) => {
      output += `
        <div class="col-md-4 col-sm-6">
                <div class="box-work">
                  <div class="work-preview">
                  <img src="./assets/theme/images/certificates/src/thumbnails/${element.thumbnail}.jpg" srcset="./assets/theme/images/certificates/thumbnails/${element.thumbnail}.webp" alt="${element.title}">
                    <div class="hover">
                      <div class="link-btns">
                      <a href="./assets/theme/images/certificates/${element.image}.webp" title="${element.title}" class="galery-item" ><i class="fa fa-search-plus"></i></a>
                      <a href="cert-detail.html?id=${element.key}#title"><i class="fa fa-link"></i></a>
                      </div>
                      <a href="cert-detail.html?id=${element.key}#title" class="project-title">${element.title}</a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            `;
    });
    document.getElementById("cert-list").innerHTML = output;
    $(document).ready(function () {
      $("body,html").animate({ scrollTop: 500 }, 800);
    });
  });

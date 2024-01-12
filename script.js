import certificatesData from "./static/certificatesData.js";
import projectsData from "./static/projectsData.js";

// script.js
$(document).ready(function () {
  renderProjectCards();

  // Event listener for filter buttons
  $("[data-filter]").on("click", function () {
    const filter = $(this).data("filter");
    renderCertificateCards(filter);
  });

  // Initial rendering with "All" filter
  renderCertificateCards("all");
});

function renderProjectCards() {
  const projectCardsContainer = $("#project-cards");
  projectCardsContainer.empty(); // Clear existing cards

  // Sort projects by date in descending order
  const sortedProjects = projectsData.sort(
    (a, b) => new Date(b.endDate) - new Date(a.endDate)
  );
  $.each(sortedProjects, function (index, project) {
    const card = $("<div>", { class: "card project-card" }).html(`
    <div class="card-header" data-toggle="collapse" data-target="#projectDetails${index}">
      <h5 class="mb-0">${project.title} <i class="fas fa-chevron-down"/></h5>
    </div>
    <div id="projectDetails${index}" class="collapse">
      <div class="card-body">
      <p class="card-text text-muted">${formatDateRange(
        project.startDate,
        project.endDate
      )}</p>
        <p class="card-text"><b>Related Topic: </b> ${project.topic.join(
          ", "
        )}</p>
        <p class="card-text"><b>Description: </b>${project.description}</p>
      </div>
    </div>
  `);

    card.find(".card-header").on("click", function () {
      const chevronIcon = $(this).find("i");
      chevronIcon.toggleClass("fa-chevron-down fa-chevron-up");
    });

    projectCardsContainer.append(card);
  });
}

function formatDateRange(startDate, endDate) {
  const startMonthYear = formatDate(startDate);
  const endMonthYear = formatDate(endDate);
  return `${startMonthYear} - ${endMonthYear}`;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-EN", options);
}

function renderCertificateCards(topicFilter) {
  const certificateCardsContainer = $("#certificate-cards");
  certificateCardsContainer.empty(); // Clear existing cards

  // Sort certificates by date in descending order
  const sortedCertificates = certificatesData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  $.each(sortedCertificates, function (index, certificate) {
    if (topicFilter === "all" || certificate.topic === topicFilter) {
      const card = $("<div>", { class: "card" }).html(`
        <div class="card-body">
          <h5 class="card-title">${certificate.title}</h5>
          <p class="card-text">Issued Date: ${formatDate(certificate.date)}</p>
          <p class="card-text">Issuer: ${certificate.issuer}</p>
          <a href="${
            certificate.url
          }" class="btn btn-primary" target="_blank">View Certificate</a>
        </div>
      `);
      certificateCardsContainer.append(card);
    }
  });
}
